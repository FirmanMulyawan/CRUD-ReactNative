/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Button, StyleSheet} from 'react-native';
import VideoPlayer from './Video';

const Index = ({data = {}, navigation}) => {
  const {content, title} = data;
  return (
    <View style={{marginTop: 50}}>
      <VideoPlayer data={{video: content, title: title}} />
      <View style={styles.button}>
        <Button
          title="Back to Splash"
          onPress={() => navigation.navigate('Splash')}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    marginTop: 30,
  },
});
export default Index;
