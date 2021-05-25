/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import { ECharts } from 'react-native-echarts-wrapper';

export default class HistoryCharts extends Component {

    option = {
        tooltip: {
            trigger: 'axis',
        },
        legend: {
            data: ['Water', 'electric', 'gas'],
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
                stack: '1',
                smooth: true,
                data: [0, 0, 0, 0, 0, 0, 0],
            },
            {
                name: 'electric',
                type: 'line',
                stack: '2',
                smooth: true,
                data: [0, 0, 0, 0, 0, 0, 0],
            },
            {
                name: 'gas',
                type: 'line',
                stack: '3',
                smooth: true,
                data: [0, 0, 0, 0, 0, 0, 0],
            },
        ],
    };

    Refresh=(data)=>{
     this.option.xAxis.data = data.gasData[0];
     this.option.series[2].data = data.gasData[1] || this.option.series[2].data;
     this.option.series[0].data = data.waterData[1] || this.option.series[0].data;
     this.option.series[1].data = data.powerData[1] || this.option.series[1].data;
     this.chart.setOption(this.option, true);
    };

    componentDidUpdate(){
      let data = this.props.pushData();
      this.Refresh(data);
    }




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
          additionalCode={this.additionalCode}
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
