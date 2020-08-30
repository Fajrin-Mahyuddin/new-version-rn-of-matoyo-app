import React, {Component} from 'react';
import {Text, View, StyleSheet, ImageBackground} from 'react-native';

const Content = (props) => {
  return <View style={styles.contentWrap}>{props.children}</View>;
};

export default Content;

const styles = StyleSheet.create({
  contentWrap: {
    backgroundColor: '#fff',
    flex: 1,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
});
