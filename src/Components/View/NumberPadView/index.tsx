import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import Styled from 'styled-components/native';
import CirclButton from '~/Components/Button/CircleButton';


///나중에 다시 도전

const Conatainer = Styled.View`
    flex : 1;
    flex-direction : row;
    align-items : center;
    justify-content : space-around;    
`;

const NumberLine = Styled.View`
    flex : 1;
    flex-direction : row;
    align-items : center;
    justify-content : space-around;
    margin-left : 50;
    margin-right : 50;    
`
const TouchView = Styled.TouchableOpacity``;

interface Props {
     onClick :() => string;
     setNumber : () => void;
}

const PinView = ({onClick,setNumber} : Props) => {
    
    return (
        <Conatainer>
            <NumberLine>                    
                    <CirclButton label={1} onClick={() =>{return '1'}}/>
                    <CirclButton label={2} onClick={onClick = () =>{return '2'}}/>
                    <CirclButton label={3} onClick={onClick = () =>{return '3'}}/>
                </NumberLine>
                <NumberLine>
                    <CirclButton label={4} onClick={onClick = () =>{return '4'}}/>
                    <CirclButton label={5} onClick={onClick = () =>{return '5'}}/>
                    <CirclButton label={6} onClick={onClick = () =>{return '6'}}/>
                </NumberLine>
                <NumberLine>
                    <CirclButton label={7} onClick={onClick = () =>{return '7'}}/>
                    <CirclButton label={8} onClick={onClick = () =>{return '8'}}/>
                    <CirclButton label={9} onClick={onClick = () =>{return '9'}}/>
                </NumberLine>
                <NumberLine>
                    <TouchView>
                        <Icon name="backspace" size={50} onPress={() => {setNumber}} />
                    </TouchView>
                    <CirclButton label={9} onClick={onClick = () =>{return '0'}}/>
                    <TouchView>
                        <Icon name="checkmark" size={50} onPress={() => {}} />       
                    </TouchView>
                </NumberLine>
        </Conatainer>
    );
};

export default PinView;