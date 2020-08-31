import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TouchableHighlight,
  KeyboardAvoidingView,
} from 'react-native';
import MainBackground from '../../components/body/MainBackground';
import second_bg from '../../images/second_bg.png';
import Header from '../../components/headers/Header';
import Icon from 'react-native-vector-icons/FontAwesome';
import Footer from '../../components/footers/Footer';
import Content from '../../components/body/Content';
import {connect, useDispatch, useSelector} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';
import {
  delMenuOrder,
  updateOrder,
  prosesOrder,
  EmptyOrder,
  updateMenu,
} from '../../redux/orders/OrderAction';
import {postRequest, getRequest} from '../../config/AxiosMethod';
import {TextInput} from 'react-native-gesture-handler';
import CurrencyFormat from 'react-currency-format';
import {set_error, setLoading} from '../../redux/general/GeneralAction';

const ViewBasket = (props) => {
  const {navigation, OrderReducer, GeneralReducer, LoginReducer, route} = props;
  const [modal, setModal] = useState(false);
  const [alert, setAlert] = useState({modal: false});
  const [dataOrder, setDataOrder] = useState(OrderReducer);
  const [total, setTotal] = useState(OrderReducer.total_bayar);
  const [dataEdit, setDataEdit] = useState({});
  const [namaPesanan, setNamaPesanan] = useState('');
  const [cancelMenu, setCancelMenu] = useState({modal: false});
  const dispatch = useDispatch();
  const isFocus = useIsFocused();
  const Increase = () => {
    let jumlah = dataEdit.jumlah + 1;

    setDataEdit({...dataEdit, jumlah});
  };
  const Decrease = () => {
    let jumlah = dataEdit.jumlah - 1;
    setDataEdit({...dataEdit, jumlah});
  };

  const getDetailOrder = () => {
    console.log('route.params.id_pesanan', route.params.id_pesanan);
    dispatch(setLoading(true));
    getRequest(`daftar-pesanan/${route.params.id_pesanan}`)
      .then((res) => {
        setDataOrder(res.data);
        countTotal(res.data.menu);
        dispatch(setLoading(false));
      })
      .catch((err) => {
        dispatch(setLoading(false));
      });
  };

  const findIndexOfmenu = (arr, compare, equal = true) => {
    return equal
      ? arr.filter((data) => compare.id_daftar_menu === data.id_daftar_menu)
      : arr.filter((data) => compare.id_daftar_menu !== data.id_daftar_menu);
  };

  const countTotal = (data) => {
    const total = data.reduce((total, item) => {
      return item.harga_total + total;
    }, 0);
    setTotal(total);
  };

  const handleAddItem = async () => {
    setModal(!modal);
    if (props.route.params !== undefined) {
      const update = dispatch(updateMenu(dataEdit));
      update
        .then((res) => {
          getDetailOrder();
        })
        .catch((err) => {
          dispatch(
            set_error({error: true, msg: `${err.response.data.status}`}),
          );
        });
    } else {
      dispatch(
        updateOrder({
          id_daftar_menu: dataEdit.id_daftar_menu,
          jumlah: dataEdit.jumlah,
        }),
      );
    }
  };

  const handleProses = () => {
    const kode = new Date().getTime();
    const id_outlet = LoginReducer.user.outlet.id_outlet;

    const update = dispatch(
      prosesOrder({
        ...dataOrder,
        nama_pesanan: namaPesanan,
        kode_pesanan: `MS${id_outlet}-${kode}`,
      }),
    );
    update
      .then((res) => {
        props.navigation.navigate('createOrderPage');
      })
      .catch((err) => {
        console.log('ERROR');
      });
  };

  const handlePayOrder = (id) => {
    dispatch(setLoading(true));
    getRequest(`daftar-pesanan/pay-order/${id}`)
      .then((res) => {
        console.log('respon pay order', res);
        setAlert({modal: false});
        getDetailOrder();
      })
      .catch((err) => {
        console.log('error pay order', err.request);
        dispatch(setLoading(false));
      });
  };

  // Kosong kan keranjang di redux
  const handleDeleteItem = () => {
    setModal(!modal);
    if (props.route.params !== undefined) {
      console.log('dataEdit', dataEdit);
      postRequest(`daftar-pesanan/delete`, dataEdit)
        .then((res) => {
          console.log('res', res);
          getDetailOrder();
        })
        .catch((err) => console.log('error', err.response));
    } else {
      dispatch(delMenuOrder(dataEdit.id_daftar_menu));
    }
  };

  // batalkan pesanan yang telah di proses
  const handleCancelOrder = () => {
    postRequest(`daftar-pesanan/cancel-order`, {...cancelMenu, ...dataOrder})
      .then((res) => {
        console.log('cancel order', res);
        setCancelMenu({modal: !cancelMenu.modal});
        props.navigation.goBack();
      })
      .catch((err) => {
        dispatch(set_error({error: true, msg: 'Gagal !'}));
      });
  };

  const clearBasket = () => {
    dispatch(EmptyOrder());
  };

  const getDataAfterUseEffect = () => {
    if (props.route.params !== undefined) {
      getDetailOrder();
    } else {
      setDataOrder(OrderReducer);
      setTotal(OrderReducer.total_bayar);
    }
  };

  useEffect(() => {
    getDataAfterUseEffect();
  }, [OrderReducer]);

  useEffect(() => {
    getDataAfterUseEffect();
  }, [isFocus]);

  return (
    <MainBackground source={second_bg}>
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
        TextHeader={dataOrder.kode_pesanan}
        navigation={navigation}
      />
      <ModalConfirmCancel
        cancelMenu={cancelMenu}
        setCancelMenu={setCancelMenu}
        handleCancelOrder={handleCancelOrder}
      />
      <ModalConfirmPay
        alert={alert}
        setAlert={setAlert}
        handlePayOrder={handlePayOrder}
      />
      <Content>
        <View style={styles.contentWrap}>
          <Text style={styles.contentTitle}>Detail Pesanan</Text>
          {GeneralReducer.error && (
            <Text style={{...styles.contentTitle, color: 'red'}}>
              {GeneralReducer.msg}
            </Text>
          )}
          <View style={styles.contentHeader}>
            <Text style={styles.headerDate}>
              {dataOrder.tgl && dataOrder.tgl}
            </Text>
          </View>
          <View style={styles.headerText}>
            <Text style={styles.headerTextOne}>
              Item Pesanan : {dataOrder.nama_pesanan}
            </Text>
            {dataOrder.status === 'proses' && (
              <TouchableOpacity
                onPress={() =>
                  setCancelMenu({
                    modal: !cancelMenu.modal,
                  })
                }>
                <Text style={styles.cancelBtn}>Batalkan Pesanan</Text>
              </TouchableOpacity>
            )}
            {dataOrder.status === 'tunggu' && dataOrder.menu.length !== 0 && (
              <TouchableOpacity onPress={clearBasket}>
                <Text style={styles.cancelBtn}>Batal</Text>
              </TouchableOpacity>
            )}
          </View>
          <View style={styles.itemList}>
            {dataOrder.menu &&
              dataOrder.menu.map((view, i) => (
                <View key={i} style={styles.subItem}>
                  {(dataOrder.status === 'proses' ||
                    dataOrder.status === 'tunggu') && (
                    <Icon
                      style={styles.iconEdit}
                      onPress={() => {
                        setModal(true);
                        setDataEdit(view);
                      }}
                      name="edit"
                    />
                  )}
                  <Text style={styles.subItemName}>{view.nama_menu}</Text>
                  <Text style={styles.subItemNumber}>{view.jumlah}x</Text>
                  <CurrencyFormat
                    value={view.harga_total}
                    displayType={'text'}
                    thousandSeparator={true}
                    prefix={'Rp.'}
                    renderText={(value) => (
                      <Text style={styles.subItemPrice}>{value}</Text>
                    )}
                  />
                </View>
              ))}

            <View style={styles.itemFooter}>
              <Text style={styles.subItemNameTotal}>Total Bayar</Text>
              <CurrencyFormat
                value={total}
                displayType={'text'}
                thousandSeparator={true}
                prefix={'Rp.'}
                renderText={(value) => (
                  <Text style={styles.subItemTotalPrice}>{value}</Text>
                )}
              />
            </View>
          </View>
          {/* status tunggu varable dari order reduces bukan dari database */}
          {dataOrder.status === 'tunggu' ? (
            dataOrder.menu.length === 0 ? (
              <TouchableOpacity
                style={styles.submitBtn}
                onPress={() =>
                  props.navigation.navigate('listMenu', {dataOrder: undefined})
                }>
                <Text style={styles.submitBtnText}>Daftar Menu</Text>
              </TouchableOpacity>
            ) : (
              <>
                <View style={{marginTop: 20}} />
                <Text style={{marginBottom: 5}}>Nama Pesanan</Text>
                <TextInput
                  placeholder="Contoh : Nomor Meja, Nama Pemesan, Nama Unik"
                  defaultValue={namaPesanan}
                  onChangeText={(e) => {
                    setNamaPesanan(e);
                  }}
                  style={styles.inputStyle}
                />
                <TouchableOpacity
                  style={styles.submitBtn}
                  onPress={handleProses}>
                  <Text style={styles.submitBtnText}>Buat Pesanan</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.submitBtn}
                  onPress={() =>
                    props.navigation.navigate('listMenu', {
                      dataOrder: undefined,
                    })
                  }>
                  <Text style={styles.submitBtnText}>Tambah Menu</Text>
                </TouchableOpacity>
              </>
            )
          ) : dataOrder.status === 'batal' || dataOrder.status === 'selesai' ? (
            <>
              <Text
                style={
                  dataOrder.status === 'batal'
                    ? {...styles.textWarning}
                    : {...styles.textSuccess}
                }>
                Status: {dataOrder.status}
              </Text>
              <Text
                style={{
                  marginTop: 5,
                  textAlign: 'center',
                  alignSelf: 'center',
                }}>
                {dataOrder.ket && `Catatan: ${dataOrder.ket}`}
              </Text>
            </>
          ) : (
            <>
              <TouchableOpacity
                style={styles.modalDeleteBtn}
                onPress={() =>
                  setAlert({modal: true, id_pesanan: dataOrder.id_pesanan})
                }>
                <Text style={styles.submitBtnText}>Bayar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => props.navigation.navigate('listMenu', dataOrder)}
                style={styles.modalSubmitBtn}>
                <Text style={styles.submitBtnText}>Tambah Menu</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </Content>

      <Modal animationType="slide" transparent={true} visible={modal}>
        <View style={styles.modalContainer}>
          <TouchableHighlight
            underlayColor="transparent"
            onPress={() => {
              setModal(!modal);
              setDataEdit({});
            }}
            style={styles.modalCloseBtn}>
            <Icon style={styles.modalBtnText} name="close" />
          </TouchableHighlight>
          <View style={styles.modalBody}>
            <Text style={styles.ModalTitle}>{dataEdit.nama_menu}</Text>
            <View style={styles.modalItemCount}>
              <Icon
                style={styles.selectItemIncDec}
                onPress={() =>
                  dataEdit.jumlah > 0 && dataOrder.menu.length > 0 && Decrease()
                }
                name="minus"
              />
              <Text style={styles.selectItemNumber}>{dataEdit.jumlah}</Text>
              <Icon
                style={styles.selectItemIncDec}
                onPress={Increase}
                name="plus"
              />
            </View>
            <View style={styles.modalFooter}>
              {dataEdit.jumlah === 0 ? (
                <TouchableHighlight
                  underlayColor="red"
                  style={styles.modalDeleteBtn}
                  disabled={dataOrder.menu.length === 1 && true}
                  onPress={handleDeleteItem}>
                  <Text style={styles.modalBtnText}>Hapus</Text>
                </TouchableHighlight>
              ) : (
                <TouchableHighlight
                  underlayColor="#F9A825"
                  style={styles.modalSubmitBtn}
                  onPress={handleAddItem}>
                  <Text style={styles.modalBtnText}>Simpan</Text>
                </TouchableHighlight>
              )}
            </View>
          </View>
        </View>
      </Modal>

      <Footer />
    </MainBackground>
  );
};

const ModalConfirmCancel = (props) => {
  const stateGlobal = useSelector((state) => state.GeneralReducer);
  const {cancelMenu, setCancelMenu, handleCancelOrder} = props;
  const closeModal = () => {
    setCancelMenu({modal: !cancelMenu.modal});
  };
  return (
    <Modal animationType="slide" transparent={true} visible={cancelMenu.modal}>
      <View style={styles.modalContainer}>
        <TouchableHighlight
          underlayColor="transparent"
          onPress={closeModal}
          style={styles.modalCloseBtn}>
          <Icon style={styles.modalBtnText} name="close" />
        </TouchableHighlight>
        <View style={styles.modalBody}>
          <Text style={styles.ModalTitle}>
            {stateGlobal.error
              ? stateGlobal.msg
              : `Pesanan Diproses, Batalkan ?`}
          </Text>
          <Text>Catatan* :</Text>
          <KeyboardAvoidingView behavior="padding">
            <TextInput
              style={{
                borderWidth: 1,
                height: 40,
                paddingVertical: 5,
                paddingHorizontal: 10,
                borderColor: '#eaeaea',
                borderRadius: 5,
              }}
              multiline={true}
              onChangeText={(e) => {
                setCancelMenu({
                  ...cancelMenu,
                  catatan: e,
                });
              }}
            />
          </KeyboardAvoidingView>
          <TouchableOpacity
            style={styles.modalDeleteBtn}
            onPress={handleCancelOrder}>
            <Text style={styles.modalBtnText}>Batalkan</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};
const ModalConfirmPay = (props) => {
  const {alert, handlePayOrder, setAlert} = props;

  return (
    <Modal animationType="slide" transparent={true} visible={alert.modal}>
      <View style={styles.modalContainer}>
        <TouchableHighlight
          underlayColor="transparent"
          onPress={() => setAlert({modal: false})}
          style={styles.modalCloseBtn}>
          <Icon style={styles.modalBtnText} name="close" />
        </TouchableHighlight>
        <View style={styles.modalBody}>
          <Text style={styles.ModalTitle}>Selesaikan Pesanan</Text>
          <TouchableOpacity
            style={styles.modalSubmitBtn}
            onPress={() => handlePayOrder(alert.id_pesanan)}>
            <Text style={styles.modalBtnText}>Ya</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const mapStateToProps = ({OrderReducer, GeneralReducer, LoginReducer}) => ({
  OrderReducer,
  GeneralReducer,
  LoginReducer,
});
const mapDispatchToProps = (dispatch) => ({
  delMenuOrder: (id) => dispatch(delMenuOrder(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ViewBasket);

const styles = StyleSheet.create({
  contentWrap: {
    marginVertical: 10,
    // marginHorizontal: 15,
    paddingVertical: 15,
    paddingHorizontal: 8,
  },
  contentTitle: {
    fontSize: 18,
    alignSelf: 'center',
    marginBottom: 10,
    fontFamily: 'Poppins-SemiBold',
  },
  contentHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: 5,
  },
  headerDate: {
    fontStyle: 'italic',
    color: '#3F3D56',
  },
  headerText: {
    display: 'flex',
    flexDirection: 'row',
    marginVertical: 15,
    justifyContent: 'space-between',
  },
  headerTextOne: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
  },
  contentText: {
    fontSize: 16,
  },
  textWarning: {
    marginTop: 10,
    textAlign: 'center',
    alignSelf: 'center',
    color: '#fff',
    padding: 10,
    borderRadius: 10,
    backgroundColor: 'red',
  },
  textSuccess: {
    marginTop: 10,
    textAlign: 'center',
    alignSelf: 'center',
    color: '#fff',
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#F9A826',
  },
  inputStyle: {
    borderWidth: 1,
    borderColor: '#3f3d56',
    borderRadius: 10,
    paddingHorizontal: 10,
    height: 40,
  },
  itemList: {
    marginHorizontal: 5,
  },
  subItem: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 8,
  },
  subItemName: {
    width: '52%',
    alignSelf: 'center',
    fontSize: 15,
    paddingHorizontal: 3,
    fontFamily: 'Poppins-Regular',
  },
  subItemNumber: {
    // fontStyle: 'italic',
    fontSize: 16,
    alignSelf: 'center',
    width: '8%',
    fontFamily: 'Poppins-Regular',
  },
  subItemPrice: {
    fontSize: 13,
    alignSelf: 'center',
    width: '25%',
    textAlign: 'right',
    fontFamily: 'Poppins-Regular',
  },
  iconEdit: {
    backgroundColor: '#F9A826',
    alignSelf: 'center',
    justifyContent: 'center',
    padding: 4,
    fontSize: 15,
    borderRadius: 5,
    color: '#fff',
    marginRight: 2,
  },
  iconDelete: {
    backgroundColor: '#F92626',
    alignSelf: 'center',
    justifyContent: 'center',
    padding: 4,
    fontSize: 15,
    borderRadius: 5,
    color: '#fff',
  },
  itemFooter: {
    display: 'flex',
    borderTopWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
    paddingTop: 5,
  },
  subItemNameTotal: {
    fontSize: 17,
    fontFamily: 'Poppins-SemiBold',
  },
  subItemTotalPrice: {
    fontSize: 17,
    fontFamily: 'Poppins-SemiBold',
  },
  submitBtn: {
    alignSelf: 'center',
    backgroundColor: '#F9A826',
    padding: 10,
    marginVertical: 10,
    width: '100%',
    borderRadius: 5,
  },
  submitBtnText: {
    alignSelf: 'center',
    // fontWeight: 'bold',
    fontSize: 20,
    color: '#fff',
  },
  cancelBtn: {
    marginTop: 5,
    color: '#F92626',
    fontFamily: 'Poppins-Regular',
  },

  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    paddingHorizontal: 5,
  },
  modalBody: {
    backgroundColor: '#fff',
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
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
    fontSize: 20,
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
  modalDeleteBtn: {
    backgroundColor: 'red',
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
    fontSize: 15,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
