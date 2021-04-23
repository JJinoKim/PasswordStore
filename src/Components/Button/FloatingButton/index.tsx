import React,{useEffect} from 'react';
import Styled from 'styled-components/native';
import {View} from 'react-native';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';


interface Props {
    goRegist : () => void;
    goMain : () => void;
}

const FloatingButton = ({goRegist,goMain} : Props) => {

    return (
        <View style={{}}>
            <ActionButton buttonColor="rgba(231,76,60,1)">
                <ActionButton.Item buttonColor='#9b50b6' onPress={goMain}>
                    <Icon name="md-create" style={{fontSize : 20, height: 20, color:'#ffffff'}}/>
 
                </ActionButton.Item>
                <ActionButton.Item buttonColor='#3498db' onPress={goRegist}>
                    <Icon name="md-create" style={{fontSize : 20, height: 20, color:'#ffffff'}}/>
                </ActionButton.Item>
            </ActionButton>
        </View>
    );
};

export default FloatingButton;