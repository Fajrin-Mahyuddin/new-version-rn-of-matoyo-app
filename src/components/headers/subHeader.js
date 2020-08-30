import React, {Component} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import Message from '../../images/icon/message.svg';
import User from '../../images/icon/user.svg';
import Basket from '../../images/icon/basket.svg';
import Help from '../../images/icon/help.svg';
import {useSelector} from 'react-redux';

const SubHeader = (props) => {
  const data = useSelector(({OrderReducer}) => OrderReducer);
  return (
    <View style={styles.headerProfileLink}>
      <TouchableOpacity
        onPress={() => props.navigation.navigate('viewBasketPage')}>
        <View>
          {data.menu.length !== 0 && (
            <View style={styles.wrapperBadge}>
              <Text style={styles.badge}>{data.menu.length}</Text>
            </View>
          )}
          <Basket />
        </View>
      </TouchableOpacity>
      {/* <TouchableOpacity
          onPress={() => this.props.navigation.navigate('chatPage')}>
          <Message />
        </TouchableOpacity> */}
      <TouchableOpacity
        onPress={() => props.navigation.navigate('profilePage')}>
        <User />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => props.navigation.navigate('help')}>
        <Help />
      </TouchableOpacity>
    </View>
  );
};

export default SubHeader;

const styles = StyleSheet.create({
  headerProfileLink: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: 25,
    marginTop: 10,
  },
  wrapperBadge: {
    position: 'absolute',
    zIndex: 100,
    width: '100%',
    height: '100%',
  },
  badge: {
    position: 'absolute',
    zIndex: 100,
    bottom: 5,
    right: 2,
    alignSelf: 'center',
    backgroundColor: 'red',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 50,
    color: '#fff',
  },
});
