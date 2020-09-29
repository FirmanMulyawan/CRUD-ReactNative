/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Dimensions} from 'react-native';
import BaseModal from 'react-native-modal';

const Modal = ({
  isVisible,
  style,
  onRequestClose,
  children,
  type,
  modalStyle,
  coverScreen = true,
  useNativeDriver = true,
  ...props
}) => {
  return (
    <BaseModal
      backdropOpacity={0.5}
      isVisible={isVisible}
      style={[
        {margin: 0},
        type === 'bottom' && {justifyContent: 'flex-end'},
        modalStyle,
      ]}
      onBackdropPress={onRequestClose}
      onSwipeComplete={onRequestClose}
      swipeDirection={type === 'bottom' ? ['down'] : ['down', 'up']}
      deviceHeight={Dimensions.get('window').height}
      coverScreen={type === 'bottom' ? false : coverScreen}
      useNativeDriver={type === 'bottom' ? true : useNativeDriver}
      {...props}>
      <View style={[{backgroundColor: '#fff', minHeight: 50}, style]}>
        {children}
      </View>
    </BaseModal>
  );
};

export default Modal;
