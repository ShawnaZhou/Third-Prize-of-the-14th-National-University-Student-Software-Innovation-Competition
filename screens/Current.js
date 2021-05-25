/* eslint-disable react-native/no-inline-styles */ /* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {SafeAreaView, ScrollView, RefreshControl,View, TouchableOpacity, ToastAndroid} from 'react-native';
import {Card, Paragraph, Title, Subheading, Caption, Button} from 'react-native-paper';
import Fab from '../components/Fab';
import CurrentGasChart from '../components/CurrentGasChart';
import CurrentElectrictyChart from '../components/CurrentElectrictyChart';
import CurrentWaterChart from '../components/CurrentWaterChart';
import CurrentGeneralChart from '../components/CurrentGeneralChart';
import Slider from '@react-native-community/slider';


const Current = () => {
  const [initial, setInitial] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [buildId, setBuildId] = useState(801);
  const [type, setType] = useState(0);
  const [date, setDate] = useState(new Date());
  const [refreshDate, setRefreshDate] = useState(new Date());
  const [waterData, setWaterData] = useState(0);
  const [gasData, setGasData] = useState(0);
  const [electricData, setElectricData] = useState(0);

  const getChildrenData = e => {
        setType(Number(e));
        setTimeout(function(){
            setInitial(true);
            getData();
        },500);
  };

  useEffect(() => {
    if (initial) {
      getData();
    }
  });
  useEffect(() => {
      let clock = setInterval(()=>{
          setDate(new Date());
      },1000);
      return () => {
          clearInterval(clock);
      };
    });

  const changeData = e => {
    if (buildId === 0 && !e) {
      ToastAndroid.show('已经是最小值了！', ToastAndroid.SHORT);
      return;
    }
    if (buildId === 1001 && e) {
      ToastAndroid.show('已经是最大值了！', ToastAndroid.SHORT);
      return;
    }
    e === true ? setBuildId(prev => prev + 1) : setBuildId(prev => prev - 1);
  };
  const getData = () => {
    setInitial(false);
    setDate(new Date());
    date.setFullYear(2016);
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    console.log(date);
    refreshDate.setMinutes(0);
    refreshDate.setSeconds(0);
    setRefreshDate(refreshDate);
    console.log('refreshDate:',refreshDate);
    const trueDate = Date.parse(date);
    console.log('trueDate: ', trueDate);
    fetch(
      'http://122.9.138.186:10332/history?' +
        'building_id=' +
        buildId +
        '&meter=1' +
        '&from=' +
        trueDate +
        '&to=' +
        trueDate,
    )
      .then(res => {
        if (res.status === 200) {
          return res.json();
        } else {
          throw new Error('Something wrong happend...');
        }
      })
      .then(json => {
        console.log('UnformateWaterJson: ', json);
        setWaterData(json[0].meter_reading);
        console.log(waterData);
      })
      .catch(error => {});
    fetch(
      'http://122.9.138.186:10332/history?' +
        'building_id=' +
        buildId +
        '&meter=0' +
        '&from=' +
        trueDate +
        '&to=' +
        trueDate,
    )
      .then(res => {
        if (res.status === 200) {
          return res.json();
        } else {
          throw new Error('Something wrong happend...');
        }
      })
      .then(json => {
        console.log('UnformateElectricJson: ', json);
        setElectricData(json[0].meter_reading);
        console.log(electricData);
      })
      .catch(error => {});
    fetch(
      'http://122.9.138.186:10332/history?' +
        'building_id=' +
        buildId +
        '&meter=2' +
        '&from=' +
        trueDate +
        '&to=' +
        trueDate,
    )
      .then(res => {
        if (res.status === 200) {
          return res.json();
        } else {
          throw new Error('Something wrong happend...');
        }
      })
      .then(json => {
        console.log('UnformateGasJson: ', json);
        setGasData(json[0].meter_reading);
        console.log(gasData);
      })
      .catch(error => {});
      setRefreshing(false);
  };
  const pushData = () => {
    let data = {waterData, electricData, gasData};
    return data;
  };
  const onRefresh = () => {
    setRefreshing(true);
    getData();
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <Fab getChildrenData={getChildrenData} />
      <Card>
        <Card.Content style={{flexDirection:'row'}}>
        <View style={{width:'50%'}}>
          <Title>Current</Title>
          <Paragraph>Observe the data immediately...</Paragraph>
          </View>
          <View style={{width:'50%', flexDirection:'column'}}>
          <View
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
                marginTop: '5%',
              }}>
              <TouchableOpacity style={{flex:1}}>
                <Subheading
                  style={{
                    width: 30,
                    backgroundColor: '#25747b',
                    borderRadius: 4,
                    color: '#fff',
                    fontWeight: 'bold',
                    textAlign: 'center',
                    marginRight: '2%',
                  }}
                  onPress={() => changeData(false)}>
                  -
                </Subheading>
              </TouchableOpacity>
              <Paragraph>Building ID: {Math.round(buildId)}</Paragraph>
              <TouchableOpacity style={{flex:1}}>
                <Subheading
                  style={{
                    width: 30,
                    backgroundColor: '#25747b',
                    borderRadius: 4,
                    color: '#fff',
                    fontWeight: 'bold',
                    textAlign: 'center',
                    marginLeft: '4%',
                  }}
                  onPress={() => changeData(true)}>
                  +
                </Subheading>
              </TouchableOpacity>
            </View>
            <Slider
              style={{width: 200, height: 40,marginLeft:-20}}
              minimumValue={0}
              maximumValue={1001}
              value={buildId}
              onValueChange={value => setBuildId(value)}
              onSlidingComplete={value => setBuildId(Math.round(value))}
              minimumTrackTintColor="#42bd4a"
              maximumTrackTintColor="#2fabb6"
              thumbTintColor="#000"
            />
            <Button width={135}
              icon="cat"
              mode="contained"
            onPress={getData}>
                confirm
            </Button>
          </View>
        </Card.Content>
      </Card>
      <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      style={{flex: 1}}>
        <Card style={{marginTop: 10, width: '100%', height: 500}}>
          <Card.Content style={{width: '100%', height: '100%'}}>
            {type === 0 && (
              <>
                <Title>Water</Title>
                <Caption>{date.toString().substr(0,24)}</Caption>
                <Caption>Last refresh: {refreshDate.toString().substr(0,19)}00:00</Caption>
                <CurrentWaterChart pushData={pushData} />
              </>
            )}
            {type === 1 && (
              <>
                <Title>Gas</Title>
                <Caption>{date.toString().substr(0,24)}</Caption>
                <Caption>Last refresh: {refreshDate.toString().substr(0,19)}00:00</Caption>
                <CurrentGasChart pushData={pushData} />
              </>
            )}
            {type === 2 && (
              <>
                <Title>Electricty</Title>
                <Caption>{date.toString().substr(0,24)}</Caption>
                <Caption>Last refresh: {refreshDate.toString().substr(0,19)}00:00</Caption>
                <CurrentElectrictyChart pushData={pushData} />
              </>
            )}
          </Card.Content>
        </Card>
        <Card style={{marginTop: 10}}>
          <Card.Content style={{height: 500}}>
            <Title>In General</Title>
            <CurrentGeneralChart pushData={pushData} />
          </Card.Content>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Current;
