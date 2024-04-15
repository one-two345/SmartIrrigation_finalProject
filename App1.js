// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import Home from './components/Home';
// import Register from './components/Register';
// import Login from './components/Login';
// // import ControlSystem from './component/ControlSystem';
// // import ViewContent from './component/ViewContent';
// const Stack = createStackNavigator();
// export default function App() {
//   return (
//     <NavigationContainer style={styles.container}>
//     <Stack.Navigator initialRouteName="Home "  >
//       <Stack.Screen name="well come to control irrigation" component={Home} style={styles.home}/>
//       <Stack.Screen name="Register" component={Register} />
//       <Stack.Screen name="Login" component={Login} />
//       {/* <Stack.Screen name='system information' component={ViewContent}/>
//       <Stack.Screen name='mointor sytem' component={ControlSystem}/> */}
//     </Stack.Navigator>
//   </NavigationContainer>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   home:{
//     alignContent:'center',
//     textAlign:'center',
//     backgroundColor:'blue'
//   }
// });
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Button, Text, View } from 'react-native'; 

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{title: 'Welcome'}}
        />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const HomeScreen = ({navigation}) => {
  return (
    <Button
      title="Go to Jane's profile"
      onPress={() =>
        navigation.navigate('Profile', {name: 'Jane'})
      }
    />
  );
};
const ProfileScreen = ({navigation, route}) => {
  return (<View>

   <Text>This is {route.params.name}'s profile</Text>
   <Button
      title="Go to Home"
      onPress={() =>
        navigation.navigate('Home')
      }
    />
   </View>);
};

export default App