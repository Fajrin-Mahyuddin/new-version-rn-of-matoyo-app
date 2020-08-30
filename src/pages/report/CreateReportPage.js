import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';
import second_bg from '../../images/second_bg.png';
import Header from '../../components/headers/Header';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Footers from '../../components/footers/Footer';
import MainBackground from '../../components/body/MainBackground';
import Content from '../../components/body/Content';
import TextTitle from '../../components/body/TextTitle';
import {postRequest} from '../../config/AxiosMethod';
import {useDispatch, useSelector} from 'react-redux';
import {set_error, setLoading} from '../../redux/general/GeneralAction';

const CreateReportPage = (props) => {
  const [laporan, setLaporan] = useState(null);
  const [ket, setKet] = useState('');
  const dispatch = useDispatch();
  const state = useSelector((state) => state.GeneralReducer);

  const sendLaporan = () => {
    dispatch(setLoading(true));
    postRequest(`daftar-laporan/buat`, {laporan, ket})
      .then((res) => {
        console.log('res', res);
        dispatch(setLoading(false));
        props.navigation.navigate('historyPage');
      })
      .catch((err) => {
        console.log('ERROR REPORT PAGE', err.request);
        console.log('ERROR REPORT PAGE', err.response);
        dispatch(set_error({error: true, msg: 'Gagal !'}));
        dispatch(setLoading(false));
      });
  };
  console.log('state', state);
  return (
    <MainBackground source={second_bg}>
      <Header
        welcomeText={false}
        ShowDrawerBtn={false}
        ShowSubHeader={true}
        ShowBackBtn={true}
        ShowTextHeader={false}
        ShowBagBtn={false}
        ShowProfile={false}
        ShowFilterBtn={false}
        navigation={props.navigation}
      />
      <Content>
        <View style={styles.contentWrapper}>
          <TextTitle>
            {state.error ? `${state.msg}` : 'Buat Laporan Hari Ini'}{' '}
          </TextTitle>
          <KeyboardAvoidingView style={{marginTop: 10}}>
            <Text style={{marginBottom: 5}}>Total (Rp) - *hanya angka</Text>
            <TextInput
              placeholder="Total Jumlah Pendapatan Hari ini"
              style={styles.input}
              keyboardType="numeric"
              onChangeText={(e) => setLaporan(e)}
            />
            <Text style={{marginBottom: 5}}>Keterangan</Text>

            <TextInput
              placeholder="Keterangan"
              style={styles.input}
              onChangeText={(e) => setKet(e)}
            />
            <TouchableOpacity style={styles.submitBtn} onPress={sendLaporan}>
              <MaterialIcons
                name="send"
                size={17}
                style={{
                  alignSelf: 'center',
                  paddingVertical: 10,
                  marginRight: 5,
                  color: '#fff',
                }}
              />
              <Text style={styles.submitText}>Kirim</Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </View>
      </Content>
      <Footers />
    </MainBackground>
  );
};

const styles = StyleSheet.create({
  contentWrapper: {
    marginHorizontal: 10,
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  submitBtn: {
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    display: 'flex',
    backgroundColor: '#F9A825',
    width: 160,
    borderRadius: 20,
  },
  submitText: {
    alignSelf: 'center',
    fontSize: 17,
    paddingVertical: 7,
    color: '#fff',
    // alignSelf: 'center',
  },
});

export default CreateReportPage;
