import React, {Component} from 'react';
import {Text} from 'react-native';

export default class Footer extends Component {
  render() {
    return (
      <Text
        style={{
          bottom: 0,
          zIndex: 100,
          paddingVertical: 4,
          position: 'absolute',
          textAlign: 'center',
          backgroundColor: '#fff',
          width: '100%',
        }}>
        {'\u00A9'} {new Date().getFullYear()} | Matoyo Sambusa
      </Text>
    );
  }
}
