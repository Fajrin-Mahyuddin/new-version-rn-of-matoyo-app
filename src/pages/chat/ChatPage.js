import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  TextInput,
} from 'react-native';
import MainBackground from '../../components/body/MainBackground';
import backgroundImg from '../../images/backgroundImg.png';
import default_img from '../../images/default.png';
import Header from '../../components/headers/Header';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default class ChatPage extends Component {
  render() {
    const {navigation} = this.props;
    return (
      <MainBackground source={backgroundImg}>
        <Header
          ShowBackBtn={true}
          ShowDrawerBtn={true}
          ShowTextHeader={true}
          TextHeader="Chat Room"
          navigation={navigation}
        />
        <View style={styles.headerChat}>
          <Image style={styles.headerImg} source={default_img} />
          <View>
            <Text style={{fontSize: 17, color: '#3f3d56'}}>To Matoyo</Text>
            <Text style={{fontSize: 11, color: '#3f3d56', marginTop: -5}}>
              Owner
            </Text>
          </View>
        </View>
        <ScrollView style={styles.ScrollStyle}>
          <View style={styles.containerChat}>
            <View style={styles.fromBodyChat}>
              <Text style={styles.textChat}>Apa kabar</Text>
            </View>
            <View style={styles.toBodyChat}>
              <Text style={styles.textChat}>Kabar Baik</Text>
            </View>
            <View style={styles.toBodyChat}>
              <Text style={styles.textChat}>
                In the previous sections, we defined the actions that represent
                the facts about “what happened” and the reducers that update the
                state according to those actions.
              </Text>
            </View>
            <View style={styles.fromBodyChat}>
              <Text style={styles.textChat}>
                In the previous sections, we defined the actions that represent
                the facts about.
              </Text>
            </View>
            <View style={styles.fromBodyChat}>
              <Text style={styles.textChat}>
                In the previous sections, we defined the actions that represent
                the facts about.
              </Text>
            </View>
            <View style={styles.fromBodyChat}>
              <Text style={styles.textChat}>ok.</Text>
            </View>
          </View>
        </ScrollView>
        <View style={styles.inputWrapper}>
          <KeyboardAvoidingView behavior="padding">
            <View style={styles.inputGroup}>
              <TextInput
                style={styles.inputChat}
                placeholder="Tulis pesan"
                name="chat"
              />

              <Icon style={styles.iconChat} name="send" size={30} />
            </View>
            <View style={{height: 10}} />
          </KeyboardAvoidingView>
        </View>
      </MainBackground>
    );
  }
}

const styles = StyleSheet.create({
  headerChat: {
    backgroundColor: '#fff',
    marginHorizontal: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 6,
    borderRadius: 10,
  },
  headerImg: {
    width: 50,
    height: 50,
    marginRight: 10,
    marginLeft: 4,
  },
  ScrollStyle: {
    marginTop: 10,
  },
  containerChat: {
    margin: 10,
    display: 'flex',
    flexDirection: 'column',
  },
  fromBodyChat: {
    backgroundColor: '#FFFBC6',
    alignSelf: 'flex-start',
    paddingVertical: 3,
    paddingHorizontal: 7,
    borderRadius: 5,
    marginVertical: 3,
  },
  toBodyChat: {
    backgroundColor: '#fff',
    alignSelf: 'flex-end',
    paddingVertical: 3,
    paddingHorizontal: 7,
    borderRadius: 5,
    marginVertical: 3,
  },
  textChat: {
    fontSize: 15,
    color: '#3f3d56',
    textAlign: 'justify',
  },
  inputWrapper: {
    margin: 10,
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  inputChat: {
    width: '88%',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 15,
    flexWrap: 'wrap',
  },
  iconChat: {
    width: '10%',
    textAlign: 'center',
    padding: 2,
    paddingVertical: 4,
    borderRadius: 5,
    color: '#3f3d56',
  },
});
