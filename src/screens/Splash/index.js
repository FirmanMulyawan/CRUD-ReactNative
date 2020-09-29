/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, StyleSheet, Button, ScrollView} from 'react-native';

class MyAppText extends React.Component {
  render() {
    return <Text>Ini contoh children</Text>;
  }
}

function Index({navigation}, props) {
  return (
    <ScrollView style={styles.wrapper}>
      <View style={{alignItems: 'center'}}>
        <Text>Splash</Text>
      </View>
      <MyAppText>{props.children}</MyAppText>
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'space-around',
        }}>
        <View style={styles.button}>
          <Button
            title="Drop Down"
            onPress={() => navigation.navigate('DropDown')}
          />
        </View>
        <View style={styles.button}>
          <Button
            title="CalenderStrip"
            onPress={() => navigation.navigate('CalenderStrip')}
            pageX={30}
          />
        </View>
        <View style={styles.button}>
          <Button title="Video" onPress={() => navigation.navigate('Video')} />
        </View>
        <View style={styles.button}>
          <Button
            title="Status Bar"
            onPress={() => navigation.navigate('GetAPI')}
          />
        </View>
        <View style={styles.button}>
          <Button
            title="ActivityIndicator"
            onPress={() => navigation.navigate('Loading')}
          />
        </View>
        <View style={styles.button}>
          <Button
            title="Refresh Control"
            onPress={() => navigation.navigate('RefreshControl')}
          />
        </View>
        <View style={styles.button}>
          <Button
            title="Percobaan State"
            onPress={() => navigation.navigate('CobaState')}
          />
        </View>
        <View style={styles.button}>
          <Button
            title="TextInput"
            onPress={() => navigation.navigate('TextInput')}
          />
        </View>
        <View style={styles.button}>
          <Button
            title="Layout"
            onPress={() => navigation.navigate('Layout')}
          />
        </View>
        <View style={styles.button}>
          <Button title="Modal" onPress={() => navigation.navigate('Modal')} />
        </View>
        <View style={styles.button}>
          <Button
            title="Pressable"
            onPress={() => navigation.navigate('Pressable')}
          />
        </View>
        <View style={styles.button}>
          <Button
            title="Animated"
            onPress={() => navigation.navigate('Animated')}
          />
        </View>
        <View style={styles.button}>
          <Button
            title="Drag N Drop"
            onPress={() => navigation.navigate('DragNDrop')}
          />
        </View>
        <View style={styles.button}>
          <Button title="API CRUD" onPress={() => navigation.navigate('API')} />
        </View>
        <View style={styles.button}>
          <Button
            title="API DUMMY"
            onPress={() => navigation.navigate('APIDummy')}
          />
        </View>
        <View style={styles.button}>
          <Button
            title="API AXIOS"
            onPress={() => navigation.navigate('APIAXIOS')}
          />
        </View>
        <View style={styles.button}>
          <Button
            title="Local API"
            onPress={() => navigation.navigate('LocalAPI')}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    // marginHorizontal: 30,
    marginTop: 50,
  },
  button: {
    marginTop: 30,
    width: 150,
  },
});
export default Index;
