/* eslint-disable react-native/no-inline-styles */ /* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {StyleSheet, SafeAreaView} from 'react-native';
import Model from '../components/Model';

export default class ArchitectureModel extends Component {
  render() {
    return (
      <SafeAreaView style={styles.chartContainer}>
        <Model />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  chartContainer: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
});
