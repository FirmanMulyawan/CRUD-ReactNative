import React, {useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import LInk from './index';
const Vanilla = () => {
  // useEffect(() => {
  // call API method GET
  // fetch('https://reqres.in/api/users/2')
  //   .then(response => response.json())
  //   .then(json => console.log(json));

  // call API method POST
  // const dataForAPI = {
  //   name: 'morpheus',
  //   job: 'leader',
  // };
  // console.log('data object', dataForAPI);
  // console.log('data stringify', JSON.stringify(dataForAPI));
  // fetch('https://reqres.in/api/users', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify(dataForAPI),
  // })
  //   .then(res => res.json())
  //   .then(result => {
  //     console.log('post response: ', result);
  //   });
  // }, []);
  return (
    <View style={styles.container}>
      <Text>API Dummy</Text>
      <LInk />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 50,
  },
});
export default Vanilla;
