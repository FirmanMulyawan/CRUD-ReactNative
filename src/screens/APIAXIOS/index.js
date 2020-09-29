import React, {useState} from 'react';
import {View, Text, StyleSheet, Button, Image} from 'react-native';
import Axios from 'axios';

const Index = () => {
  const [dataUser, setDataUser] = useState({
    avatar: '',
    email: '',
    first_name: '',
    last_name: '',
  });
  const [dataJob, setDataJob] = useState({
    name: '',
    job: '',
  });
  const getData = () => {
    Axios.get('https://reqres.in/api/users/3')
      .then(result => {
        setDataUser(result.data.data);
      })
      .catch(err => console.log('err: ', err));
  };

  const postData = () => {
    const dataForAPI = {
      name: 'morpheus',
      job: 'leader',
    };
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
    //     setDataJob(result);
    //   });
    Axios.post('https://reqres.in/api/users', dataForAPI)
      .then(result => {
        setDataJob(result.data);
      })
      .catch(err => console.log('err: ', err));
  };
  return (
    <View style={styles.container}>
      <Text>Call API AXIOS</Text>
      <Button title="GET DATAss" onPress={getData} />
      <Text>Response GET DATA</Text>
      {dataUser.avatar.length > 0 && (
        <Image source={{uri: dataUser.avatar}} style={styles.avatar} />
      )}
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
