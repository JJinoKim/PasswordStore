import React,{useContext} from 'react';
import {Image} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {AuthContext} from '~/Context/Auth';
import PinLogin from '~/Screen/PinLogin';
import AuthInfo from '~/Screen/AuthInfo';

import ListView from '~/Screen/Main/ListView';
import RegistData from '~/Screen/Main/RegistData';
import UpdateData from '~/Screen/Main/UpdateData';

const Stack = createStackNavigator();
const BottomTab = createBottomTabNavigator();

const PinLoginNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{headerShown:false}} >
            <Stack.Screen name="PinScreen" component={PinLogin}  />
        </Stack.Navigator>
    )
}

const MainScreenTab = () => {
    return (
        <Stack.Navigator screenOptions={{headerShown :false}}>
            <Stack.Screen name='ListView' component={ListView}  />         
            <Stack.Screen name='RegistData' component={RegistData}  />                           
            <Stack.Screen name='UpdateData' component={UpdateData}  />                                       
        </Stack.Navigator>
    )
}

const AuthInfoScreenTab = () => {
    return (
        <Stack.Navigator screenOptions={{headerShown :false}}>
            <Stack.Screen name='AuthInfoScreen' component={AuthInfo} />
        </Stack.Navigator>
    )
}

const MainNavigatorTab = () => {
    return (
        <BottomTab.Navigator 
            tabBarOptions={{showLabel:false}}
        >
            <BottomTab.Screen 
                name='MainScreenTab'            
                component={MainScreenTab}                
                options={{
                    tabBarIcon : ({color,focused}) => (
                        <Image 
                            source={
                                focused ? require('~/Assets/Images/Icon/view_list_fill.png')
                                        : require('~/Assets/Images/Icon/view_list.png')
                            }
                        />
                    )
                }}
            />

            <BottomTab.Screen 
                name='AuthInfoScreenTab'            
                component={AuthInfoScreenTab}                
                options={{
                    tabBarIcon : ({color,focused}) => (
                        <Image 
                            source={
                                focused ? require('~/Assets/Images/Icon/settings_fill.png')
                                        : require('~/Assets/Images/Icon/settings.png')
                            }
                        />
                    )
                }}
            />          

        </BottomTab.Navigator>
    )
}


const Navigator = () => {
    const {delPinNumber,loginState} = useContext<IPinumber>(AuthContext);

    return (
        <NavigationContainer>
            {loginState ? <MainNavigatorTab /> : <PinLoginNavigator />}
        </NavigationContainer>
    );
};

export default Navigator;