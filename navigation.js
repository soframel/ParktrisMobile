import {createDrawerNavigator} from 'react-navigation';
import ParktrisHome from './components/ParktrisHome';
import ServerSettings from './components/ServerSettings';
import SlotManagement from './components/SlotManagement';

export default AppNavigator = createDrawerNavigator({
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