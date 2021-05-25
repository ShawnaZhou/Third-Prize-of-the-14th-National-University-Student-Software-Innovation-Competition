/* eslint-disable react-native/no-inline-styles */ /* eslint-disable prettier/prettier */
import React, {useState,useEffect} from 'react';
import {SafeAreaView, View, TouchableOpacity, ScrollView, ToastAndroid} from 'react-native';
import {
  Card,
  Paragraph,
  Title,
  Caption,
  Button,
  Subheading,
} from 'react-native-paper';

import FutureChart from '../components/FutureChart';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Slider from '@react-native-community/slider';
const Future = () => {
  const [initial, setInitial] = useState(true);
  const [loading, setLoading] = useState(false);
  const [waterData, setWaterData] = useState([]);
  const [gasData, setGasData] = useState([]);
  const [powerData, setPowerData] = useState([]);
  const [date, setDate] = useState(new Date(1483200000000));
  const [show, setShow] = useState(false);
  const [Value, setDateValue] = useState(new Date(1483200000000));
  const [firstTime, setFirstTime] = useState(
    new Date(1483200000000).toString(),
  );
  const [lastTime, setLastTime] = useState(new Date(1483718400000).toString());
  const [timeShow, setTimeShow] = useState(false);
  const [buildId, setBuildId] = useState(1); //0-104
  // 0:power 1:water 2:gas
  const [choosedInput, setChoosedInput] = useState(false);


  useEffect(() => {
    if (initial) {
      getData();
    }
  });

  const onChangeDate = (event, selectedDate) => {
    setShow(false);
    const currentDate = selectedDate || date;
    setDate(currentDate);
    if (selectedDate) {
      setTimeShow(true);
    }
  };

  const onChangeTime = (event, selectedTime) => {
    setTimeShow(false);
    const currentTime = selectedTime || date;
    let value = date;
    value.setHours(currentTime.getHours());
    value.setMinutes(currentTime.getMinutes());
    value.setSeconds(0);
    if (selectedTime) {
      if (choosedInput) {
        setFirstTime(value);
      } else {
        setLastTime(value);
      }
      setDateValue(value);
    }
  };

  const setStartTime = () => {
    setShow(true);
    setChoosedInput(true);
  };

  const setEndTime = () => {
    setShow(true);
    setChoosedInput(false);
  };

  const getData = () => {
    setInitial(false);
    setLoading(true);
    let firstDate = Date.parse(firstTime);
    let lastDate = Date.parse(lastTime);
    if (firstDate > lastDate){
      let i = firstDate;
      firstDate = lastDate;
      lastDate = i;
      setFirstTime(new Date(firstDate));
      setLastTime(new Date(lastDate));
    }
    fetch(
      'http://122.9.138.186:10332/predict?' +
        'building_id=' +
        buildId +
        '&meter=1' +
        '&from=' +
        firstDate +
        '&to=' +
        lastDate,
    ) //+ firstDate + lastDate
      .then(res => {
        setLoading(false);
        if (res.status === 200) {
          return res.json();
        } else {
          throw new Error('Something wrong happend...');
        }
      })
      .then(json => {
        console.log('waterData: ',json);
        waterDataFormatter(json);
      })
      .catch(error => {

      });
    fetch(
      'http://122.9.138.186:10332/predict?' +
        'building_id=' +
        buildId +
        '&meter=0' +
        '&from=' +
        firstDate +
        '&to=' +
        lastDate,
    ) //+ firstDate + lastDate
      .then(res => {
        setLoading(false);
        if (res.status === 200) {
          return res.json();
        } else {
          throw new Error('Something wrong happend...');
        }
      })
      .then(json => {
        gasDataFormatter(json);
        console.log('gasData: ', json);
      })
      .catch(error => {
      });
    fetch(
      'http://122.9.138.186:10332/predict?' +
        'building_id=' +
        buildId +
        '&meter=2' +
        '&from=' +
        firstDate +
        '&to=' +
        lastDate,
    ) //+ firstDate + lastDate
      .then(res => {
        setLoading(false);
        if (res.status === 200) {
          return res.json();
        } else {
          throw new Error('Something wrong happend...');
        }
      })
      .then(json => {
        powerDataFormatter(json);
        console.log('electricData: ',json);
      })
      .catch(error => {
      });
  };

  const waterDataFormatter = e => {
    let timeData = [];
    let valueData = [];
    for (let i = 0; i < e.length; i++) {
      timeData.push(new Date(e[i].timestamp).toString().substr(0, 24));
      valueData.push(e[i].meter_reading);
    }
    let data = [timeData, valueData];
    setWaterData(data);
  };
  const gasDataFormatter = e => {
    let timeData = [];
    let valueData = [];
    for (let i = 0; i < e.length; i++) {
      timeData.push(new Date(e[i].timestamp).toString().substr(0, 24));
      valueData.push(e[i].meter_reading);
    }
    let data = [timeData, valueData];
    setGasData(data);
  };
  const powerDataFormatter = e => {
    let timeData = [];
    let valueData = [];
    for (let i = 0; i < e.length; i++) {
      timeData.push(new Date(e[i].timestamp).toString().substr(0, 24));
      valueData.push(e[i].meter_reading);
    }
    let data = [timeData, valueData];
    setPowerData(data);
  };

  const pushData = () => {
    let data = {waterData, powerData, gasData};
    return data;
  };

  const changeData = e => {
    if (buildId === 0 && !e){
      ToastAndroid.show('已经是最小值了！', ToastAndroid.SHORT);
      return;
    }
    if (buildId === 101 && e){
      ToastAndroid.show('已经是最大值了！', ToastAndroid.SHORT);
      return;
    }
    e === true ? setBuildId(prev => prev + 1) : setBuildId(prev => prev - 1);
  };

  return (
    <SafeAreaView style={{height: '100%', width: '100%'}}>
      <Card>
        <Card.Content style={{flexDirection: 'row'}}>
          <View style={{width: '45%'}}>
            <Title>Future</Title>
            <Paragraph>Forecast the data transition in future...</Paragraph>
            <Button
              style={{marginLeft: '0%', marginTop: '15%', marginBottom: '5%'}}
              width={135}
              icon="cat"
              mode="contained"
              loading={loading}
              onPress={getData}>
              confirm
            </Button>
          </View>
          <View
            style={{
              width: '60%',
              justifyContent: 'center',
              alignContent: 'center',
            }}>
            <TouchableOpacity>
              <Caption
                onPress={setStartTime}
                style={{
                  backgroundColor: '#70f125',
                  height: 30,
                  borderRadius: 10,
                  textAlign: 'center',
                  alignContent: 'center',
                  justifyContent: 'center',
                  color: '#000',
                  paddingTop: 5,
                }}>
                <Icon name="calendar-month-outline" style={{marginRight: 50}} />{' '}
                {firstTime.toString()}
              </Caption>
            </TouchableOpacity>
            <Paragraph
              style={{
                justifyContent: 'center',
                alignContent: 'center',
                textAlign: 'center',
              }}>
              To
            </Paragraph>
            <TouchableOpacity>
              <Caption
                onPress={setEndTime}
                style={{
                  backgroundColor: '#70f125',
                  height: 30,
                  borderRadius: 10,
                  textAlign: 'center',
                  alignContent: 'center',
                  justifyContent: 'center',
                  color: '#000',
                  padding: 5,
                  width: '100%',
                }}>
                <Icon name="calendar-month-outline" style={{marginRight: 50}} />{' '}
                {lastTime.toString()}
              </Caption>
            </TouchableOpacity>
            <View
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
                marginTop: '5%',
              }}>
              <TouchableOpacity>
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
              <TouchableOpacity>
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
              style={{width: 200, height: 40}}
              minimumValue={0}
              maximumValue={100}
              value={buildId}
              onValueChange={value => setBuildId(value)}
              onSlidingComplete={value => setBuildId(Math.round(value))}
              minimumTrackTintColor="#42bd4a"
              maximumTrackTintColor="#2fabb6"
              thumbTintColor="#000"
            />
          </View>
        </Card.Content>
      </Card>
      <ScrollView style={{flex: 1}}>
        <Card style={{marginTop: 10, height: 600}}>
          <Card.Content>
            <FutureChart pushData={pushData} />
          </Card.Content>
        </Card>
      </ScrollView>
      {show && (
        <DateTimePicker
          value={Value}
          mode="date"
          is24Hour={true}
          display="calendar"
          onChange={onChangeDate}
        />
      )}
      {timeShow && (
        <DateTimePicker
          value={Value}
          mode="time"
          is24Hour={true}
          display="clock"
          onChange={onChangeTime}
        />
      )}
    </SafeAreaView>
  );
};

export default Future;
