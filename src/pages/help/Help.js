import React, {Component} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import MainBackground from '../../components/body/MainBackground';
import Header from '../../components/headers/Header';
import Content from '../../components/body/Content';
import second_bg from '../../images/second_bg.png';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import TextTitle from '../../components/body/TextTitle';

export default class Help extends Component {
  render() {
    return (
      <MainBackground source={second_bg}>
        <Header
          ShowBackBtn={true}
          ShowDrawerBtn={true}
          navigation={this.props.navigation}
        />
        <Content>
          <TextTitle>Frequently Ask Question !</TextTitle>
          <View style={{marginTop: 10}}>
            <TouchableOpacity style={styles.item}>
              <View style={styles.itemGroup}>
                <FontAwesome
                  style={styles.itemIcon}
                  name="angle-double-right"
                  size={22}
                />
                <Text style={styles.itemText}>
                  Bagaimana cara melakukan absensi
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.item}>
              <View style={styles.itemGroup}>
                <FontAwesome
                  style={styles.itemIcon}
                  name="angle-double-right"
                  size={22}
                />
                <Text style={styles.itemText}>Cara membuat laporan</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.item}>
              <View style={styles.itemGroup}>
                <FontAwesome
                  style={styles.itemIcon}
                  name="angle-double-right"
                  size={22}
                />
                <Text style={styles.itemText}>
                  Absen wajah tidak tertedeksi
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </Content>
      </MainBackground>
    );
  }
}

const styles = StyleSheet.create({
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
    color: '#3f3d56',
  },
  itemIcon: {
    alignSelf: 'center',
    color: '#3f3d56',
  },
});
