import React, {useState} from 'react';
import {Text, View, StyleSheet, Image, ImageBackground} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
  useIsDrawerOpen,
} from '@react-navigation/drawer';
import avatar from '../../images/default.png';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import {ScrollView} from 'react-native-gesture-handler';
// import MainBackground from '../body/MainBackground';
import {useSelector, useDispatch} from 'react-redux';
import {get_logout} from '../../redux/login/LoginAction';

const ProfileDrawerContent = (props) => {
  const data = useSelector((state) => state);
  const dispatch = useDispatch();
  const isDrawerOpen = useIsDrawerOpen();
  const {GeneralReducer, LoginReducer} = data;
  const logout = () => {
    isDrawerOpen && props.navigation.closeDrawer();
    dispatch(get_logout());
  };
  return (
    <ImageBackground
      source={require('../../images/backgroundImg.png')}
      style={styles.contaierDrawer}>
      <View style={styles.profileWrap}>
        <Image style={styles.profileImg} source={avatar} />
        <View>
          <Text style={styles.profileTextOne}>
            {LoginReducer.user.name || ''}
          </Text>
          <Text style={styles.profileTextTwo}>
            {LoginReducer.user.level || ''}
          </Text>
        </View>
      </View>
      <DrawerContentScrollView {...props}>
        {/* <View style={styles.profileLink}> */}
        {/* <DrawerItemList {...props} /> */}
        {/* </View> */}
        <DrawerItem
          onPress={() => props.navigation.navigate('Dashboard')}
          label={({size, color}) => (
            <Text style={{fontSize: size, color}}>Dashboard</Text>
          )}
          icon={({color}) => (
            <MaterialCommunityIcons
              name="view-dashboard"
              size={15}
              style={{color}}
            />
          )}
        />
        <DrawerItem
          onPress={() => props.navigation.navigate('help')}
          label={({size, color}) => (
            <Text style={{fontSize: size, color}}>Help</Text>
          )}
          icon={({color}) => (
            <MaterialCommunityIcons
              name="help-circle-outline"
              size={15}
              style={{color}}
            />
          )}
        />
      </DrawerContentScrollView>
      <DrawerItem
        onPress={logout}
        label={({size}) => <Text style={{fontSize: size}}>Sign Out</Text>}
        icon={({color}) => <Icon name="sign-out" size={15} style={{color}} />}
      />
    </ImageBackground>
  );
};

export default ProfileDrawerContent;

const styles = StyleSheet.create({
  contaierDrawer: {
    flex: 1,
    // backgroundColor: 'salmon',
    overflow: 'hidden',
  },
  profileWrap: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderBottomWidth: 1,
    borderBottomColor: '#88898B',
    padding: 10,
    // backgroundColor: '#FFEE00',
  },
  profileImg: {
    width: 60,
    height: 60,
    borderWidth: 5,
    borderColor: '#fff',
    borderRadius: 100,
    marginRight: 10,
  },
  profileTextOne: {
    color: '#2D4B94',
    fontSize: 20,
    fontWeight: 'bold',
  },
  profileTextTwo: {
    color: '#88898B',
    fontSize: 12,
    fontStyle: 'italic',
  },
  profileLink: {
    marginVertical: 10,
    // backgroundColor: 'blue',
  },
  profileItemLink: {
    display: 'flex',
    flexDirection: 'row',
    paddingVertical: 5,
    paddingHorizontal: 5,
    marginBottom: 4,
    borderRadius: 5,
  },
  profileIconLink: {
    alignSelf: 'center',
    fontSize: 20,
    marginRight: 8,
  },
  profileTextLink: {
    fontSize: 20,
  },
  profileItemLinkActive: {
    display: 'flex',
    flexDirection: 'row',
    paddingVertical: 5,
    paddingHorizontal: 5,
    marginBottom: 4,
    borderRadius: 5,
    backgroundColor: '#F9A826',
  },
  profileIconLinkActive: {
    alignSelf: 'center',
    fontSize: 20,
    marginRight: 8,
    color: '#fff',
  },
  profileTextLinkActive: {
    fontSize: 20,
    color: '#fff',
  },
});
