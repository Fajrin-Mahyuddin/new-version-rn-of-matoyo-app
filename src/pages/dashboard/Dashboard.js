import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Header from '../../components/headers/Header';
import Footer from '../../components/footers/Footer';
import backgroundImg from '../../images/backgroundImg.png';
import Pesanan from '../../images/icon/pesanan.svg';
import Finger from '../../images/icon/finger.svg';
import Report from '../../images/icon/report.svg';
import MainBackground from '../../components/body/MainBackground';
import Content from '../../components/body/Content';
import {connect} from 'react-redux';
import {get_profile} from '../../redux/login/LoginAction';
import {getReset} from '../../redux/general/GeneralAction';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nama: 'fajrin',
    };
  }

  componentDidMount() {
    this.props.getReset();
  }

  render() {
    const {navigation} = this.props;
    console.log('----------', this.props);
    return (
      <MainBackground source={backgroundImg} navigation={navigation}>
        <Header
          welcomeText={true}
          ShowDrawerBtn={true}
          ShowSubHeader={true}
          ShowBackBtn={false}
          ShowTextHeader={false}
          ShowBagBtn={false}
          ShowProfile={true}
          ShowFilterBtn={false}
          ShowEditBtn={false}
          navigation={this.props.navigation}
        />
        <Content>
          <View style={styles.content}>
            <Text style={styles.contentTitleOne}>Menu Utama</Text>
            <View style={styles.mainMenuWrapper}>
              <TouchableOpacity
                onPress={() => navigation.navigate('createOrderPage')}
                style={styles.btnMainMenu}>
                <Text style={styles.btnTextMainMenu}>Pesanan</Text>
                <Pesanan style={styles.btnIconMainMenu} width={'100%'} />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.btnMainMenu}
                onPress={() => navigation.navigate('absen')}>
                <Text style={styles.btnTextMainMenu}>QR - Code</Text>
                <Finger style={styles.btnIconMainMenu} width={'100%'} />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.btnMainMenu}
                onPress={() => navigation.navigate('reportPage')}>
                <Text style={styles.btnTextMainMenu}>Laporan</Text>
                <Report style={styles.btnIconMainMenu} width={'100%'} />
              </TouchableOpacity>
            </View>
            <View style={styles.deviderLine}></View>
            {/* <Text style={styles.contentTitleOne}>Media Sosial</Text>
            <MedsosCard navigation={this.props.navigation} /> */}
          </View>
        </Content>
        <Footer />
      </MainBackground>
    );
  }
}

const mapStateToProps = (state) => ({
  GlobalState: state,
});
const mapDispatchToProps = (dispatch) => ({
  get_profile: (data) => dispatch(get_profile(data)),
  getReset: (data) => dispatch(getReset(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);

const styles = StyleSheet.create({
  content: {},
  contentTitleOne: {
    marginVertical: 10,
    alignSelf: 'center',
    fontSize: 15,
    fontWeight: '500',
  },
  mainMenuWrapper: {
    flexWrap: 'wrap',
    display: 'flex',
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
  btnMainMenu: {
    width: '30%',
    backgroundColor: '#FFEE00',
    borderRadius: 10,
    padding: 5,
    marginHorizontal: 5,
    marginVertical: 7,
  },
  btnTextMainMenu: {
    alignSelf: 'center',
    marginBottom: 6,
    color: '#3F3D56',
  },
  btnIconMainMenu: {
    marginBottom: 8,
    maxHeight: 150,
    // backgroundColor: 'salmon',
  },
  deviderLine: {
    borderTopWidth: 1,
    borderTopColor: '#eaeaea',
    // marginTop: 10,
    marginHorizontal: 11,
  },
  btnSosialMedia: {
    backgroundColor: '#FFEE00',
    color: '#3F3D56',
    borderRadius: 6,
    padding: 5,
  },
});
