/* eslint-disable react-native/no-inline-styles *//* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {SafeAreaView, Button} from 'react-native';
import {ECharts} from 'react-native-echarts-wrapper';
import WebView from 'react-native-webview';





export default class App extends Component {


//   additionalCode = `
//         chart.on('click', function(param) {
//             var obj = {
//             type: 'event_clicked',
//             data: param.data
//             };

//             sendData(JSON.stringify(obj));
//         });
//     `;

//   onData = param => {
//     const obj = JSON.parse(param);

//     if (obj.type === 'event_clicked') {
//       alert(`you tapped the chart series: ${obj.data}`);
//     }
//   };

//   onRef = ref => {
//     if (ref) {
//       this.chart = ref;
//     }
//   };

//   onButtonClearPressed = () => {
//     this.chart.clear();
//   };


  render() {
    return (
      <SafeAreaView style={{flex:1}}>
        <Button title="Clear" onPress={this.onButtonClearPressed} />
        <WebView source={{ uri: 'file:///android_asset/model.html' }} />
        {/* <ECharts
          ref={this.onRef}
          option={option}
          additionalCode={this.additionalCode}
          onData={this.onData}
          customTemplatePath="file:///android_asset/model.html"
          onLoadEnd={() => {
            this.chart.setBackgroundColor('rgba(93, 169, 81, 0.1)');
          }}
        /> */}
      </SafeAreaView>
    );
  }
}


