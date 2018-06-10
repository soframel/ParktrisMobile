import React from 'react';
import { Provider, connect } from 'react-redux';
import thunk from 'redux-thunk';
import { combineReducers } from 'redux'
import {AppNavigator} from './navigation';
import {serverSettings} from './store/serverSettingsStore';
import {slotSettings} from './store/slotStore';
import {areaSettings} from './store/areaStore';
import { addNavigationHelpers } from 'react-navigation';
import { createStore,applyMiddleware } from 'redux';
import {loadUrl,loadLogin,loadPassword} from './actions/serverActions';

//Reducer for navigator
const initialState = AppNavigator.router.getStateForAction(AppNavigator.router.getActionForPathAndParams('Home'));
const navReducer = (state = initialState, action) => {
    const nextState = AppNavigator.router.getStateForAction(action, state);
    // Simply return the original `state` if `nextState` is null or undefined.
    return nextState || state;
  };

  //Combined reducer
const appReducer = combineReducers({
    nav: navReducer,
    serverSettings: serverSettings,
    slotSettings: slotSettings,
    areaSettings: areaSettings
  });

//Special component to enable redux in react-navigation
class AppWithNavi extends React.Component {
  render() {
    return (
      <AppNavigator navigation={addNavigationHelpers({
        dispatch: this.props.dispatch,
        state: this.props.nav,
      })} />
    );
  }
}
const mapStateToProps = (state) => ({
  nav: state.nav
});
const AppWithNavigationState = connect(mapStateToProps)(AppWithNavi);

const store=createStore(appReducer,applyMiddleware(thunk));

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
    <Provider store={store}>
      <AppWithNavigationState />
    </Provider> 
  );
  }
}

