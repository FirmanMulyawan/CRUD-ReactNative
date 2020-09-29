import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import styles from './styles';

const DropdownItem = props => {
  const onPress = () => {
    if (typeof props.onPress === 'function') {
      onPress(props.index);
    }
  };

  return (
    <TouchableOpacity
      {...props}
      style={[styles.container, props.style]}
      onPress={onPress}>
      <Text>{props.children}</Text>
    </TouchableOpacity>
  );
};

export default DropdownItem;
