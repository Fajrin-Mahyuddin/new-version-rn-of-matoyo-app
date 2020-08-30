import React, {Component} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import Facebook from '../../images/icon/Facebook.svg';
import Instagram from '../../images/icon/Instagram.svg';
import Whatsapp from '../../images/icon/Whatsapp.svg';

export default class MedsosCard extends Component {
  render() {
    return (
      <View style={{...styles.mainMenuWrapper, marginHorizontal: 50}}>
        <TouchableOpacity>
          <Facebook />
        </TouchableOpacity>
        <TouchableOpacity>
          <Instagram />
        </TouchableOpacity>
        <TouchableOpacity>
          <Whatsapp />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainMenuWrapper: {
    flexWrap: 'wrap',
    display: 'flex',
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
});
