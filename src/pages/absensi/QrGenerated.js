import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import {encode} from 'js-base64';

class QrGenerated extends Component {
  constructor(props) {
    super(props);
    {
      this.state = {
        data: null,
      };
    }
  }

  onSuccess = (e) => {
    console.log('dari qrcode', e);
    this.setState({
      data: e.data,
    });
  };

  render() {
    let logoFromFile = require('../../images/current_logo_mini.png');
    const data = {
      nama: 'Mahyuddin',
      id: '333333',
      email: 'fajrin@gmailc.om',
    };
    const encrypt = encode(JSON.stringify(data));
    return (
      <View style={styles.container}>
        <QRCode
          value={encrypt}
          size={300}
          logo={logoFromFile}
          logoBorderRadius={100}
        />
        <Text style={styles.text}>ID : 1245</Text>
      </View>
    );
  }
}

export default QrGenerated;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    margin: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    marginTop: 20,
    fontSize: 17,
    color: '#3f3d56',
  },
});
