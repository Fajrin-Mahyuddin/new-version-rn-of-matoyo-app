import React, {Component} from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  Image,
  TouchableHighlight,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import MainBackground from '../../components/body/MainBackground';
import backgroundImg from '../../images/backgroundImg.png';
import one from '../../images/galery/one.jpg';
import two from '../../images/galery/two.jpg';
import three from '../../images/galery/three.jpg';
import Header from '../../components/headers/Header';
import Content from '../../components/body/Content';
import Footer from '../../components/footers/Footer';
import MedsosCard from '../../components/cards/MedsosCard';
import {ScrollView} from 'react-native-gesture-handler';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {connect} from 'react-redux';
import {screenWidth} from '../../config/sizeConfig';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
    };
  }
  toggleModal = () => {
    this.setState({modal: !this.state.modal});
  };
  render() {
    const {modal} = this.state;
    console.log(this.props);
    return (
      <MainBackground source={backgroundImg}>
        <Header
          welcomeText={false}
          ShowDrawerBtn={false}
          ShowSubHeader={false}
          ShowBackBtn={true}
          ShowTextHeader={false}
          ShowBagBtn={false}
          ShowProfile={true}
          ShowFilterBtn={false}
          ShowEditBtn={false}
          TextHeader="#N20202020"
          navigation={this.props.navigation}
          toggleModal={this.toggleModal}
        />
        {/* <Modal animationType="slide" transparent={true} visible={modal}>
          <View style={styles.modalContainer}>
            <TouchableHighlight
              underlayColor="transparent"
              onPress={this.toggleModal}
              style={styles.modalCloseBtn}>
              <Fontisto style={styles.modalBtnText} name="close" />
            </TouchableHighlight>
            <View style={styles.modalBody}>
              <Text style={styles.contentTitleOne}>Edit Profile</Text>
              <SafeAreaView>
                <KeyboardAvoidingView enabled behavior="height">
                  <View style={styles.inputWrapper}>
                    <TextInput
                      placeholder="nama lengkap"
                      style={styles.inputStyle}
                      name="nama"
                    />
                  </View>
                  <View style={styles.inputWrapper}>
                    <TextInput
                      placeholder="nomor telphone"
                      style={styles.inputStyle}
                      name="nomor_telp"
                    />
                  </View>
                  <View style={styles.inputWrapper}>
                    <TextInput
                      placeholder="alamat"
                      style={styles.inputStyle}
                      name="alamat"
                    />
                  </View>
                  <View style={styles.inputWrapper}>
                    <TextInput
                      placeholder="facebook link profile"
                      style={styles.inputStyle}
                      name="facebook"
                    />
                  </View>
                  <View style={styles.inputWrapper}>
                    <TextInput
                      placeholder="instagram"
                      style={styles.inputStyle}
                      name="instagram"
                    />
                  </View>
                  <Text style={styles.contentTitleOne}>Ganti Password</Text>
                  <View style={styles.inputWrapper}>
                    <TextInput
                      placeholder="password lama"
                      style={styles.inputStyle}
                      name="old_password"
                    />
                  </View>
                  <View style={styles.inputWrapper}>
                    <TextInput
                      placeholder="password baru"
                      style={styles.inputStyle}
                      name="new_password"
                    />
                  </View>
                  <View style={styles.inputWrapper}>
                    <TextInput
                      placeholder="ulangi password baru"
                      style={styles.inputStyle}
                      name="re_new_password"
                    />
                  </View>
                </KeyboardAvoidingView>
              </SafeAreaView>
              <View style={styles.modalFooter}>
                <TouchableHighlight
                  underlayColor="#F9A825"
                  style={styles.modalSubmitBtn}>
                  <Text style={styles.modalBtnText}>Simpan</Text>
                </TouchableHighlight>
              </View>
            </View>
          </View>
        </Modal> */}
        <Content>
          {/* <Text style={styles.contentTitleOne}>Media Sosial</Text>
          <MedsosCard />
          <Text style={styles.contentTitleOne}>Galery Profil</Text>
          <View style={styles.galeryContainer}>
            <ScrollView horizontal={true} style={{height: '100%'}}>
              <TouchableOpacity>
                <Image style={styles.imgGalery} source={one} />
              </TouchableOpacity>
              <TouchableOpacity>
                <Image style={styles.imgGalery} source={two} />
              </TouchableOpacity>
              <TouchableOpacity>
                <Image style={styles.imgGalery} source={three} />
              </TouchableOpacity>
              <TouchableOpacity>
                <Image style={styles.imgGalery} source={one} />
              </TouchableOpacity>
              <TouchableOpacity>
                <Image style={styles.imgGalery} source={two} />
              </TouchableOpacity>
              <TouchableOpacity>
                <Image style={styles.imgGalery} source={three} />
              </TouchableOpacity>
            </ScrollView>
          </View>
          <Text style={styles.contentTitleOne}>Galery Laporan</Text>
          <View style={styles.galeryReport}>
            <Image style={styles.imgReport} source={one} />
            <Image style={styles.imgReport} source={two} />
            <Image style={styles.imgReport} source={three} />
            <Image style={styles.imgReport} source={one} />
          </View> */}
        </Content>
        <Footer />
      </MainBackground>
    );
  }
}

const styles = StyleSheet.create({
  contentTitleOne: {
    marginVertical: 10,
    alignSelf: 'center',
    fontSize: 15,
    fontWeight: '500',
  },
  galeryContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    height: 100,
    // backgroundColor: 'salmon',
  },
  imgGalery: {
    height: 100,
    width: screenWidth.width / 3.2,
    resizeMode: 'cover',
  },
  galeryReport: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  imgReport: {
    // marginHorizontal: 2,
    // marginVertical: 2,
    height: 70,
    width: screenWidth.width / 3,
    resizeMode: 'cover',
  },
  modalContainer: {
    backgroundColor: 'rgba(0,0,0, 0.5)',
    flex: 1,
    display: 'flex',
    justifyContent: 'flex-end',
  },
  modalCloseBtn: {
    marginBottom: 10,
    alignSelf: 'center',
  },
  modalBody: {
    backgroundColor: '#fff',
    width: '100%',
    paddingHorizontal: 10,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  inputWrapper: {
    height: 30,
    marginVertical: 5,
  },
  inputStyle: {
    paddingBottom: 10,
    paddingTop: 0,
    borderBottomWidth: 1,
    fontSize: 15,
    height: '100%',
  },
  modalFooter: {
    marginTop: 20,
  },
  modalSubmitBtn: {
    width: '100%',
    padding: 10,
    alignItems: 'center',
    backgroundColor: '#F9A826',
    marginVertical: 10,
  },
  modalBtnText: {
    color: '#fff',
    fontSize: 17,
  },
});

const mapStateToProps = (state) => ({
  LoginReducer: state.LoginReducer,
});

export default connect(mapStateToProps)(Profile);
