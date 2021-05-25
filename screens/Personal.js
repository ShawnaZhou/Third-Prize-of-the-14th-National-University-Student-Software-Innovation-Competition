/* eslint-disable react-native/no-inline-styles */ /* eslint-disable prettier/prettier */
import React,{useState,useEffect} from 'react';
import {SafeAreaView} from 'react-native';
import {Card, List} from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';

const Personal = () => {
    const [createDate, setCreateDate] = useState(new Date().toString());
    const [username, setUsername] = useState('...');
    const [initial, setInitial] = useState(true);
    useEffect(() => {
        if (initial) {
         InitialPage();
        }
     });
     const getData = async () => {
        try {
          const value = await AsyncStorage.getItem('@storage_Key');
          if (value !== null) {

            setCreateDate(JSON.parse(value).pro.createDate);
            setUsername(JSON.parse(value).user.name);
          }
        } catch (e) {

          // error reading value
        }
      };
    const InitialPage = () => {
        setInitial(false);
        getData();
    };
  return (
    <SafeAreaView>
      <Card style={{marginTop: '2%'}}>
        <Card.Content>
          <List.Item
            title="Create Date"
            description={createDate}
            style={{borderBottomWidth:1,borderColor:'#f5f5f5'}}
            left={props => <List.Icon {...props} icon="cake" />}
          />
          <List.Item
            title="User name"
            description={username}
            style={{borderBottomWidth:1,borderColor:'#f5f5f5'}}
            left={props => <List.Icon {...props} icon="account" />}
          />
          <List.Item
            title="Lorem"
            description="Lorem description"
            style={{borderBottomWidth:1,borderColor:'#f5f5f5'}}
            left={props => <List.Icon {...props} icon="dog" />}
          />
        </Card.Content>
      </Card>
    </SafeAreaView>
  );
};

export default Personal;
