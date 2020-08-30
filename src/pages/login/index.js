import React, {Component} from 'react';
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  SafeAreaView,
  KeyboardAvoidingViewBase,
  Image,
  ScrollView,
  RefreshControl,
} from 'react-native';
import MainBackground from '../../components/body/MainBackground';
import backgroundImg from '../../images/backgroundImg.png';
import default_logo from '../../images/current_logo_mini_login.png';
import TextTitle from '../../components/body/TextTitle';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Feather from 'react-native-vector-icons/Feather';

import {connect} from 'react-redux';
import {login_post} from '../../redux/login/LoginAction';
import AsyncStorage from '@react-native-community/async-storage';
import {getReset} from '../../redux/general/GeneralAction';
import {screenWidth} from '../../config/sizeConfig';

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      refresh: false,
    };
  }

  async componentDidMount() {
    await AsyncStorage.clear();
    await AsyncStorage.removeItem('root');
    this.props.getReset();
  }

  handleSubmit = async () => {
    const {username, password} = this.state;
    console.log(username);
    await this.props.login_post({username, password});
  };

  handleReset = () => {
    this.setState({username: '', password: ''});
  };

  render() {
    const {navigation, route} = this.props;
    const {username, password, refresh} = this.state;
    const {error, msg} = this.props.GeneralReducer;

    return (
      <MainBackground
        source={backgroundImg}
        navigation={navigation}
        route={route}>
        <ScrollView
          contentContainerStyle={styles.container}
          refreshControl={
            <RefreshControl
              refreshing={refresh}
              onRefresh={() => this.props.navigation.push(route.name)}
            />
          }>
          <KeyboardAvoidingView
            style={{flex: 1, justifyContent: 'flex-end'}}
            behavior="padding">
            <Image style={styles.logo} source={default_logo} />
            {error ? (
              <Text style={styles.textError}>{msg}</Text>
            ) : (
              <TextTitle>LOGIN</TextTitle>
            )}
            <TextInput
              placeholder="Username"
              style={
                error
                  ? {...styles.inputForm, borderColor: 'red', borderWidth: 2}
                  : styles.inputForm
              }
              name="username"
              spellCheck={false}
              autoCorrect={false}
              returnKeyType="next"
              onSubmitEditing={() => {
                this.secondTextInput.focus();
              }}
              blurOnSubmit={false}
              textAlign="center"
              defaultValue={username}
              onChangeText={(username) => this.setState({username})}
            />
            <TextInput
              ref={(input) => {
                this.secondTextInput = input;
              }}
              textAlign="center"
              secureTextEntry={true}
              placeholder="Password"
              style={
                error
                  ? {...styles.inputForm, borderColor: 'red', borderWidth: 2}
                  : styles.inputForm
              }
              defaultValue={password}
              name="password"
              onChangeText={(password) => this.setState({password})}
              blurOnSubmit={true}
            />
          </KeyboardAvoidingView>

          <TouchableOpacity style={styles.loginBtn} onPress={this.handleSubmit}>
            <Text style={styles.loginText}>
              <Feather name="log-in" size={16} /> Masuk
            </Text>
          </TouchableOpacity>
          <View style={{height: 20}} />
        </ScrollView>
      </MainBackground>
    );
  }
}

const mapStateToProps = ({LoginReducer, GeneralReducer}) => ({
  LoginReducer,
  GeneralReducer,
});

const mapDispatchToProps = (dispatch) => ({
  login_post: (data) => dispatch(login_post(data)),
  getReset: (data) => dispatch(getReset()),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);

const styles = StyleSheet.create({
  container: {
    height: screenWidth.height,
    display: 'flex',
    marginHorizontal: 10,
    justifyContent: 'flex-end',
  },
  logo: {
    alignSelf: 'center',
    marginBottom: 20,
    width: 130,
    height: 130,
    borderRadius: 500,
    resizeMode: 'contain',
  },
  textError: {
    alignSelf: 'center',
    backgroundColor: 'red',
    paddingHorizontal: 5,
    marginBottom: 3,
    fontSize: 12,
    color: '#fff',
    borderRadius: 10,
  },
  inputForm: {
    // marginHorizontal: 10,
    backgroundColor: '#fff',
    marginBottom: 10,
    borderRadius: 9,
    paddingHorizontal: 25,
    paddingVertical: 10,
    color: '#3f3d57',
  },
  loginBtn: {
    backgroundColor: '#F9A825',
    padding: 10,
    alignItems: 'center',
    borderRadius: 9,
  },
  loginText: {
    color: '#fff',
    fontSize: 15,
    fontFamily: 'Poppins-SemiBold',
  },
});
