import React from 'react';
import {StatusBar} from 'react-native';
import AppNavigation from './src/Navigation/router';

const App = () => {
  return (
    <>
      <StatusBar backgroundColor="pink" barStyle="light-content" />
      <AppNavigation />
    </>
  );
};

export default App;
