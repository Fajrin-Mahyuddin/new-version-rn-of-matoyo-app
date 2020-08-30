import React, {useState} from 'react';
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
import backgroundImg from '../../images/backgroundImg.png';
// import MenuOne from '../../images/product/one.PNG';
import MenuOne from '../../images/product/two.png';
import Header from '../../components/headers/Header';
import TitleCard from '../../components/cards/TitleCard';
import Icon from 'react-native-vector-icons/FontAwesome';
import Footer from '../../components/footers/Footer';
import Content from '../../components/body/Content';

const DetailOrderPage = (props) => {
  return (
    <MainBackground source={backgroundImg}>
      <Header
        ShowCardName={false}
        ShowBarsBtn={true}
        TextHeader="Lihat Keranjang"
        navigation={props.navigation}
      />
      <Content>
        <View style={styles.contentWrap}>
          <View style={styles.itemHeader}>
            <Text style={styles.headerTextOne}>#NH12345</Text>
            <Text style={styles.headerTextTwo}>senin, 20 Januari 2020</Text>
          </View>
          <Text style={styles.contentText}>Item Pesanan :</Text>
          <View style={styles.itemList}>
            <View style={styles.subItem}>
              <Icon style={styles.iconEdit} name="edit" />
              <Icon style={styles.iconDelete} name="trash-o" />
              <Text style={styles.subItemName}>Sambusa Mammis</Text>
              <Text style={styles.subItemNumber}>13x</Text>
              <Text style={styles.subItemPrice}>@ Rp. 10.000</Text>
            </View>
            <View style={styles.subItem}>
              <Icon style={styles.iconEdit} name="edit" />
              <Icon style={styles.iconDelete} name="trash-o" />
              <Text style={styles.subItemName}>Kopi</Text>
              <Text style={styles.subItemNumber}>2x</Text>
              <Text style={styles.subItemPrice}>@ Rp. 200.000</Text>
            </View>
            <View style={styles.itemFooter}>
              <Text style={styles.subItemNameTotal}>Total Bayar</Text>
              <Text style={styles.subItemTotalPrice}>Rp. 40.000</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.submitBtn}>
            <Text style={styles.submitBtnText}>Proses</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.cancelBtn}>Batalkan Pesanan</Text>
          </TouchableOpacity>
        </View>
      </Content>

      <Footer />
    </MainBackground>
  );
};

const styles = StyleSheet.create({
  titleCardsIcon: {
    backgroundColor: '#F9A826',
    alignItems: 'center',
    justifyContent: 'center',
    width: 70,
    height: 70,
    borderRadius: 10,
  },
  icon: {
    fontSize: 40,
    color: '#fff',
  },
  badge: {
    position: 'absolute',
    color: '#fff',
    backgroundColor: '#2D4B94',
    paddingHorizontal: 8,
    fontWeight: 'bold',
    right: 5,
    bottom: 5,
    borderRadius: 10,
  },
  titleCardText: {
    marginLeft: 20,
    width: '100%',
  },
  // titleCardTextOne: {
  //   color: '#88898B',
  //   fontSize: 13,
  // },
  titleCardTextOne: {
    fontSize: 10,
    paddingHorizontal: 7,
    alignSelf: 'flex-start',
    color: '#fff',
    backgroundColor: '#2D4B94',
    borderRadius: 10,
  },
  titleCardTextTwo: {
    color: '#88898B',
    fontSize: 26,
    fontWeight: 'bold',
  },
  contentWrap: {
    marginVertical: 10,
    marginHorizontal: 15,
    paddingVertical: 15,
    paddingHorizontal: 8,
    backgroundColor: '#fff',
  },
  itemHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerTextOne: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2D4B94',
  },
  headerTextTwo: {
    color: '#010101',
    fontSize: 13,
    alignSelf: 'center',
    fontStyle: 'italic',
  },
  contentText: {
    fontSize: 16,
    marginVertical: 10,
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
    alignSelf: 'center',
    color: '#F92626',
  },
});

export default DetailOrderPage;
