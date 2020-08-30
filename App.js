import React, {Fragment} from 'react';
import {StatusBar} from 'react-native';
import Dashboard from './src/pages/dashboard/Dashboard';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';
import ProfilePage from './src/pages/profile/ProfilePage';
import {enableScreens} from 'react-native-screens';
import CreateOrderPage from './src/pages/orders/CreateOrderPage';
import ListMenuPage from './src/pages/orders/ListMenuPage';
import ViewBasketPage from './src/pages/orders/ViewBasketPage';
import ListOrderPage from './src/pages/orders/ListOrderPage';
import ProfileDrawerContent from './src/components/drawer/ProfileDrawerContent';
import Icon from 'react-native-vector-icons/FontAwesome';
import Help from './src/pages/help/Help';
import ReportPage from './src/pages/report/ReportPage';
import LoginPage from './src/pages/login';
import AbsensiPage from './src/pages/absensi/AbsensiPage';
import {Provider, useSelector} from 'react-redux';
import store from './src/redux/store';
import QrGenerated from './src/pages/absensi/QrGenerated';
import CreateReportPage from './src/pages/report/CreateReportPage';
import HistoryPage from './src/pages/report/HistoryPage';
import LoadingAnimation from './src/components/body/LoadingAnimation';
import {PersistGate} from 'redux-persist/integration/react';
import persistStore from 'redux-persist/es/persistStore';

// import 'react-native-gesture-handler';

enableScreens();
// console.disableYellowBox = true;
const HomeStack = createStackNavigator();
const AuthStack = createStackNavigator();
// const MenuStack = createStackNavigator();
const MainDrawer = createDrawerNavigator();
// const ProfileDrawer = createDrawerNavigator();
// const DetailDrawer = createDrawerNavigator();

const MainDrawerScreen = () => {
  return (
    <MainDrawer.Navigator
      initialRouteName="Dashboard"
      drawerContentOptions={{
        activeBackgroundColor: 'rgba(249, 168, 38, 0.2)',
        activeTintColor: '#2D4B94',
        inactiveTintColor: '#2D4B94',
        labelStyle: {
          // fontWeight: '600',
          left: 0,
          fontSize: 14,
          marginLeft: -10,
        },
      }}
      size={30}
      drawerContent={(props) => <ProfileDrawerContent {...props} />}>
      <MainDrawer.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          drawerLabel: 'Dashboard',
          drawerIcon: ({color}) => (
            <Icon name="dashboard" size={14} style={{color, width: 15}} />
          ),
        }}
      />
      <MainDrawer.Screen
        name="createOrderPage"
        options={{
          drawerLabel: 'Buat Pesanan',
          drawerIcon: ({color}) => (
            <Icon name="coffee" size={14} style={{color, width: 15}} />
          ),
        }}
        component={CreateOrderPage}
      />
      <MainDrawer.Screen
        name="reportPage"
        component={ReportPage}
        options={{
          drawerLabel: 'Profile',
          drawerIcon: ({color}) => (
            <Icon name="shopping-basket" size={14} style={{color, width: 15}} />
          ),
        }}
      />
      <MainDrawer.Screen
        name="profilePage"
        component={ProfilePage}
        options={{
          drawerLabel: 'Profile',
          drawerIcon: ({color}) => (
            <Icon name="shopping-basket" size={14} style={{color, width: 15}} />
          ),
        }}
      />
      {/* <MainDrawer.Screen
        name="listMenu"
        component={ListMenuPage}
        initialParams={{}}
        options={{
          drawerLabel: 'Daftar Menu',
          drawerIcon: ({color}) => (
            <Icon name="shopping-basket" size={14} style={{color, width: 15}} />
          ),
        }}
      /> */}
      <MainDrawer.Screen
        name="historyPage"
        component={HistoryPage}
        options={{
          drawerLabel: 'Histor Laporan',
          drawerIcon: ({color}) => (
            <Icon name="shopping-basket" size={14} style={{color, width: 15}} />
          ),
        }}
      />
      <MainDrawer.Screen
        name="help"
        component={Help}
        options={{
          drawerLabel: 'Help',
          drawerIcon: ({color}) => (
            <Icon name="shopping-basket" size={14} style={{color, width: 15}} />
          ),
        }}
      />
    </MainDrawer.Navigator>
  );
};

const HomeNavigation = () => {
  return (
    <HomeStack.Navigator
      initialRouteName="Dashboard"
      screenOptions={{
        headerShown: false,
      }}>
      <HomeStack.Screen name="Dashboard" component={MainDrawerScreen} />
      {/* <HomeStack.Screen name="createOrderPage" component={MainDrawerScreen} /> */}
      <HomeStack.Screen name="viewBasketPage" component={ViewBasketPage} />
      <HomeStack.Screen name="listMenu" component={ListMenuPage} />
      <HomeStack.Screen name="listOrderPage" component={ListOrderPage} />
      <HomeStack.Screen name="profilePage" component={ProfilePage} />
      <HomeStack.Screen name="help" component={MainDrawerScreen} />
      <HomeStack.Screen name="qrgenerate" component={QrGenerated} />
      <HomeStack.Screen name="absen" component={AbsensiPage} />
      <HomeStack.Screen name="reportPage" component={MainDrawerScreen} />
      {/* <HomeStack.Screen name="historyPage" component={MainDrawerScreen} /> */}
      <HomeStack.Screen name="createReportPage" component={CreateReportPage} />
      {/* <HomeStack.Screen name="login" component={AuthNavigation} /> */}
    </HomeStack.Navigator>
  );
};

const AuthNavigation = () => {
  return (
    <AuthStack.Navigator
      initialRouteName="login"
      screenOptions={{
        headerShown: false,
      }}>
      <AuthStack.Screen name="login" component={LoginPage} />
      {/* <AuthStack.Screen name="Dashboard" component={HomeNavigation} /> */}
    </AuthStack.Navigator>
  );
};

const MainNavigation = () => {
  const data = useSelector((state) => state.LoginReducer);
  return (
    <Fragment>
      {data.isLogin ? <HomeNavigation /> : <AuthNavigation />}
    </Fragment>
  );
};

const persisStore = persistStore(store);

const App = () => {
  return (
    <Provider store={store}>
      {/* <PersistGate persistor={persisStore} loading={null}> */}
      <StatusBar hidden={true} />
      <LoadingAnimation />
      <NavigationContainer>
        <MainNavigation />
      </NavigationContainer>
      {/* </PersistGate> */}
    </Provider>
  );
};

export default App;
