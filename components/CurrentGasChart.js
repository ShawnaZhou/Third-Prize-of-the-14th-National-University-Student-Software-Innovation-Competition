/* eslint-disable react-native/no-inline-styles */ /* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {ECharts} from 'react-native-echarts-wrapper';

export default class CurrentGasChart extends Component {
  option = {
    tooltip: {
      formatter: '{a} <br/>{b} : {c} L',
    },
    series: [
      {
        name: 'Gas',
        type: 'gauge',
        max: 4000,
        progress: {
          show: true,
          width: 5,
        },
        detail: {
          valueAnimation: true,
          formatter: '{value}',
        },
        data: [
          {
            value: 0,
            name: 'Already used',
          },
        ],
      },
    ],
  };
  onRef = ref => {
    if (ref) {
      this.chart = ref;
    }
  };
  componentDidUpdate() {
    let data = this.props.pushData();
    console.log('getGasData: ', data);
    this.refresh(data);
  }
  refresh = (data) =>{
    this.option.series[0].data[0].value = data.gasData;
    this.chart.setOption(this.option, true);
    console.log('GasChart: ',data);
  }
  render() {
    return (
      <ECharts style={{width: '100%'}} ref={this.onRef} option={this.option} />
    );
  }
}
