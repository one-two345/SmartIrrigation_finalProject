import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { Login, Signup, Welcome } from "./screens";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import {thunk} from 'redux-thunk';
//import   ControlSystem from  './screens/ControlSystem.js'
import ControlSystem from './screens/ControlSystem'
import ViewContent from './screens/ViewContent';
import ScheduleManagment from './screens/ScheduleManagment'
import Setting from './screens/Setting'
import Manual from './screens/Manual2';
import {reducers} from './reducers'

const store = createStore(reducers, compose(applyMiddleware(thunk)));

const Stack = createNativeStackNavigator();

export default function App() {
  
  return (
    
    <Provider store = {store}> 
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName='Welcome'
          >
            <Stack.Screen
              name="Welcome"
              component={Welcome}
              options={{
                headerShown: false
              }}
            />
            <Stack.Screen
              name="Login"
              component={Login}
              options={{
                headerShown: true
              }}
            />
            <Stack.Screen
              name="Signup"
              component={Signup}
              options={{
                headerShown: true
              }}
            />
            <Stack.Screen
              name="ViewContent"
              component={ViewContent}
              options={{

                headerShown: true
              }}
              
            />
            <Stack.Screen
              name="controlSystem"
              component={ControlSystem}
              options={{
                headerShown: true
              }}
              
            />
            <Stack.Screen
              name="scheduleManagement"
              component={ScheduleManagment}
              options={{
                headerShown: true
              }}
              
            />
            <Stack.Screen
              name="setting"
              component={Setting}
              options={{
                headerShown:true
              }}
              
            />
             <Stack.Screen
              name="Manual"
              component={Manual}
              options={{
                headerShown:true
              }}
              
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  );
}