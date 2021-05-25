/* eslint-disable react-native/no-inline-styles *//* eslint-disable prettier/prettier */
import React, {Component} from 'react';

import {ECharts} from 'react-native-echarts-wrapper';

export default class CurrentGeneralChart extends Component {
    option = {
        title: {
        left: 'center',
        },
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)',
        },
        legend: {
            left: 'center',
            top: 'bottom',
            data: ['rose1', 'rose2', 'rose3', 'rose4', 'rose5', 'rose6', 'rose7', 'rose8'],
        },
        series: [
            {
                name: 'Already Used',
                type: 'pie',
                radius: [20, 140],
                center: ['50%', '50%'],
                roseType: 'area',
                itemStyle: {
                    borderRadius: 5,
                },
                data: [
                    {value: 30, name: 'Water'},
                    {value: 28, name: 'Gas'},
                    {value: 26, name: 'Electricty'},
                ],
            },
        ],
    };
  onRef = ref => {
    if (ref) {
      this.chart = ref;
    }
  };

  componentDidUpdate(){
    let data = this.props.pushData();
    console.log('getGeneralData: ',data);
    this.tick(data);
  }

  tick = (data) => {
    this.option.series[0].data[0].value = data.waterData;
    this.option.series[0].data[1].value = data.gasData;
    this.option.series[0].data[2].value = data.electricData;
    this.chart.setOption(this.option, true);
    console.log('GeneralChart: ',data);
  };

  render() {
    return <ECharts style={{width:'100%'}} ref={this.onRef} option={this.option} />;
  }
}
