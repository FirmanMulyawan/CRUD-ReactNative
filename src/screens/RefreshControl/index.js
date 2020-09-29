import React from 'react';
import {
  ScrollView,
  RefreshControl,
  SafeAreaView,
  Text,
  StyleSheet,
} from 'react-native';

const menunggu = timeOut => {
  return new Promise(resolve => {
    setTimeout(resolve, timeOut);
  });
};
const Index = () => {
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    menunggu(2000).then(() => setRefreshing(false));
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#ff0000" // for ios
            title="Loading..." // for ios
            titleColor="#00ff00" // for ios
            colors={['#ff0000', '#00ff00', '#0000ff']}
            progressBackgroundColor="#ffff00"
          />
        }>
        <Text>Refresh Control</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    // backgroundColor: 'cyan',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default Index;
