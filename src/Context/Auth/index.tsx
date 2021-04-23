import React, {createContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import SplashScreen from 'react-native-splash-screen';

const defaultContext : IPinumber = {
    pinNumber  : '',
    loginState : false,
    loginStateSetting : () => {},
    delPinNumber : async () => {},
    getPinNumber : async() => {},
    savePinNumber : (pinNumber : string) => {}
}

const AuthContext = createContext(defaultContext);

interface Props {
    children : JSX.Element | Array<JSX.Element>;
};

const AuthContextProvider = ({children} : Props) => {

    const [pinNumber, setPinNumber] = useState<string|null>('');
    const [loginState, setLoginState] = useState<boolean>(false);

    const getPinNumber = async() : Promise<void> => {
        AsyncStorage.getItem('pinNumber').then(value => {
            setPinNumber(value);
        }).catch((e) => {
            setPinNumber('');
        })        
    }

    const delPinNumber = async () : Promise<void> => {
        await AsyncStorage.removeItem('pinNumber');
        setPinNumber('');
        setLoginState(false);
    }

    const savePinNumber = (pinNumber : string) => {
        AsyncStorage.setItem('pinNumber',pinNumber).then(() => {
            setPinNumber(pinNumber);
        }).catch((e) => {
            console.log(e);
        })
    };

    const loginStateSetting = () => {
        setLoginState(true);
    }

    useEffect(()=>{
        SplashScreen.hide();
        getPinNumber();
    },[]);

    return (
        <AuthContext.Provider
            value={{
                savePinNumber,
                pinNumber,
                loginState,
                getPinNumber,
                delPinNumber,
                loginStateSetting
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export {AuthContextProvider, AuthContext};