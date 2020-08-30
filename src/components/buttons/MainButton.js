import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

const MainButton = (props) => {
  return (
    <TouchableOpacity type="button" style={props.styles}>
      {props.children}
    </TouchableOpacity>
  );
};

export default MainButton;
