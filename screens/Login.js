/* eslint-disable react-native/no-inline-styles */ /* eslint-disable prettier/prettier */
import React, {useState, useRef} from 'react';
import {SafeAreaView, View, ToastAndroid, Animated} from 'react-native';
import {Card, Button, Title, TextInput, Switch} from 'react-native-paper';
import Video from 'react-native-video';
import video from '../assets/images/backVideo.mp4';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';

const Login = () => {
  const navigation = useNavigation();
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const position = useRef(new Animated.Value(500)).current;
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

  const clickLogin = () => {
    setLoading(true);
    if (userName && password) {
      let data = {
        username: userName,
        password: password,
      };
      fetch('http://120.78.188.52:7080/consumer-0.0.1-SNAPSHOT/login', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then(res => {
          setLoading(false);
          if (res.status === 200) {
            return res.json();
          } else {
            throw new Error(res.json());
          }
        })
        .then(json => {
          console.log('LoginResult: ',json);
          if (json.code === 0) {
            storeData(json);
          } else {
            ToastAndroid.show(JSON.stringify(json.msg), ToastAndroid.LONG);
          }
        })
        .catch(error => {
          setLoading(false);
          ToastAndroid.show('网络异常，请稍后再试！', ToastAndroid.LONG);
        });
    } else {
      ToastAndroid.show('请输入账号密码 !', ToastAndroid.SHORT);
      setLoading(false);
    }
  };
  const storeData = async res => {
    try {
      await AsyncStorage.setItem('@storage_Key', JSON.stringify(res));
      navigation.navigate('Home', {name: 'param 1'});
    } catch (e) {
    }
  };

  const readyToPlay = () => {
    setTimeout(function () {
      Animated.parallel([
        Animated.timing(position, {
          toValue: 50,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ]).start();
    }, 1500);
  };

  const clickRegister = () =>{
    setLoading(true);
    if (userName && password  && (password === confirmPassword)) {
      let data = {
        username: userName,
        password: password,
      };
      fetch('http://120.78.188.52:7080/consumer-0.0.1-SNAPSHOT/reg', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then(res => {
          setLoading(false);
          if (res.status === 200) {
            return res.json();
          } else {
            throw new Error(res.json());
          }
        })
        .then(json => {
          console.log('RegisterResult: ',json);
          if (json.code === 0) {
            setIsSwitchOn(false);
          } else {
            ToastAndroid.show(JSON.stringify(json.msg), ToastAndroid.LONG);
          }
        })
        .catch(error => {
          setLoading(false);
          ToastAndroid.show('网络异常，请稍后再试！', ToastAndroid.LONG);
        });
    } else if (password !== confirmPassword) {
      ToastAndroid.show('两次密码不一致 !', ToastAndroid.SHORT);
      setLoading(false);
    } else {
      ToastAndroid.show('请输入账号密码 !', ToastAndroid.SHORT);
      setLoading(false);
    }
  };
  return (
    <>
      <Video
        resizeMode="cover"
        repeat={true}
        onReadyForDisplay={readyToPlay}
        source={video}
        muted={true}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          height: '100%',
          width: '100%',
        }}
      />
      <SafeAreaView style={{backgroundColor: 'rgba(0,0,0,0.2)'}}>
        <View style={{height: '100%'}}>
          <View
            style={{
              position: 'relative',
              top: '30%',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
            <Title style={{color: '#fff'}}>Login</Title>
            <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />
            <Title style={{color: '#fff'}}>Register</Title>
          </View>
          <Animated.View
            style={{
              height: '50%',
              width: '80%',
              marginLeft: '10%',
              marginTop: '50%',
              justifyContent: 'center',
              backgroundColor: 'rgba(255,255,255,0)',
              opacity: fadeAnim,
              transform: [{translateY: position}],
            }}>
            <Card.Content>
              {!isSwitchOn && <Title style={{color: '#fff'}}>Login Now!</Title>}
              {isSwitchOn && (
                <Title style={{color: '#fff'}}>Register Now!</Title>
              )}
              <View
                style={{
                  marginTop: '15%',
                }}>
                <TextInput
                  style={{
                    height: 40,
                  }}
                  Icon="login"
                  mode="outlined"
                  label="User Name"
                  placeholder="User Name"
                  value={userName}
                  clearButtonMode="while-editing"
                  onChangeText={value => setUserName(value)}
                />
                <TextInput
                  style={{marginTop: '5%', height: 40}}
                  Icon="key"
                  mode="outlined"
                  placeholder="Password"
                  secureTextEntry={true}
                  clearButtonMode="while-editing"
                  label="Password"
                  value={password}
                  onChangeText={value => setPassword(value)}
                />
                {isSwitchOn && (
                <TextInput
                  style={{marginTop: '5%', height: 40}}
                  Icon="key"
                  mode="outlined"
                  placeholder="Confirm Your Password"
                  secureTextEntry={true}
                  clearButtonMode="while-editing"
                  label="Confirm Your Password"
                  value={confirmPassword}
                  onChangeText={value => setConfirmPassword(value)}
                />)}
              </View>
            </Card.Content>
            <Card.Actions style={{marginTop: '20%'}}>
              {!isSwitchOn && (
                <Button
                  style={{marginLeft: '5%'}}
                  icon="key"
                  loading={loading}
                  mode="contained"
                  onPress={clickLogin}>
                  Login
                </Button>
              )}
              {isSwitchOn && (
                <Button
                  style={{marginLeft: '5%'}}
                  icon="account"
                  mode="contained"
                  onPress={clickRegister}>
                  Sign Up
                </Button>
              )}
            </Card.Actions>
          </Animated.View>
        </View>
      </SafeAreaView>
    </>
  );
};

export default Login;
