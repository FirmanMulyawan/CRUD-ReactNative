import React from 'react';
import {View, Text, Button} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

const Index = ({navigation}) => {
  const [register, setstate] = React.useState({
    nama: 'Firman',
    ktp: 'Gangan',
  });
  const onPres = () => {
    setstate({
      ...register,
      nama: 'dandi',
    });
  };
  return (
    <View>
      <TouchableOpacity
        onPress={onPres}
        style={{backgroundColor: 'red', width: 200, height: 200}}
      />
      <Text>{register.nama}</Text>
      <Text>{register.ktp}</Text>
      <Button
        title="back to splash"
        onPress={() => navigation.navigate('Splash')}
      />
    </View>
  );
};

export default Index;
