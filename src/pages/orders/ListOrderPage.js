import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import MainBackground from '../../components/body/MainBackground';
import second_bg from '../../images/second_bg.png';
import mini_bg from '../../images/mini_bg.png';
import Header from '../../components/headers/Header';
import Icon from 'react-native-vector-icons/FontAwesome';
import Footer from '../../components/footers/Footer';
import Content from '../../components/body/Content';
import {getRequest} from '../../config/AxiosMethod';
import {
  setLoading,
  getReset,
  setErrorRequest,
} from '../../redux/general/GeneralAction';
import {useDispatch} from 'react-redux';
import {setToken} from '../../redux/login/LoginAction';
import {useIsFocused} from '@react-navigation/native';
import CurrencyFormat from 'react-currency-format';
import moment from 'moment';
import 'moment/locale/id';

const ListOrderPage = (props) => {
  moment.locale('id');
  const {navigation, route} = props;
  const [dataOrder, setDataOrder] = useState([]);
  const dispatch = useDispatch();
  const isFocus = useIsFocused();

  const getDataOrder = () => {
    dispatch(setLoading(true));
    getRequest(`daftar-pesanan/daftar/${route.params.status}`)
      .then((res) => {
        makeOrderList(res.data);
        dispatch(setLoading(false));
      })
      .catch((err) => {
        dispatch(setLoading(false));
        if (err.request.status === 401) {
          dispatch(getReset());
          dispatch(setToken({token: null, isLogin: false}));
        } else {
          dispatch(
            setErrorRequest({
              errorRequest: true,
              msg: 'Periksa koneksi internet ! ',
            }),
          );
        }
        console.log('Error Get pesanan', err);
      });
  };

  const makeOrderList = (data) => {
    const newData = data.map((list) => {
      const total = list.menu.reduce((total, item) => {
        return item.harga_total + total;
      }, 0);
      return {...list, total};
    });
    setDataOrder(newData);
  };

  useEffect(() => {
    isFocus && getDataOrder();
  }, [isFocus]);
  console.log("dataOrder''''''''''''''", dataOrder);
  return (
    <MainBackground source={second_bg} navigation={navigation}>
      <Header
        welcomeText={false}
        ShowDrawerBtn={false}
        ShowSubHeader={false}
        ShowBackBtn={true}
        ShowTextHeader={true}
        ShowBagBtn={false}
        ShowProfile={false}
        ShowFilterBtn={false}
        ShowEditBtn={false}
        TextHeader={`Pesanan ${route.params.status}`}
        navigation={navigation}
      />
      <Content>
        <View style={styles.containerContent}>
          <SafeAreaView>
            <ScrollView style={{height: '97%'}}>
              {dataOrder.map((view, i) => (
                <View key={i} style={styles.item}>
                  <Image source={mini_bg} style={styles.itemBg} />
                  <View style={styles.itemWrapper}>
                    <View style={styles.itemOne}>
                      <TouchableOpacity
                        onPress={() =>
                          props.navigation.navigate('viewBasketPage', {
                            id_pesanan: view.id_pesanan,
                          })
                        }>
                        <Text style={styles.itemBtn}> Detail</Text>
                      </TouchableOpacity>

                      <Text style={styles.itemDate}>
                        <Icon name="calendar" />
                        {moment(view.created_at).format(' dddd, LL')}
                      </Text>
                    </View>
                    <View style={styles.itemTwo}>
                      <View>
                        <Text style={styles.itemKode}>
                          #{view.nama_pesanan}
                        </Text>
                      </View>
                      <View style={styles.itemPrice}>
                        <CurrencyFormat
                          value={view.total}
                          displayType={'text'}
                          thousandSeparator={true}
                          prefix={'Rp.'}
                          renderText={(value) => (
                            <Text style={styles.itemTotalPrice}>{value}</Text>
                          )}
                        />

                        <Text style={styles.itemTotal}>
                          / {view.menu.length} item
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              ))}
            </ScrollView>
          </SafeAreaView>
        </View>
      </Content>

      <Footer />
    </MainBackground>
  );
};

const styles = StyleSheet.create({
  containerContent: {
    width: '100%',
    marginTop: 40,
  },
  item: {
    paddingHorizontal: 15,
    marginVertical: 5,
  },
  itemBg: {width: '100%', resizeMode: 'cover', borderRadius: 5},
  itemWrapper: {
    position: 'absolute',
    marginHorizontal: 15,
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: 5,
  },
  itemOne: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemBtn: {
    color: 'red',
    fontFamily: 'Poppins-Regular',
  },
  itemDate: {
    color: '#3f3d56',
    fontSize: 12,
  },
  itemTwo: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemKode: {
    fontSize: 20,
    color: '#3d3f56',
    // fontWeight: 'bold',
    fontFamily: 'Poppins-SemoBold',
  },
  itemPrice: {
    display: 'flex',
    flexDirection: 'row',
  },
  itemTotalPrice: {
    fontSize: 22,
    color: '#3d3f56',
    alignSelf: 'center',
  },
  itemTotal: {
    fontSize: 10,
    alignSelf: 'flex-end',
    color: '#3f3d56',
  },
});

export default ListOrderPage;
