import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import CalenderStrip from '../screens/CalenderStrip';
import DropDown from '../screens/DropDown';
import Splash from '../screens/Splash';
import Video from '../screens/Video';
import GetAPI from '../screens/GetAPI';
import Loading from '../screens/Loading';
import RefreshControl from '../screens/RefreshControl';
import CobaState from '../screens/CobaState';
import TextInput from '../screens/TextInput';
import Layout from '../screens/Layout';
import Modal from '../screens/Modal';
import Pressable from '../screens/Pressable';
import Animated from '../screens/Animated';
import DragNDrop from '../screens/DragNDrop';
import API from '../screens/API';
import APIDummy from '../screens/APIDummy';
import APIAXIOS from '../screens/APIAXIOS';
import LocalAPI from '../screens/LocalAPI';

const {Navigator, Screen} = createStackNavigator();
const Root = () => {
  return (
    <NavigationContainer>
      <Navigator
        screenOptions={{gestureEnabled: false}}
        initialRouteName="Splash"
        headerMode="none">
        <Screen name="Splash" component={Splash} />
        <Screen name="CalenderStrip" component={CalenderStrip} />
        <Screen name="DropDown" component={DropDown} />
        <Screen name="Video" component={Video} />
        <Screen name="GetAPI" component={GetAPI} />
        <Screen name="Loading" component={Loading} />
        <Screen name="RefreshControl" component={RefreshControl} />
        <Screen name="CobaState" component={CobaState} />
        <Screen name="TextInput" component={TextInput} />
        <Screen name="Layout" component={Layout} />
        <Screen name="Modal" component={Modal} />
        <Screen name="Pressable" component={Pressable} />
        <Screen name="Animated" component={Animated} />
        <Screen name="DragNDrop" component={DragNDrop} />
        <Screen name="API" component={API} />
        <Screen name="APIDummy" component={APIDummy} />
        <Screen name="APIAXIOS" component={APIAXIOS} />
        <Screen name="LocalAPI" component={LocalAPI} />
      </Navigator>
    </NavigationContainer>
  );
};

export default Root;
