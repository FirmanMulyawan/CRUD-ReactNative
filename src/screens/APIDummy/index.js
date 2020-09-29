import React, {useState} from 'react';
import {View, Text, StyleSheet, Button, Image} from 'react-native';

const Index = () => {
  const [dataUser, setDataUser] = useState({
    avatar: undefined,
    email: '',
    first_name: '',
    last_name: '',
  });
  const [dataJob, setDataJob] = useState({
    name: '',
    job: '',
  });
  const getData = () => {
    fetch('https://reqres.in/api/users/2')
      .then(response => response.json())
      .then(json => {
        console.log(json);
        setDataUser(json.data);
      });
  };

  const postData = () => {
    const dataForAPI = {
      name: 'morpheus',
      job: 'leader',
    };
    fetch('https://reqres.in/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataForAPI),
    })
      .then(res => res.json())
      .then(result => {
        console.log('post response: ', result);
        setDataJob(result);
      });
  };
  return (
    <View style={styles.container}>
      <Button title="GET DATA" onPress={getData} />
      <Text>Response GET DATA</Text>
      <Image source={{uri: dataUser.avatar}} style={styles.avatar} />
      <Text>{`${dataUser.first_name} ${dataUser.last_name}`}</Text>
      <Text>{dataUser.email}</Text>
      <View style={styles.line} />
      <Button title="POST DATA" onPress={postData} />
      <Text>Response POST DATA</Text>
      <Text>{dataJob.name}</Text>
      <Text>{dataJob.job}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  line: {
    height: 2,
    backgroundColor: 'black',
    marginVertical: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 100,
  },
});
export default Index;
