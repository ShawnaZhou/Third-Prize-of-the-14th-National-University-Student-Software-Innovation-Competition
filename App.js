/* eslint-disable prettier/prettier */
import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import {
    Home,
    Current,
    Future,
    History,
    Login,
    Setting,
    Notice,
    Services,
    Personal,
    ArchitectureModel,
} from './screens';
import Tabs from './routes/tabs';
const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#226F10',//46ee75
    accent: '#3498db',
  },
};
const Stack = createStackNavigator();

const App = () => {
  return (
    <PaperProvider theme={theme}>
    <NavigationContainer>
      <Stack.Navigator initialRouteName={'Login'}>
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="Login"
          component={Login}
        />
        <Stack.Screen
          options={{
            headerShawn: true,
            title: 'Setting',
          }}
          name="Setting"
          component={Setting}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="Home"
          component={Tabs}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="History"
          component={History}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="Index"
          component={Home}
        />
         <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="Future"
          component={Future}
        />
         <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="Current"
          component={Current}
        />
        <Stack.Screen
          options={{
            headerShown: true,
          }}
          name="Notice"
          component={Notice}
        />
        <Stack.Screen
          options={{
            headerShown: true,
          }}
          name="Personal"
          component={Personal}
        />
        <Stack.Screen
          options={{
            headerShown: true,
          }}
          name="Services"
          component={Services}
        />
        <Stack.Screen
          options={{
            headerShown: true,
          }}
          name="ArchitectureModel"
          component={ArchitectureModel}
        />
      </Stack.Navigator>
    </NavigationContainer>
    </PaperProvider>
  );
};

export default App;
