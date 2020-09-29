import React from 'react';
import {View, StyleSheet, Button} from 'react-native';
import ItemButton from './Item';

const Index = ({navigation}) => {
  return (
    <>
      <View style={styles.button}>
        <Button
          title="Back splash"
          onPress={() => navigation.navigate('Splash')}
        />
      </View>
      <View style={styles.wrapper}>
        <ItemButton style={styles.touchable} children={'pak'} />
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
  touchable: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    width: 100,
  },
});
export default Index;
