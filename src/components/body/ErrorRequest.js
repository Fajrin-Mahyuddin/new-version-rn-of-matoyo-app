import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector, useDispatch} from 'react-redux';
import {login_post} from '../../redux/login/LoginAction';
import {getReset} from '../../redux/general/GeneralAction';

const ErrorRequest = (props) => {
  const {msg} = useSelector(({GeneralReducer}) => GeneralReducer);
  const dispatch = useDispatch();
  return (
    <View style={styles.loadingStyle}>
      <Text style={{color: '#fff'}}>{props.lastRefresh}</Text>
      <Text style={{color: '#fff', fontSize: 17}}>{msg}</Text>
      <MaterialCommunityIcons
        onPress={() => dispatch(getReset())}
        name="reload"
        color="#fff"
        size={50}
      />
    </View>
  );
};

export default ErrorRequest;

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
