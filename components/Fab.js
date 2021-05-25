/* eslint-disable react-native/no-inline-styles *//* eslint-disable prettier/prettier */
import React,{useState} from 'react';
import {FAB} from 'react-native-paper';

const Fab = (props) => {
  const [state, setState] = useState({open: false});

  const onStateChange = ({open}) => setState({open});

  const {open} = state;
  const { getChildrenData } = props;
  return (
        <FAB.Group
          style={{paddingBottom:90,zIndex:1000}}
          open={open}
          icon={open ? 'calendar-today' : 'plus'}
          actions={[
            {
              icon: 'water',
              label: 'Select Water Chart',
              onPress: () => { getChildrenData(0);},
            },
            {
              icon: 'gas-cylinder',
              label: 'Select Gas Chart',
              onPress: () => { getChildrenData(1);},
            },
            {
              icon: 'power-socket',
              label: 'Select Electricity Chart',
              onPress: () => { getChildrenData(2);},
            },
          ]}
          onStateChange={onStateChange}
          onPress={() => {
              // do something if the speed dial is open
          }}
        />
  );
};

export default Fab;
