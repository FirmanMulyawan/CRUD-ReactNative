import React from 'react';
import {View, Text, StyleSheet, Button, ActivityIndicator} from 'react-native';

const Index = ({navigation}) => {
  return (
    <>
      <View style={styles.button}>
        <Button
          title="Back To Splash"
          onPress={() => navigation.navigate('Splash')}
        />
      </View>
      <View style={styles.wrapper}>
        <ActivityIndicator />
        <ActivityIndicator size="large" />
        <ActivityIndicator size="small" color="#0000ff" />
        <ActivityIndicator size="large" color="#00ff00" />
        <Text>Loading</Text>
      </View>
    </>
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
    alignItems: 'flex-start',
  },
});
export default Index;
