import {DrawerNavigator} from 'react-navigation';
import ParktrisHome from './components/ParktrisHome';
import ServerSettings from './components/ServerSettings';
import SlotManagement from './components/SlotManagement';

export const AppNavigator = DrawerNavigator({
    Home: {
      screen: ParktrisHome
    },
    Server: {
      screen: ServerSettings
    },
    SlotManagement: {
      screen: SlotManagement
    }
  });