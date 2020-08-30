import React from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';
import {useSelector} from 'react-redux';

const ProfileCard = (props) => {
  const data = useSelector((state) => state.LoginReducer);
  return (
    <View style={styles.headerProfile}>
      <Image style={styles.headerProfileImg} source={props.source} />
      <Text style={styles.headerProfileTextOne}>
        {data.user.username || ''}
      </Text>
      <Text style={styles.headerProfileTextTwo}>
        {data.user.outlet && data.user.outlet.nama}
      </Text>
      <Text style={styles.headerProfileTextThree}>
        {data.user.outlet && data.user.outlet.alamat}
      </Text>
    </View>
  );
};

export default ProfileCard;

const styles = StyleSheet.create({
  headerProfile: {
    marginVertical: '4%',
    alignItems: 'center',
  },
  headerProfileImg: {
    width: 80,
    height: 80,
    borderRadius: 100,
    resizeMode: 'stretch',
  },
  headerProfileTextOne: {
    color: '#3d3f56',
    fontSize: 25,
    // fontWeight: 'bold',
    fontFamily: 'Poppins-SemiBold',
  },
  headerProfileTextTwo: {
    fontSize: 15,
    fontFamily: 'Poppins-Regular',
  },
  headerProfileTextThree: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
  },
});
