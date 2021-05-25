/* eslint-disable react-native/no-inline-styles */ /* eslint-disable prettier/prettier */
import React,{useState,useEffect} from 'react';
import {SafeAreaView,ScrollView,TouchableOpacity} from 'react-native';
import {Card, Title, Paragraph, List} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
// import ArchitectureModel from '../components/ArchitectureModel';
import AsyncStorage from '@react-native-community/async-storage';
const Setting = () => {
    const navigation = useNavigation();
    const [initial, setInitial] = useState(true);
    const [headUrl, setheadUrl] = useState('https://images.unsplash.com/photo-1621267705600-166c740de9b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80');
    const [nickName, setNickName] = useState('');
    useEffect(() => {
      if (initial){
        initialState();
        getData();
      }
    });
    const moveToPersonal = () =>{
      navigation.navigate('Personal');
    };
    const Logout = () =>{
      clearUserData();
        navigation.navigate('Login');
    };
    const clearUserData = async () => {
      try {
        await AsyncStorage.setItem('@storage_Key', null);
      } catch (e) {
        // error reading value
      }
    };
    const moveToNotice = () =>{
        navigation.navigate('Notice');
    };
    const moveToServices = () =>{
      navigation.navigate('Services');
    };
    const initialState = () =>{
        setInitial(false);
        setheadUrl('https://images.unsplash.com/photo-1621267705600-166c740de9b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80');
    };
    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem('@storage_Key');
        if (value !== null) {
          // setheadUrl(JSON.parse(value).pro.head_url);
          setNickName(JSON.parse(value).user.name);
        }
      } catch (e) {
        // error reading value
      }
    };

  return (
    <SafeAreaView style={{flex: 1}}>
      {/* <ArchitectureModel/> */}
      <Card>
        <Card.Cover source={{uri:headUrl}} />
        <Card.Content>
          <Title>Welcome ! {nickName}</Title>
          <Paragraph>Have a good day !</Paragraph>
        </Card.Content>
      </Card>
      <ScrollView style={{flex:1}}>
      <Card style={{marginTop:'5%'}}>
        <TouchableOpacity>
          <List.Item
            title="Personal Information"
            description="Edit your personal information"
            onPress={moveToPersonal}
            style={{borderBottomWidth:1,borderColor:'#f5f5f5'}}
            left={props => <List.Icon {...props} icon="account-box-multiple" />}
          />
          </TouchableOpacity>
          <TouchableOpacity>
          <List.Item
            title="Notice"
            description="Messages we sent to you"
            onPress={moveToNotice}
            style={{borderBottomWidth:1,borderColor:'#f5f5f5'}}
            left={props => <List.Icon {...props} icon="bell-ring-outline" />}
          />
          </TouchableOpacity>
          <TouchableOpacity>
          <List.Item
            title="Customer service"
            description="Help you solve your problems"
            onPress={moveToServices}
            style={{borderBottomWidth:1,borderColor:'#f5f5f5'}}
            left={props => <List.Icon {...props} icon="dog" />}
          />
           </TouchableOpacity>
           <TouchableOpacity>
          <List.Item
            title="Lorem"
            description="Lorem ipsum dolor sit amet"
            style={{borderBottomWidth:1,borderColor:'#f5f5f5'}}
            left={props => <List.Icon {...props} icon="cat" />}
          />
          </TouchableOpacity>
          <TouchableOpacity>
          <List.Item
            title="Sed ut"
            description="Sed ut perspiciatis unde "
            style={{borderBottomWidth:1,borderColor:'#f5f5f5'}}
            left={props => <List.Icon {...props} icon="duck" />}
          />
          </TouchableOpacity>
          <TouchableOpacity>
          <List.Item
            title="Logout"
            description="logout current account"
            style={{borderBottomWidth:1,borderColor:'#f5f5f5'}}
            onPress={Logout}
            left={props => <List.Icon {...props} icon="logout" />}
          />
          </TouchableOpacity>
      </Card>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Setting;
