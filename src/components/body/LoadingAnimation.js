import React from 'react';
import {View, StyleSheet} from 'react-native';
import * as Animatable from 'react-native-animatable';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {getReset} from '../../redux/general/GeneralAction';
import {useDispatch} from 'react-redux';

const LoadingAnimation = () => {
  const dispatch = useDispatch();
  return (
    <View style={styles.loadingStyle}>
      <Animatable.Text
        // style={{color: '#fff'}}
        animation={rotateAnimation}
        easing="linear"
        iterationCount="infinite">
        <MaterialCommunityIcons name="loading" color="#fff" size={60} />
      </Animatable.Text>
      {/* <MaterialCommunityIcons
        name="reload"
        onPress={() => dispatch(getReset())}
        color="#fff"
        size={100}
      /> */}
    </View>
  );
};

export default LoadingAnimation;

const rotateAnimation = {
  0: {
    rotate: '0deg',
  },
  1: {
    rotate: '360deg',
  },
};

const styles = StyleSheet.create({
  loadingStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    position: 'absolute',
    zIndex: 2000,
    backgroundColor: 'rgba(0,0,0, 0.5)',
    bottom: 0,
    left: 0,
    right: 0,
    top: 0,
  },
});
