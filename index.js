/**
 * @format
 */
import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {LogBox} from 'react-native';
LogBox.ignoreLogs(['Remote debugger']);

LogBox.ignoreLogs(['new NativeEventEmitter']); // Ignore log notification by message

AppRegistry.registerComponent(appName, () => App);
