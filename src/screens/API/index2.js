import React, {useEffect, useState} from 'react';
import {View, Text, Button, StyleSheet, Image} from 'react-native';

const Index = () => {
  const [subjects, setSubject] = useState({
    avatar: '',
    email: '',
    first_name: '',
    last_name: '',
  });
  const [job, setJob] = useState({
    name: '',
    job: '',
  });
  // useEffect(() => {
  // call API methode GET (tanpa mengirimkan body)
  // fetch('http://cms.islamicmindplus.com/api/subjects')
  //   .then(response => response.json())
  //   .then(result => console.log('ini hasil', result));

  // call API methode Post (mengirimkan body)
  // const dataForAPI = {
  //   name: 'Dandi',
  //   job: 'Programmer',
  // };
  // console.log('data object: ', dataForAPI);
  // console.log('data stringify: ', JSON.stringify(dataForAPI));
  // fetch('https://reqres.in/api/users', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify(dataForAPI),
  // })
  //     .then(response => response.json())
  //     .then(result => {
  //       console.log('post response: ', result);
  //     });
  // }, []);

  const getData = () => {
    fetch('https://reqres.in/api/users/2')
      .then(response => response.json())
      .then(json => {
        console.log(json);
        setSubject(json.data);
      });
  };
  console.log('ini state', subjects);

  const postData = () => {
    const dataForAPI = {
      name: 'Dandi',
      job: 'Programmer',
    };
    fetch('https://reqres.in/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataForAPI),
    })
      .then(response => response.json())
      .then(result => {
        console.log('post response: ', result);
        setJob(result);
      });
  };
  return (
    <View style={styles.container}>
      <Text>API</Text>
      <Button title="GET DATA" onPress={getData} />
      <Text>Response GET DATA</Text>
      <Image source={{uri: subjects.avatar}} style={styles.imagess} />
      <Text>{`${subjects.first_name} ${subjects.last_name}`}</Text>
      <Text>{subjects.email}</Text>
      <View style={styles.line} />
      <Button title="POST DATA" onPress={postData} />
      <Text>Response POST DATA</Text>
      <Text>{job.name}</Text>
      <Text>{job.job}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 30,
  },
  line: {
    height: 2,
    backgroundColor: 'black',
    marginVertical: 20,
  },
  imagess: {
    width: 100,
    height: 100,
    borderRadius: 100,
  },
});
export default Index;
