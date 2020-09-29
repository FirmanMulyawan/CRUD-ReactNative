import React, {useState} from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';

const Index = () => {
  const [subjects, setSubject] = useState({
    img_filename: '',
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
    fetch('http://cms.islamicmindplus.com/api/subjects')
      .then(response => response.json())
      .then(res => {
        console.log(res);
        setSubject(res.result);
      });
  };
  console.log('ini state', subjects);
  return (
    <View style={styles.container}>
      <Text>API</Text>
      <Button title="GET DATA" onPress={getData} />
      <Text>Response GET DATA</Text>
      {/* <Image source={{uri: subjects.avatar}} style={styles.imagess} /> */}
      {/* <Text>{`${subjects.first_name} ${subjects.last_name}`}</Text> */}
      <Text>{subjects.img_filename}</Text>
      {/* <View style={styles.line} /> */}
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
