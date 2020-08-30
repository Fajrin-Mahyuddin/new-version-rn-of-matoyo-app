import React, {Component, useEffect, useState} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import second_bg from '../../images/second_bg.png';
import Header from '../../components/headers/Header';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Footers from '../../components/footers/Footer';
import MainBackground from '../../components/body/MainBackground';
import Content from '../../components/body/Content';
import {getRequest} from '../../config/AxiosMethod';
import {useIsFocused} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {setLoading} from '../../redux/general/GeneralAction';

const CreateOrderPage = (props) => {
  const {navigation, route} = props;
  const [dataJumlah, setDataJumlah] = useState({});
  const isFocus = useIsFocused();
  const dispatch = useDispatch();
  const getJumlahPesanan = () => {
    dispatch(setLoading(true));
    getRequest(`daftar-pesanan/count`)
      .then((res) => {
        setDataJumlah(res.data);
        dispatch(setLoading(false));
      })
      .catch((err) => {
        console.log('error get number of order', err);
        dispatch(setLoading(false));
      });
  };

  useEffect(() => {
    isFocus && getJumlahPesanan();
  }, [isFocus]);

  return (
    <MainBackground source={second_bg} navigation={navigation} route={route}>
      <Header
        welcomeText={false}
        ShowDrawerBtn={true}
        ShowSubHeader={true}
        ShowBackBtn={true}
        ShowTextHeader={false}
        ShowBagBtn={false}
        ShowProfile={false}
        ShowFilterBtn={false}
        navigation={props.navigation}
      />
      <Content>
        <View style={styles.contentWrapper}>
          <Text style={styles.contentTitle}>Buat Pesanan</Text>
          <TouchableOpacity
            style={styles.item}
            onPress={() =>
              props.navigation.navigate('listOrderPage', {status: 'selesai'})
            }>
            <View style={styles.itemGroup}>
              <EvilIcons style={styles.itemIcon} name="check" size={35} />
              <Text style={styles.itemText}>Pesanan Selesai</Text>
            </View>
            <View style={styles.itemGroup}>
              <Text style={styles.itemText}>
                {dataJumlah && dataJumlah.selesai}
              </Text>
              <EvilIcons
                style={styles.itemArrow}
                name="chevron-right"
                size={35}
                color="#E0E0E0"
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.item}
            onPress={() =>
              props.navigation.navigate('listOrderPage', {status: 'proses'})
            }>
            <View style={styles.itemGroup}>
              <EvilIcons style={styles.itemIcon} name="clock" size={35} />
              <Text style={styles.itemText}>Pesanan Terproses</Text>
            </View>
            <View style={styles.itemGroup}>
              <Text style={styles.itemText}>
                {dataJumlah && dataJumlah.proses}
              </Text>
              <EvilIcons
                style={styles.itemArrow}
                name="chevron-right"
                size={35}
                color="#E0E0E0"
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.item}
            onPress={() =>
              props.navigation.navigate('listOrderPage', {status: 'batal'})
            }>
            <View style={styles.itemGroup}>
              <EvilIcons style={styles.itemIcon} name="close-o" size={35} />
              <Text style={styles.itemText}>Pesanan Batal</Text>
            </View>
            <View style={styles.itemGroup}>
              <Text style={styles.itemText}>
                {dataJumlah && dataJumlah.batal}
              </Text>
              <EvilIcons
                style={styles.itemArrow}
                name="chevron-right"
                size={35}
                color="#E0E0E0"
              />
            </View>
          </TouchableOpacity>
        </View>
        <EvilIcons
          style={styles.addMenuIcon}
          name="plus"
          size={75}
          color="#F9A826"
          onPress={() =>
            props.navigation.navigate('listMenu', {dataOrder: undefined})
          }
        />
      </Content>
      <Footers />
    </MainBackground>
  );
};

const styles = StyleSheet.create({
  contentWrapper: {
    // margin: 10,
  },
  contentTitle: {
    fontSize: 18,
    alignSelf: 'center',
    marginVertical: 10,
    fontFamily: 'Poppins-Regular',
  },
  itemGroup: {
    display: 'flex',
    flexDirection: 'row',
  },
  item: {
    display: 'flex',
    flexDirection: 'row',
    marginHorizontal: 15,
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    paddingBottom: 8,
    marginBottom: 8,
    // backgroundColor: 'salmon',
    borderBottomColor: '#BCBCBC',
  },
  itemText: {
    fontSize: 15,
    marginHorizontal: 10,
    alignSelf: 'center',
    fontFamily: 'Poppins-Regular',
  },
  addMenuIcon: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: 60,
  },
});

export default CreateOrderPage;
