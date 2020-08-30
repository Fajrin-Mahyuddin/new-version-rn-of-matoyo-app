import React, {useState, useEffect} from 'react';
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
} from 'react-native';
import MainBackground from '../../components/body/MainBackground';
import second_bg from '../../images/second_bg.png';
import Header from '../../components/headers/Header';
import Icon from 'react-native-vector-icons/FontAwesome';
import Footer from '../../components/footers/Footer';
import Content from '../../components/body/Content';
import {connect, useDispatch} from 'react-redux';
import {delMenuOrder, updateOrder} from '../../redux/orders/OrderAction';

const ProcessOrderPage = (props) => {
  const {navigation, OrderReducer} = props;
  // const {tgl, kode_pesanan, status, menu, total_bayar} = OrderReducer;

  const [modal, setModal] = useState(false);
  const [dataOrder, setDataOrder] = useState(OrderReducer);
  const [dataEdit, setDataEdit] = useState({});
  const dispatch = useDispatch();

  const Increase = () => {
    let jumlah = dataEdit.jumlah + 1;
    setDataEdit({...dataEdit, jumlah});
  };
  const Decrease = () => {
    let jumlah = dataEdit.jumlah - 1;
    setDataEdit({...dataEdit, jumlah});
  };

  const handleProses = (data) => {
    // dispatch menggunakan dataOrder
  };

  useEffect(() => {
    setDataOrder(props.OrderReducer);
    if (props.route.params !== undefined) {
      setDataOrder(props.route.params);
    }
  }, [OrderReducer]);

  console.log('view bakset', props);
  console.log('dataOrder ', dataOrder);

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
      <Content>
        <View style={styles.contentWrap}>
          <Text style={styles.contentTitle}>Detail Pesanan</Text>
          <View style={styles.contentHeader}>
            <Text style={styles.headerDate}>
              {dataOrder.tgl && dataOrder.tgl}
            </Text>
            {/* <TouchableOpacity>
              <Text style={styles.cancelBtn}>Batalkan Pesanan</Text>
            </TouchableOpacity> */}
          </View>
          <View style={styles.headerText}>
            <Text style={styles.headerTextOne}>Item Pesanan :</Text>
            {dataOrder.total_bayar !== 0 && (
              <TouchableOpacity>
                <Text style={styles.cancelBtn}>Batalkan Pesanan</Text>
              </TouchableOpacity>
            )}
          </View>
          <View style={styles.itemList}>
            {dataOrder.menu.map((view, i) => (
              <View key={i} style={styles.subItem}>
                {dataOrder.status !== 'selesai' && (
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
                <Text style={styles.subItemPrice}>Rp. {view.harga_total}</Text>
              </View>
            ))}

            <View style={styles.itemFooter}>
              <Text style={styles.subItemNameTotal}>Total Bayar</Text>
              <Text style={styles.subItemTotalPrice}>
                Rp. {dataOrder.total_bayar}
              </Text>
            </View>
          </View>
          {dataOrder.status === 'tunggu' ? (
            dataOrder.menu.length === 0 ? (
              <Text></Text>
            ) : (
              <TouchableOpacity style={styles.submitBtn} onPress={handleProses}>
                <Text style={styles.submitBtnText}>Proses</Text>
              </TouchableOpacity>
            )
          ) : (
            <TouchableOpacity style={styles.modalDeleteBtn}>
              <Text style={styles.submitBtnText}>Bayar</Text>
            </TouchableOpacity>
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
                onPress={() => dataEdit.jumlah > 0 && Decrease()}
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
                  onPress={() => {
                    dispatch(delMenuOrder(dataEdit.id_daftar_menu));
                    setModal(!modal);
                  }}>
                  <Text style={styles.modalBtnText}>Hapus</Text>
                </TouchableHighlight>
              ) : (
                <TouchableHighlight
                  underlayColor="#F9A825"
                  style={styles.modalSubmitBtn}
                  onPress={() => {
                    setModal(!modal);
                    dispatch(
                      updateOrder({
                        id_daftar_menu: dataEdit.id_daftar_menu,
                        jumlah: dataEdit.jumlah,
                      }),
                    );
                  }}>
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

const mapStateToProps = ({OrderReducer}) => ({
  OrderReducer,
});
const mapDispatchToProps = (dispatch) => ({
  delMenuOrder: (id) => dispatch(delMenuOrder(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProcessOrderPage);

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
    fontSize: 20,
  },
  contentText: {
    fontSize: 16,
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
  },
  subItemNumber: {
    fontStyle: 'italic',
    fontSize: 16,
    alignSelf: 'center',
    width: '8%',
  },
  subItemPrice: {
    fontSize: 13,
    alignSelf: 'center',
    width: '25%',
    textAlign: 'right',
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
    fontWeight: 'bold',
    fontSize: 17,
  },
  subItemTotalPrice: {
    fontSize: 17,
    fontWeight: 'bold',
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
    fontWeight: 'bold',
    fontSize: 20,
    color: '#fff',
  },
  cancelBtn: {
    marginTop: 5,
    color: '#F92626',
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
    fontSize: 20,
    color: '#2D4B94',
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
