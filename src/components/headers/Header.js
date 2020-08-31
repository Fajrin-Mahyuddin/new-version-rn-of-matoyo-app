import React, {Fragment, useState, useEffect} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import Logo from '../../images/default.png';
import Bag from '../../images/icon/bag.svg';
import {TouchableOpacity} from 'react-native-gesture-handler';
import SubHeader from './subHeader';
import ProfileCard from '../cards/ProfileCard';
import {useSelector} from 'react-redux';

const Header = (props) => {
  const GlobalState = useSelector((state) => state);

  const [buttonActive, setButtonActive] = useState(0);
  const setActiveFilterBtn = () => {
    setButtonActive(0);
  };
  useEffect(() => {
    props.ShowFilterBtn && props.handleSetButtonActive(setActiveFilterBtn);
  }, []);

  const {
    welcomeText,
    ShowDrawerBtn,
    ShowSubHeader,
    ShowBackBtn,
    ShowTextHeader,
    ShowBagBtn,
    ShowProfile,
    ShowFilterBtn,
    ShowEditBtn,
    toggleModal,
  } = props;
  return (
    <View style={styles.header}>
      <View style={styles.headerTop}>
        <View style={styles.headerText}>
          {welcomeText && (
            <Fragment>
              <Text style={styles.headerTextOne}>Selamat Datang</Text>
              <Text style={styles.headerTextTwo}>Dashboard</Text>
            </Fragment>
          )}
          {ShowBackBtn && (
            <Entypo
              style={styles.headerIcon}
              name="chevron-thin-left"
              size={25}
              color="#3F3D56"
              onPress={() => props.navigation.goBack()}
            />
          )}
        </View>
        {ShowTextHeader && (
          <Text
            style={{
              fontSize: 20,
              alignSelf: 'center',
              fontFamily: 'Poppins-Regular',
              marginRight: -80,
            }}>
            {props.TextHeader}
          </Text>
        )}
        <View></View>
        {ShowDrawerBtn ? (
          <Entypo
            onPress={() => props.navigation.toggleDrawer()}
            style={styles.headerIcon}
            name="dots-three-vertical"
            size={20}
          />
        ) : (
          <Text></Text>
        )}
        {ShowEditBtn && (
          <Feather
            onPress={toggleModal}
            style={styles.headerIcon}
            name="edit"
            size={20}
          />
        )}
        {ShowBagBtn && (
          <TouchableOpacity
            style={{padding: 4}}
            onPress={() => props.navigation.navigate('viewBasketPage')}>
            <Bag />
            {GlobalState.OrderReducer.menu.length !== 0 && (
              <Text style={styles.badgeIconBag}>
                {GlobalState.OrderReducer.menu.length}
              </Text>
            )}
          </TouchableOpacity>
        )}
      </View>
      {ShowProfile && <ProfileCard source={Logo} />}
      {ShowFilterBtn && (
        <View style={styles.filterWrapper}>
          <TouchableOpacity
            style={
              buttonActive === 0
                ? {...styles.filterLink, ...styles.filterLinkActive}
                : {...styles.filterLink}
            }
            onPress={() => {
              setButtonActive(0);
              props.handleFilter(0);
            }}>
            <Text style={styles.filterLinkText}>Semua</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={
              buttonActive === 1
                ? {...styles.filterLink, ...styles.filterLinkActive}
                : {...styles.filterLink}
            }
            onPress={() => {
              setButtonActive(1);
              props.handleFilter(1);
            }}>
            <Text style={styles.filterLinkText}>Makanan</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={
              buttonActive === 2
                ? {...styles.filterLink, ...styles.filterLinkActive}
                : {...styles.filterLink}
            }
            onPress={() => {
              setButtonActive(2);
              props.handleFilter(2);
            }}>
            <Text style={styles.filterLinkText}>Minuman</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={
              buttonActive === 3
                ? {...styles.filterLink, ...styles.filterLinkActive}
                : {...styles.filterLink}
            }
            onPress={() => {
              setButtonActive(3);
              props.handleFilter(3);
              // props.handleSetButtonActive();
            }}>
            <Text style={styles.filterLinkText}>Snack</Text>
          </TouchableOpacity>
        </View>
      )}

      {ShowSubHeader && props.navigation && (
        <SubHeader navigation={props.navigation} />
      )}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    margin: 15,
  },
  headerTop: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  headerIcon: {
    color: '#3F3D56',
  },
  badgeIconBag: {
    position: 'absolute',
    backgroundColor: '#F92626',
    bottom: 0,
    right: 0,
    paddingHorizontal: 4,
    color: '#fff',
    borderRadius: 100,
    fontSize: 13,
  },
  headerText: {
    justifyContent: 'center',
  },
  headerTextOne: {
    color: '#3F3D56',
    fontSize: 25,
    marginTop: -8,
    fontWeight: '600',
    fontFamily: 'Poppins-Regular',
  },
  headerTextTwo: {
    color: '#88898B',
    fontSize: 13,
    fontFamily: 'Poppins-Regular',
  },

  filterWrapper: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 15,
  },
  filterLink: {
    backgroundColor: 'rgba(255,255,255,0.6)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 100,
    marginHorizontal: 5,
  },
  filterLinkActive: {
    backgroundColor: '#F9A826',
  },
  filterLinkText: {
    fontSize: 16,
    color: '#3F3D56',
  },
});
