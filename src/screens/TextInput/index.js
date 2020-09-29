import React from 'react';
import {View, Text, TextInput, SafeAreaView} from 'react-native';

function Index() {
  const [state, setstate] = React.useState('');
  return (
    <SafeAreaView>
      <View style={{borderColor: 'red', borderBottomWidth: 1}}>
        <TextInput
          placeholder="placeholder"
          onChangeText={text => setstate(text)}
          defaultValue={state}
          keyboardType={'phone-pad'}
          multiline={true}
          secureTextEntry={false}
          textAlign={'center'}
          // showSoftInputOnFocus={false}
          underlineColorAndroid={'red'}
        />
      </View>
      <Text>
        {state
          .split(' ')
          .map(word => word && 'alohass')
          .join(' ')}
      </Text>
    </SafeAreaView>
  );
}

export default Index;
