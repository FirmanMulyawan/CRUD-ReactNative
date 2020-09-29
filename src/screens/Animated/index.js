/* eslint-disable react-native/no-inline-styles */
import React, {useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  Animated,
  PanResponder,
} from 'react-native';

const Index = () => {
  const pan = useRef(new Animated.ValueXY()).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: Animated.event(
      [
        null,
        {
          dx: pan.x,
          dy: pan.y,
        },
      ],
      {
        useNativeDriver: false,
      },
    ),
    onPanResponderRelease: () => {
      Animated.spring(pan, {
        toValue: {x: 0, y: 0},
        useNativeDriver: false,
      }).start();
    },
  });
  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 5000,
      useNativeDriver: true,
    }).start();
  };
  const fadeOut = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 5000,
      useNativeDriver: true,
    }).start();
  };
  return (
    <View style={styles.container}>
      <Animated.View style={[styles.fadingContainer, {opacity: fadeAnim}]}>
        <Text style={styles.fadingText}>Fading View!</Text>
      </Animated.View>
      <View style={styles.buttonRow}>
        <View style={{marginHorizontal: 20}}>
          <Button title="Fade In" onPress={fadeIn} />
        </View>
        <View style={{marginHorizontal: 20}}>
          <Button title="Fade Out" onPress={fadeOut} />
        </View>
      </View>
      <Animated.View
        {...panResponder.panHandlers}
        style={[pan.getLayout(), styles.box]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  fadingContainer: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: 'powderblue',
  },
  fadingText: {
    fontSize: 28,
    textAlign: 'center',
    margin: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    marginVertical: 16,
  },
  box: {
    backgroundColor: '#61dafb',
    width: 80,
    height: 80,
    borderRadius: 4,
  },
});
export default Index;
