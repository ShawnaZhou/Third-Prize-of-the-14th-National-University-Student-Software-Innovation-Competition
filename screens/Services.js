/* eslint-disable react-native/no-inline-styles *//* eslint-disable prettier/prettier */
import React from 'react';
import { Linking, SafeAreaView } from 'react-native';
import { Caption } from 'react-native-paper';

const Services = () => {
    const linkToPhone = () => {
        Linking.openURL('tel:+8613115130221');
    };
    return (
        <SafeAreaView style={{flex:1,justifyContent:'center',alignItems:'center'}}>
            <Caption style={{margin:20}} onPress={linkToPhone}>We haven't provide this Part yet, If you have any questions, You could call us by <Caption style={{color:'blue'}}> +86 13115130221</Caption> </Caption>
        </SafeAreaView>
    );
};

export default Services;
