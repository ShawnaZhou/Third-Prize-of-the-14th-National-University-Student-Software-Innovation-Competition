/* eslint-disable react-native/no-inline-styles *//* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {SafeAreaView} from 'react-native';
import {ECharts} from 'react-native-echarts-wrapper';

export default class FutureChart extends Component {
  option = {
    legend: {},
    tooltip: {
      trigger: 'axis',
      showContent: true,
    },
    dataset: {
      source: [
        ['product', '2017-1-1 01:00:00', '2017-1-1 02:00:00', '2017-1-1 03:00:00', '2017-1-1 04:00:00', '2017-1-1 05:00:00', '2017-1-1 06:00:00'],
        ['electric', 0, 0, 0, 0, 0, 0],
        ['water', 0, 0, 0, 0, 0, 0],
        ['gas', 0, 0, 0, 0, 0, 0],
      ],
    },
    xAxis: {type: 'category'},
    yAxis: {gridIndex: 0},
    grid: {top: '55%'},
    series: [
      {
        type: 'line',
        smooth: true,
        seriesLayoutBy: 'row',
        emphasis: {focus: 'series'},
      },
      {
        type: 'line',
        smooth: true,
        seriesLayoutBy: 'row',
        emphasis: {focus: 'series'},
      },
      {
        type: 'line',
        smooth: true,
        seriesLayoutBy: 'row',
        emphasis: {focus: 'series'},
      },
      {
        type: 'pie',
        id: 'pie',
        radius: '30%',
        center: ['50%', '25%'],
        emphasis: {focus: 'data'},
        label: {
          formatter: '{b}: {@2017} ({d}%)',
        },
        encode: {
          itemName: 'product',
          value: '2017',
          tooltip: '2017',
        },
      },
    ],
  };
  additionalCode=`
  chart.on('updateAxisPointer', function (event) {
    var xAxisInfo = event.axesInfo[0];
    if (xAxisInfo) {
        var dimension = xAxisInfo.value + 1;
        chart.setOption({
            series: {
                id: 'pie',
                label: {
                    formatter: '{b}: {@[' + dimension + ']} ({d}%)'
                },
                encode: {
                    value: dimension,
                    tooltip: dimension
                }
            }
        });
    }
});
  `
  onRef = ref => {
    if (ref) {
      this.chart = ref;
    }
  };

  componentDidUpdate(){
    let data = this.props.pushData();
    //console.log(data);
    this.Refresh(data);
  }

  Refresh=(data)=>{
    this.option.dataset.source[0] = data.gasData[0] || this.option.dataset.source[0];
    this.option.dataset.source[0][0] === 'product' ? 'false' : this.option.dataset.source[0].unshift('product');
    this.option.dataset.source[1] = data.gasData[1] || this.option.dataset.source[1];
    this.option.dataset.source[1][0] === 'electric' ? 'false' : this.option.dataset.source[1].unshift('electric');
    this.option.dataset.source[2] = data.waterData[1] || this.option.dataset.source[2];
    this.option.dataset.source[2][0] === 'water' ?  'false' : this.option.dataset.source[2].unshift('water');
    this.option.dataset.source[3] = data.powerData[1] || this.option.dataset.source[3];
    this.option.dataset.source[3][0] === 'gas' ? 'false' : this.option.dataset.source[3].unshift('gas');
    this.chart.setOption(this.option, true);
   };

  render() {
    return (
      <SafeAreaView style={{width:'100%',height:'90%',backgroundColor:'#F5FCFF'}}>
        <ECharts
         option={this.option}
         ref={this.onRef}
         additionalCode={this.additionalCode}
         />
      </SafeAreaView>
    );
  }
}
