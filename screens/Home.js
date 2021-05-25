/* eslint-disable react-native/no-inline-styles *//* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {SafeAreaView, View, ScrollView} from 'react-native';
import {Card, Title, Paragraph, Avatar, Dialog, Portal} from 'react-native-paper';
import Charts1 from '../components/Charts1';
import AsyncStorage from '@react-native-community/async-storage';

const Home = () => {
  const [initial, setInitial] = useState(true);
  const [text, setText] = useState('');
  const [visible, setVisible] = useState(false);
  const [nickName, setNickName] = useState('...');
  const [sex, setSex] = useState('man');

  useEffect(() => {
     if (initial) {
      InitialPage();
     }
  });
  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('@storage_Key');
      if (value !== null) {
        setSex(JSON.parse(value).pro.sex);
        setNickName(JSON.parse(value).user.name);
      }
    } catch (e) {
      // error reading value
    }
  };
  const InitialPage = () => {
    getData();
    let myDate = new Date().getHours();
    if (myDate >= 5 && myDate <= 10) {
      setText('morning');
    } else if (myDate >= 11 && myDate <= 17) {
      setText('afternoon');
    } else {
      setText('evening');
    }
    setInitial(false);
  };
  const tapIcon = () =>{
    setVisible(true);
  };

  const hideDialog = () => setVisible(false);
  return (
    <SafeAreaView style={{flex:1}}>
      <Portal>
      <Dialog visible={visible} onDismiss={hideDialog}>
        <Dialog.Title>This is Our LOGO</Dialog.Title>
        <Dialog.Content>
          <Paragraph>Left one is our Team LOGO
            Right one is our Project LOGO!</Paragraph>
        </Dialog.Content>
      </Dialog>
    </Portal>
      <Card>
        <Card.Content>
        <View style={{display:'flex',flexDirection:'row',alignContent:'center'}}>
          <View style={{width:'50%',display:'flex',flexDirection:'row'}}>
          <Title>Hi!</Title>
          <Avatar.Image
            size={44}
            style={{
              marginLeft: 10,
            }}
            source={sex === 'man' ? require('../assets/images/avatar-2.jpg') : require('../assets/images/avatar-1.jpg')}
          />
           <Title style={{marginLeft:20}}>{nickName}</Title>
          </View>
          <View pointerEvents="auto" onTouchStart={tapIcon} style={{width:'50%',display:'flex',flexDirection:'row-reverse'}} >
          <Avatar.Image
            size={44}
            style={{
              marginLeft: 10,
              backgroundColor:'#fff',
            }}
            source={require('../assets/images/logo.png')}
          />
          <Avatar.Image
            size={44}
            style={{
              marginLeft: 10,
              backgroundColor:'#fff',
            }}
            source={require('../assets/images/logo2.png')}
          />
          </View>

          </View>
          <Title>Good {text}!</Title>
          <Paragraph>Your Charts performed well</Paragraph>
        </Card.Content>
      </Card>
      <ScrollView style={{flex:1}}>
      <Card
      style={{
        marginTop:'2%',
        marginLeft:'2%',
        width:'96%',
        height:500,
      }}>
        <Card.Content>
          <Title>
            Last Week's Data Transition
          </Title>
          <Charts1/>
        </Card.Content>
      </Card>
      <Card style={{
        width:'96%',
        height:'100%',
        marginLeft:'2%',
        marginTop:'2%',
        marginBottom:'30%',
      }}>
        <Card.Content>
          <Title>Messages</Title>
          <Paragraph>Seemed nothing happend recently...</Paragraph>
        </Card.Content>
      </Card>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
