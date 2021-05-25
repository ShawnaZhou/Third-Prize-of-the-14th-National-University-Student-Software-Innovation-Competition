/* eslint-disable react-native/no-inline-styles *//* eslint-disable prettier/prettier */
import React from 'react';
import { SafeAreaView } from 'react-native';
import { Paragraph } from 'react-native-paper';

const Notice = () => {
    return (
        <SafeAreaView style={{flex:1,justifyContent:'center',alignItems:'center'}}>
            <Paragraph style={{color:'gray'}}>Seemed nothing happend recently...</Paragraph>
        </SafeAreaView>
    );
};

export default Notice;
