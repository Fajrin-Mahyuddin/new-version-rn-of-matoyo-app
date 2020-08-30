import React from 'react';
import {Text, StyleSheet} from 'react-native';

const TextTitle = (props) => {
  return <Text style={styles.contentTitle}>{props.children}</Text>;
};

export default TextTitle;

const styles = StyleSheet.create({
  contentTitle: {
    fontSize: 18,
    alignSelf: 'center',
    marginVertical: 10,
    color: '#3f3d56',
    fontFamily: 'Poppins-Regular',
  },
});
