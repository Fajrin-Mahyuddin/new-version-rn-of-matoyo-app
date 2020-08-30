import React, {Component, Fragment} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {decode} from 'js-base64';
import {postRequest} from '../../config/AxiosMethod';
import {connect} from 'react-redux';
import {setLoading} from '../../redux/general/GeneralAction';
import Feather from 'react-native-vector-icons/Feather';

class AbsensiPage extends Component {
  constructor(props) {
    super(props);
    {
      this.state = {
        userData: null,
        isSuccess: false,
        rawData: null,
        camera: true,
        msg: '',
      };
    }
  }

  changeCamera = () => {
    this.setState({camera: !this.state.camera});
  };

  onTess = () => {
    // let time = new Date().getHours();
    // let time = 22;
    // let ket = '';
    // if (time > 6 && time < 8) {
    //   ket = 'masuk';
    // } else if (time > 15 && time < 23) {
    //   ket = 'pulang';
    // } else {
    //   ket = 'terlambat';
    // }
    // console.log('Tes jam ', ket);
  };

  onSuccess = (e) => {
    const {setLoading} = this.props;
    console.log('dari qrcode', e);
    const data = JSON.parse(decode(e.data));
    console.log('))))))))))))))', data);
    // let time = new Date().getHours();
    // let time = 22;
    // let ket = '';
    // if (time > 6 && time < 8) {
    //   ket = 'masuk';
    // } else if (time > 15 && time < 23) {
    //   ket = 'pulang';
    // } else {
    //   ket = 'terlambat';
    // }
    setLoading(true);
    postRequest(`absensi/absen`, {id_user: data.id})
      .then((res) => {
        console.log('respon', res.data);
        setLoading(false);
        this.setState({isSuccess: true, msg: 'Berhasil !'}, () =>
          setTimeout(() => {
            this.setState({isSuccess: false, msg: ''});
          }, 2000),
        );
      })
      .catch((err) => {
        console.log('ERROR', err);
        console.log('ERROR RESPONSE', err.response);
        console.log('ERROR REQUEST', err.request);
        setLoading(false);
        this.setState({isSuccess: true, msg: 'Ulangi !'}, () =>
          setTimeout(() => {
            this.setState({isSuccess: false, msg: ''});
          }, 2000),
        );
      });
    // this.setState(
    //   {
    //     userData: data.id,
    //     rawData: e.data,
    //     isSuccess: true,
    //   },
    //   () => {
    //     setTimeout(() => {
    //       // this.props.navigation.navigate('Dashboard');
    //       this.setState({isSuccess: false});
    //     }, 3000);
    //   },
    // );
  };
  render() {
    const {userData, isSuccess, rawData, camera, msg} = this.state;
    console.log(']]]]]]]', new Date().getHours());
    return (
      <View style={styles.container}>
        <QRCodeScanner
          ref={(node) => {
            this.scanner = node;
          }}
          onRead={this.onSuccess}
          cameraType={camera ? 'back' : 'front'}
          permissionDialogMessage="Need Access Camera"
          showMarker={true}
          reactivate={true}
          reactivateTimeout={3000}
          markerStyle={{borderColor: '#fff'}}
          topContent={
            <TouchableOpacity
              style={{
                marginTop: -35,
                backgroundColor: '#F9A826',
                padding: 6,
                borderRadius: 4,
              }}
              onPress={this.changeCamera}>
              <Feather name="camera" color="#fff" />
            </TouchableOpacity>
          }
          bottomContent={
            isSuccess ? (
              <Text>{msg}</Text>
            ) : (
              <Fragment>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => this.props.navigation.navigate('Dashboard')}>
                  <Text style={styles.buttonText}>Keluar</Text>
                </TouchableOpacity>
              </Fragment>
            )
          }
        />
      </View>
    );
  }
}

const mapDispatchToState = (dispatch) => ({
  setLoading: (data) => dispatch(setLoading(data)),
});

export default connect(null, mapDispatchToState)(AbsensiPage);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
  },
  textTop: {
    position: 'absolute',
    top: 10,
  },
  buttonText: {
    fontSize: 21,
    color: '#fff',
  },
  button: {
    position: 'absolute',
    bottom: 5,
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 40,
    backgroundColor: '#F9A826',
  },
});
