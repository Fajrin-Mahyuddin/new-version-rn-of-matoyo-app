import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import second_bg from '../../images/second_bg.png';
import Header from '../../components/headers/Header';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Footers from '../../components/footers/Footer';
import MainBackground from '../../components/body/MainBackground';
import Content from '../../components/body/Content';
import TextTitle from '../../components/body/TextTitle';

const ReportPage = (props) => {
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
          <TextTitle>Buat Laporan Hari Ini</TextTitle>
          <TouchableOpacity
            style={styles.item}
            onPress={() => props.navigation.navigate('historyPage')}>
            <View style={styles.itemGroup}>
              <MaterialIcons style={styles.itemIcon} name="history" size={25} />
              <Text style={styles.itemText}>History Laporan</Text>
            </View>
            <View style={styles.itemGroup}>
              <EvilIcons
                style={styles.itemIcon}
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
          onPress={() => props.navigation.navigate('createReportPage')}
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

export default ReportPage;
