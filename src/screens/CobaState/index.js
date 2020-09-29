import React from 'react';
import {View, Text, Button} from 'react-native';

const Cat = ({nama}) => {
  const [status, setstate] = React.useState(true);
  const onPress = () => {
    setstate(false);
  };
  return (
    <View>
      <Text>
        saya {nama} dan saya {status ? 'lapar' : 'full'}
      </Text>
      <Button
        title={status ? 'kasih makan' : 'terima kasih'}
        onPress={onPress}
        disabled={!status}
      />
    </View>
  );
};
const Index = () => {
  return (
    <View>
      <Cat nama="salma" />
      <Cat nama="agni" />
    </View>
  );
};

export default Index;
