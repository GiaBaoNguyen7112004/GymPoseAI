import 'expo-dev-client'
import { registerRootComponent } from 'expo'
import App from './App'
// Before rendering any navigation stack
import { enableScreens } from 'react-native-screens'
enableScreens()
// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app nin Expo Go or in a native build,
// the environment is set up appropriately

registerRootComponent(App)
