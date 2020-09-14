import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import second_bg from '../../images/second_bg.png';
import Header from '../../components/headers/Header';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Footers from '../../components/footers/Footer';
import MainBackground from '../../components/body/MainBackground';
import Content from '../../components/body/Content';
import TextTitle from '../../components/body/TextTitle';
import {useDispatch, useSelector} from 'react-redux';
import {getRequest} from '../../config/AxiosMethod';
import {useIsFocused} from '@react-navigation/native';
import {setLoading} from '../../redux/general/GeneralAction';
import CurrencyFormat from 'react-currency-format';
import moment from 'moment';
import 'moment/locale/id';

const HistoryPage = (props) => {
  moment.locale('id');
  const [dataLaporan, setDataLaporan] = useState(undefined);
  const dispatch = useDispatch();
  const outlet = useSelector((state) => state.LoginReducer);
  const isFocus = useIsFocused();

  const getDaftarLaporan = () => {
    dispatch(setLoading(true));
    getRequest(`daftar-laporan/${outlet.user.outlet.id_outlet}`)
      .then((res) => {
        setDataLaporan(res.data);
        dispatch(setLoading(false));
      })
      .catch((err) => {
        console.log(err.request);
        console.log(err.response);
        dispatch(setLoading(false));
      });
  };

  useEffect(() => {
    isFocus && getDaftarLaporan();
  }, [isFocus]);

  return (
    <MainBackground source={second_bg}>
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
          <TextTitle>History</TextTitle>
          {dataLaporan &&
            dataLaporan.map((view, i) => {
              return (
                <View key={i} style={styles.item}>
                  <View style={styles.itemGroup}>
                    <MaterialCommunityIcons
                      style={styles.itemIcon}
                      name="chevron-double-right"
                      size={25}
                    />
                    <CurrencyFormat
                      value={view.laporan}
                      displayType={'text'}
                      thousandSeparator={true}
                      prefix={'Rp.'}
                      renderText={(value) => (
                        <Text style={styles.itemText}>{value}</Text>
                      )}
                    />
                    <CurrencyFormat
                      value={view.total_penjualan}
                      displayType={'text'}
                      thousandSeparator={true}
                      prefix={'Rp.'}
                      renderText={(value) => (
                        <Text style={styles.itemText}>{` ( ${value} ) `}</Text>
                      )}
                    />
                  </View>
                  <View style={styles.itemGroup}>
                    <Text style={{...styles.itemText, color: '#C6C3BD'}}>
                      {moment(view.created_at).format('L')}
                    </Text>
                    <EvilIcons
                      style={styles.itemIcon}
                      name="chevron-right"
                      size={35}
                      color="#E0E0E0"
                    />
                  </View>
                </View>
              );
            })}
        </View>
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
    marginHorizontal: 1,
    alignSelf: 'center',
  },
  itemIcon: {
    alignSelf: 'center',
  },
  addMenuIcon: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: 60,
  },
});

export default HistoryPage;
