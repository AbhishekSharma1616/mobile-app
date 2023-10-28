/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
// import { POPPINS_BOLD, POPPINS_MEDIUM, POPPINS_REGULAR, POPPINS_SEMIBOLD } from './src/assets/fonts';

// import { useFonts } from 'react-native-config';

// // Load custom fonts using useFonts
// const [fontsLoaded] = useFonts({
//     [POPPINS_BOLD]: require(`./src/assets/fonts/Poppins-Bold.ttf`),
//     [POPPINS_MEDIUM]: require(`./src/assets/fonts/Poppins-Medium.ttf`),
//     [POPPINS_REGULAR]: require(`./src/assets/fonts/Poppins-Regular.ttf`),
//     [POPPINS_SEMIBOLD]: require(`./src/assets/fonts/Poppins-SemiBold.ttf`),
//   });

AppRegistry.registerComponent(appName, () => App);
