import React,{useRef, useState, createRef, useEffect, useContext} from 'react';
import Styled from 'styled-components/native';
import {TouchableOpacity, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {StackNavigationProp} from '@react-navigation/stack';

import {AuthContext} from '~/Context/Auth';
import CirclButton from '~/Components/Button/CircleButton';
import PinView from '~/Components/View/PinView';


//import NumberPadView from '~/Components/View/NumberPadView';  <-- 나중에 다시 도전해야지

const Container = Styled.SafeAreaView`
    flex : 1;
    justify-content: center;
    background-color: #faf6f6;
`

const Header = Styled.SafeAreaView`    
    flex : 1;
    flex-direction : row;
    align-items : center;
    justify-content : space-around;
    background-color : #faf6f6;
    margin-left : 60;
    margin-right : 60; 
    margin-bottom : 50;  
`;

const NumberContainer = Styled.View`
    flex : 5;    
    background-color : #faf6f6; 
    margin-bottom : 20; 
`;

const NumberLine = Styled.View`
    flex : 1;
    flex-direction : row;
    align-items : center;
    justify-content : space-around;
    margin-left : 50;
    margin-right : 50;    
`

const TextContainer = Styled.View`
    align-items : center;
    flex  : 1;
    margin-top : 100;
`;

const TextMessage = Styled.Text`
    flex : 1;
    font-size : 30;
    color : #131313;
`;

type NavigationProp = StackNavigationProp<PinNaviParmaList,'PinScreen'>;

interface Props {
    navigaion : NavigationProp;
}


const PinLogin = ({navigaion} : Props) => {  
    const [inputPinNumber , setInputPinNumber] = useState<string>('');
    const [tempPinNumber, setTempPinNumber] = useState<string>('');
    const {savePinNumber, pinNumber,loginStateSetting} = useContext<IPinumber>(AuthContext);

    const registMessageBox = () => {
        return (
            <TextMessage>
                {tempPinNumber ? '한번 더 입력해주세요' : '가입해주세요'}
            </TextMessage>
        );
    };

    const inputMessageBox = () => {
        return (
            <TextMessage>
                Input Pin Code
            </TextMessage>
        );
    };

    useEffect(() => {               
        if(inputPinNumber.length === 4){            
            if(pinNumber){
                if(inputPinNumber === pinNumber){
                    loginStateSetting();
                }else{
                    Alert.alert('비밀번호가 틀렸다');
                    setInputPinNumber('');
                }
            }else{
                if(!tempPinNumber){
                    setTempPinNumber(inputPinNumber);
                }else{
                    if(inputPinNumber === tempPinNumber){                
                        savePinNumber(inputPinNumber);
                        Alert.alert('가입이 완료되었습니다.');
                    }else{
                        Alert.alert('비밀번호가 다르다');
                        setTempPinNumber('');
                    }
                }            
                setInputPinNumber('');
            }            
        }
    });

    return (
        <Container>
            <TextContainer>
                {pinNumber ? inputMessageBox() : registMessageBox() }
            </TextContainer>
            <Header>
                <PinView pinLength={inputPinNumber.length} />                   
            </Header>            
            <NumberContainer>            
                <NumberLine>                    
                    <CirclButton label={1} onClick={()=>{setInputPinNumber(inputPinNumber+'1')}}/>
                    <CirclButton label={2} onClick={()=>{setInputPinNumber(inputPinNumber+'2')}}/>
                    <CirclButton label={3} onClick={()=>{setInputPinNumber(inputPinNumber+'3')}}/>
                </NumberLine>
                <NumberLine>
                    <CirclButton label={4} onClick={()=>{setInputPinNumber(inputPinNumber+'4')}}/>
                    <CirclButton label={5} onClick={()=>{setInputPinNumber(inputPinNumber+'5')}}/>
                    <CirclButton label={6} onClick={()=>{setInputPinNumber(inputPinNumber+'6')}}/>
                </NumberLine>
                <NumberLine>
                    <CirclButton label={7} onClick={()=>{setInputPinNumber(inputPinNumber+'7')}}/>
                    <CirclButton label={8} onClick={()=>{setInputPinNumber(inputPinNumber+'8')}}/>
                    <CirclButton label={9} onClick={()=>{setInputPinNumber(inputPinNumber+'9')}}/>
                </NumberLine>
                <NumberLine>
                    <TouchableOpacity onPress={() => {setInputPinNumber(inputPinNumber.slice(0,-1))}}>
                        <Icon name="backspace" size={50}  />
                    </TouchableOpacity>
                    <CirclButton label={0} onClick={()=>{setInputPinNumber(inputPinNumber+'0')}}/>
                    <TouchableOpacity>
                        <Icon name="checkmark" size={50}  />       
                    </TouchableOpacity>
                </NumberLine>
            </NumberContainer>            
        </Container>
    );
};


export default PinLogin;