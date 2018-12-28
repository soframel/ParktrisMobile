import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Provider, connect } from 'react-redux';
import thunk from 'redux-thunk';
import { combineReducers } from 'redux'
import {createDrawerNavigator} from 'react-navigation';
import { createStore,applyMiddleware } from 'redux';
import {serverSettings} from './store/serverSettingsStore';
import {slotSettings} from './store/slotStore';
import {areaStore} from './store/areaStore';
import {freeSlotDeclarationStore} from './store/freeSlotDeclarationStore';
import {userStore} from './store/userStore';
import ParktrisHome from './components/ParktrisHome';
import ServerSettings from './components/ServerSettings';
import SlotManagement from './components/SlotManagement';
import FreeSlotDeclaration from './components/FreeSlotDeclaration';


const appReducer = combineReducers({
  serverSettings: serverSettings,
  slotSettings: slotSettings,
  areaStore: areaStore,
  freeSlotDeclarationStore: freeSlotDeclarationStore,
  userStore: userStore,
});
const store=createStore(appReducer,applyMiddleware(thunk));

const AppNavigator = createDrawerNavigator({
  Home: {
    screen: ParktrisHome
  },
  Server: {
    screen: ServerSettings
  },
  SlotManagement: {
    screen: SlotManagement
  },
  FreeSlotDeclaration: {
    screen: FreeSlotDeclaration
  }
});

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Provider store={store}>
      <AppNavigator />
   </Provider> 
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
