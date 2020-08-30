import React, {useState, Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  Modal,
  TouchableOpacity,
  TouchableHighlight,
  ScrollView,
  ToastAndroid,
  RefreshControl,
} from 'react-native';
import MainBackground from '../../components/body/MainBackground';
import second_bg from '../../images/second_bg.png';
import defaultImg from '../../images/default-menu.jpg';
import Header from '../../components/headers/Header';
import Icon from 'react-native-vector-icons/FontAwesome';
import Footer from '../../components/footers/Footer';
import Content from '../../components/body/Content';
import {screenWidth} from '../../config/sizeConfig';
import {getRequest, postRequest, FileUrl} from '../../config/AxiosMethod';
import {connect} from 'react-redux';
import {
  setErrorRequest,
  setLoading,
  getReset,
  set_error,
} from '../../redux/general/GeneralAction';
import {
  createOrder,
  prosesOrder,
  updateMenu,
} from '../../redux/orders/OrderAction';
import {setToken} from '../../redux/login/LoginAction';
// import OrderReducer from '../../redux/orders/OrderReducer';
// import GeneralReducer from '../../redux/general/GeneralReducer';
import CurrencyFormat from 'react-currency-format';

// import Auth from '../../config/Auth';

class ListMenuPage extends Component {
  constructor() {
    super();
    this.state = {
      modal: false,
      jumlah: 1,
      idDaftarMenu: 0,
      dataMenu: [],
      keranjang: [], //ngk dipake
      dataModal: {},
      filterDataMenu: [],
      refresh: false,
      btnActive: 0,
    };
  }

  componentDidMount() {
    this.getDaftarMenu();
  }

  getDaftarMenu = () => {
    const {setLoading, setErrorRequest, set_error} = this.props;
    setLoading(true);

    this.handleSetButtonActive();
    getRequest('daftar-menu')
      .then((res) => {
        console.log('respons get menu', res);
        this.setState({
          dataMenu: res.data,
          filterDataMenu: res.data,
          refresh: false,
        });
        setLoading(false);
      })
      .catch((err) => {
        if (err.request.status === 401) {
          this.props.getReset();
          this.props.setToken({token: null, isLogin: false});
        } else if (err.request.status === 0) {
          setErrorRequest({
            errorRequest: true,
            msg: 'Periksa koneksi internet ! ',
          });
        }
        setLoading(false);
        set_error({
          error: true,
          msg: 'Not Found ! ',
        });
        console.log('Error get daftar menu', err.request);
        console.log('Error', err.response);
      });
  };

  Increase = () => {
    // let num = this.state.jumlah
    this.setState({jumlah: this.state.jumlah + 1});
  };
  Decrease = () => {
    this.setState({jumlah: this.state.jumlah - 1});
  };

  handleAddModal = (list) => {
    // const {OrderReducer} = this.props;
    // const {params} = this.props.route;
    this.setState({modal: true, dataModal: list}, () => {});
  };

  handleUpdateOrderInDatabase = () => {
    // const {jumlah, dataModal} = this.state;
    // const {params} = this.props.route;
    // const harga_total = jumlah * (dataModal.harga - dataModal.diskon / 100);
    // const menuOrder = {
    //   id_daftar_menu: dataModal.id_daftar_menu,
    //   nama_menu: dataModal.get_menu.nama,
    //   jumlah,
    //   harga_total,
    //   harga_satuan: dataModal.harga,
    //   diskon_menu: dataModal.diskon,
    // };
    // const menuUpdate = params.dataOrder.menu.filter(
    //   (data) => dataModal.id_daftar_menu !== data.id_daftar_menu,
    // );
    // const newMenuUpdate = [...menuUpdate, menuOrder];
    // console.log('params', params);
    // console.log('newMenuUpdate', newMenuUpdate);
  };

  findIndexOfmenu = (arr, compare, equal = true) => {
    return equal
      ? arr.filter((data) => compare.id_daftar_menu === data.id_daftar_menu)
      : arr.filter((data) => compare.id_daftar_menu !== data.id_daftar_menu);
  };

  handleMasukKeranjang = () => {
    const {jumlah, dataModal} = this.state;
    const {params} = this.props.route;
    const {GeneralReducer, updateMenu, set_error} = this.props;
    // const harga_total = jumlah * (dataModal.harga - dataModal.diskon / 100);
    const menuOrder = {
      id_daftar_menu: dataModal.id_daftar_menu,
      nama_menu: dataModal.get_menu.nama,
      harga_satuan: dataModal.harga,
      diskon_menu: dataModal.diskon,
    };

    if (params && params.id_pesanan) {
      // cari menu yang terpilih dalam array
      let menuChoosed = this.findIndexOfmenu(params.menu, dataModal, true);
      // ubah type menu terpilih kedalam bentuk objek
      menuChoosed = {...menuChoosed[0]};

      let menuUpdate, harga_total, CountJumlah;
      if (Object.keys(menuChoosed).length) {
        // jika menu sudah ada update jumlah
        CountJumlah = jumlah + menuChoosed.jumlah;
        harga_total = CountJumlah * (dataModal.harga - dataModal.diskon / 100);
        menuUpdate = {...menuChoosed, jumlah: CountJumlah, harga_total};
      } else {
        harga_total = jumlah * (dataModal.harga - dataModal.diskon / 100);
        menuUpdate = {
          ...menuOrder,
          jumlah,
          harga_total,
        };
      }
      // // buat menu update
      // let menus = this.findIndexOfmenu(params.menu, dataModal, false);
      // // gabungkan menu lama dengan menu yang dipilih kedalam bentuk array
      // const newMenuUpdate = [...menus, {...menuUpdate}];

      // // hitung total bayar menu baru
      // const total_bayar = newMenuUpdate.reduce((total, item) => {
      //   return item.harga_total + total;
      // }, 0);
      // console.log('dataModal-----------', {
      //   id_pesanan: params.id_pesanan,
      //   ...menuUpdate,
      // });

      const update = updateMenu({...menuUpdate, id_pesanan: params.id_pesanan});

      update
        .then((res) => {
          console.log('------------------------', res);
          this.props.navigation.navigate('viewBasketPage', {
            id_pesanan: params.id_pesanan,
          });
        })
        .catch((err) => {
          console.log('error*****', err.response);
          set_error({error: true, msg: `${err.response.data.status}`});
        });
    } else {
      let menuChoosed = this.findIndexOfmenu(
        this.props.OrderReducer.menu,
        dataModal,
        true,
      );
      menuChoosed = {...menuChoosed[0]};
      let CountJumlah = this.state.jumlah;
      if (Object.keys(menuChoosed).length) {
        CountJumlah = this.state.jumlah + menuChoosed.jumlah;
      }
      const harga_total =
        CountJumlah * (dataModal.harga - dataModal.diskon / 100);
      this.props.createOrder({
        ...menuOrder,
        jumlah: CountJumlah,
        harga_total: harga_total,
      });
    }

    this.setState({modal: false, jumlah: 1, dataModal: {}});

    ToastAndroid.show(
      `${dataModal.get_menu.nama} ditambahkan !`,
      ToastAndroid.SHORT,
    );
    // return true;
  };

  handleFilter = (id) => {
    const data = this.state.DataMenu;
    this.setState({filterDataMenu: data}, () => {
      let filterDataMenu = this.state.dataMenu.filter(
        (e) => e.get_menu.id_kategori === id,
      );
      if (id === 0) {
        filterDataMenu = this.state.dataMenu;
      }
      this.setState({filterDataMenu});
    });
  };

  handleSetButtonActive = (e) => {
    this.handleSetButtonActive = e;
  };
  render() {
    // console.log('props list menu', this.props);
    // console.log('dataModalllllllllllllll', this.state.dataModal);
    const {Increase, Decrease, handleFilter, handleSetButtonActive} = this;
    const {navigation, route, GeneralReducer} = this.props;
    const {
      modal,
      jumlah,
      dataMenu,
      dataModal,
      filterDataMenu,
      refresh,
      btnActive,
    } = this.state;

    return (
      <MainBackground source={second_bg} navigation={navigation} route={route}>
        <Header
          welcomeText={false}
          ShowDrawerBtn={false}
          ShowSubHeader={false}
          ShowBackBtn={true}
          ShowTextHeader={false}
          ShowBagBtn={route.params && !route.params.id_pesanan && true}
          ShowProfile={false}
          ShowFilterBtn={true}
          ShowEditBtn={false}
          // TextHeader="#N20202020"
          navigation={navigation}
          handleFilter={handleFilter}
          handleSetButtonActive={handleSetButtonActive}
          btnActive={btnActive}
        />
        <Modal animationType="slide" transparent={true} visible={modal}>
          <View style={styles.modalContainer}>
            <TouchableHighlight
              onPress={() =>
                this.setState({modal: false, jumlah: 1, dataModal: {}})
              }
              underlayColor="transparent"
              style={styles.modalCloseBtn}>
              <Icon style={styles.modalBtnText} name="close" />
            </TouchableHighlight>
            <View style={styles.modalBody}>
              <Text style={styles.ModalTitle}>
                {dataModal.get_menu && dataModal.get_menu.nama}
                {dataModal.get_stok &&
                  ` - (${Math.trunc(
                    dataModal.get_stok[0].sisa / dataModal.jumlah_per_satuan,
                  )})`}
              </Text>
              <View style={styles.modalItemCount}>
                <Icon
                  style={styles.selectItemIncDec}
                  onPress={() => (jumlah < 2 ? null : Decrease())}
                  name="minus"
                />
                <Text style={styles.selectItemNumber}>{jumlah}</Text>
                <Icon
                  style={styles.selectItemIncDec}
                  onPress={Increase}
                  name="plus"
                />
              </View>
              <View style={styles.modalFooter}>
                <TouchableHighlight
                  underlayColor="#F9A825"
                  onPress={this.handleMasukKeranjang}
                  style={styles.modalSubmitBtn}>
                  <Text style={styles.modalBtnText}>Tambah </Text>
                </TouchableHighlight>
              </View>
            </View>
          </View>
        </Modal>

        <Content style={styles.containerContent}>
          {/* menu  */}
          <Text style={styles.contentTitle}>
            {GeneralReducer.error ? GeneralReducer.msg : 'Daftar Menu'}
          </Text>

          <SafeAreaView>
            <ScrollView
              style={styles.scrollStyle}
              refreshControl={
                <RefreshControl
                  refreshing={refresh}
                  onRefresh={() => {
                    this.getDaftarMenu();
                  }}
                />
              }>
              <View style={styles.containerMenu}>
                {/* Item menu */}

                {filterDataMenu &&
                  filterDataMenu.map((list, i) => (
                    <TouchableOpacity
                      key={i}
                      style={styles.itemMenu}
                      disabled={!list.get_stok.length || !list.get_stok[0].sisa}
                      onPress={() => this.handleAddModal(list)}>
                      <Image
                        style={styles.itemImg}
                        source={
                          list.get_foto
                            ? {uri: `${FileUrl}${list.get_foto.url}`}
                            : defaultImg
                        }
                      />
                      <View style={styles.itemDesc}>
                        <View style={styles.itemText}>
                          <Text
                            style={{
                              fontSize: 15,
                              color: '#fff',
                              fontFamily: 'Poppins-SemiBold',
                            }}>
                            {list.get_menu.nama}
                          </Text>
                          <CurrencyFormat
                            value={list.harga}
                            displayType={'text'}
                            thousandSeparator={true}
                            prefix={'Rp.'}
                            renderText={(value) => (
                              <Text
                                style={{
                                  color: '#E0E0E0',
                                  fontFamily: 'Poppins-Regular',
                                  fontSize: 12,
                                }}>
                                {value}
                              </Text>
                            )}
                          />
                        </View>
                        {list.get_stok.length ? (
                          !list.get_stok[0].sisa && (
                            <View>
                              <Text style={styles.itemIcon}>Kosong</Text>
                            </View>
                          )
                        ) : (
                          <View>
                            <Text style={styles.itemIcon}>Kosong</Text>
                          </View>
                        )}
                      </View>
                    </TouchableOpacity>
                  ))}

                {/* last item */}
              </View>
            </ScrollView>
          </SafeAreaView>
        </Content>

        {/* <Footer /> */}
      </MainBackground>
    );
  }
}

const mapStateToProps = ({LoginReducer, GeneralReducer, OrderReducer}) => ({
  GeneralReducer,
  LoginReducer,
  OrderReducer,
});

const mapStateToDispatch = (dispatch) => ({
  set_error: (data) => dispatch(set_error(data)),
  updateMenu: (data) => dispatch(updateMenu(data)),
  createOrder: (data) => dispatch(createOrder(data)),
  setLoading: (data) => dispatch(setLoading(data)),
  setToken: (data) => dispatch(setToken(data)),
  setErrorRequest: (data) => dispatch(setErrorRequest(data)),
  getReset: (data) => dispatch(getReset(data)),
});

export default connect(mapStateToProps, mapStateToDispatch)(ListMenuPage);

// const wid = screenWidth.width / 2.18 - 10;
const styles = StyleSheet.create({
  containerContent: {},
  scrollStyle: {
    width: '100%',
    height: screenWidth.height / 1.35,
  },
  contentTitle: {
    fontSize: 18,
    alignSelf: 'center',
    marginTop: 7,
    marginBottom: 3,
    fontFamily: 'Poppins-Regular',
  },
  filterMenuWrap: {
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: 15,
    marginVertical: 10,
  },
  filterMenuBtn: {
    backgroundColor: '#F9A826',
    marginRight: 5,
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 20,
  },
  filterMenuText: {
    color: '#fff',
  },
  containerMenu: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    // alignContent: 'center',
    // alignItems: 'center',
    // alignSelf: 'center',
    // width: '100%',
    // marginHorizontal: 10,
  },
  itemMenu: {
    overflow: 'hidden',
    width: screenWidth.width / 2 - 10,
    height: 150,
    elevation: 1,
    margin: 5,
    // marginVertical: 4,
    borderRadius: 10,
  },
  itemImg: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  itemDesc: {
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.3)',
    left: 0,
    bottom: 0,
    top: 0,
    right: 0,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemText: {
    marginLeft: 6,
    marginTop: 5,
    color: '#fff',
  },
  itemIcon: {
    alignSelf: 'center',
    marginRight: 5,
    bottom: '-85%',
    paddingHorizontal: 6,
    borderRadius: 4,
    color: '#fff',
    fontSize: 12,
    backgroundColor: 'red',
  },

  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalBody: {
    backgroundColor: '#fff',
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 40,
    width: '100%',
  },
  modalItemCount: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  ModalTitle: {
    alignSelf: 'center',
    marginBottom: 10,
    fontSize: 18,
    color: '#3f3d56',
  },
  selectItemIncDec: {
    backgroundColor: '#F9A826',
    alignSelf: 'center',
    padding: 15,
    fontSize: 20,
    color: '#fff',
    borderRadius: 10,
  },
  selectItemNumber: {
    fontSize: 45,
    color: '#2D4B94',
    fontWeight: 'bold',
  },
  modalFooter: {
    alignItems: 'center',
  },
  modalSubmitBtn: {
    backgroundColor: '#F9A825',
    padding: 10,
    width: '100%',
    marginVertical: 10,
    borderRadius: 5,
  },
  modalCloseBtn: {
    borderRadius: 100,
    marginBottom: 5,
  },
  modalBtnText: {
    color: '#fff',
    fontSize: 17,
    textAlign: 'center',
  },
});
