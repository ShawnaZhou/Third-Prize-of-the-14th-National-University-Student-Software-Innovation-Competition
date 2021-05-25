/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import { ECharts } from 'react-native-echarts-wrapper';

export default class Charts1 extends Component {
    option = {
        tooltip: {
            trigger: 'axis',
        },
        legend: {
            data: ['Water', 'Electric', 'Gas'],
            top: 0,
        },
        grid: {
            left: '0%',
            right: '2%',
            bottom: '1%',
            containLabel: true,
        },
        toolbox: {
            feature: {
                magicType: {type: ['line', 'bar']    },
            },
            top: 20,
            right:0,
        },
        xAxis: {
            type: 'category',
            boundaryGap: true,
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        },
        yAxis: {
            type: 'value',
        },
        series: [
            {
                name: 'Water',
                type: 'line',
                smooth: true,
                stack: '1',
                data: [9300.46, 13020.76, 10109.54, 13024.79, 9310.42, 5256.74, 5210.98],
            },
            {
                name: 'Electric',
                type: 'line',
                smooth: true,
                stack: '2',
                data: [9020.7, 14812.7, 18918.7, 23304.76, 23190, 4590, 5510],
            },
            {
                name: 'Gas',
                type: 'line',
                smooth: true,
                stack: '3',
                data: [9500.46, 9321.79, 9201.76, 10354.46, 11390.79, 2430.21, 2910.24],
            },
        ],
    };



  onRef = ref => {
    if (ref) {
      this.chart = ref;
    }
  };


  render() {
    return (
      <SafeAreaView style={styles.chartContainer}>
        <ECharts
          ref={this.onRef}
          option={this.option}
          onLoadEnd={() => {
            this.chart.setBackgroundColor('#fff');
          }}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  chartContainer: {
    width:'100%',
    backgroundColor: '#F5FCFF',
    height:'90%',
  },
});
