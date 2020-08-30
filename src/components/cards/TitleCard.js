import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';

const TitleCard = (props) => {
  return <View style={styles.DashboardInfoCard}>{props.children}</View>;
};

export default TitleCard;

const styles = StyleSheet.create({
  DashboardInfoCard: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingLeft: 15,
    elevation: 3,
    width: '93%',
    height: '17%',
    marginTop: '-19%',
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 5,
    overflow: 'hidden',
  },
});
