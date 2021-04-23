import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import Styled from 'styled-components/native';


const Conatainer = Styled.View`
    flex : 1;
    flex-direction : row;
    align-items : center;
    justify-content : space-around;    
`;

interface Props {
    pinLength : number;
}

const PinView = ({pinLength} : Props) => {


    const drawPinNumber = () => {
        if(pinLength === 0){
            return (
                <>
                <Icon name="ellipse-outline" size={30} />
                <Icon name="ellipse-outline" size={30} />
                <Icon name="ellipse-outline" size={30} />
                <Icon name="ellipse-outline" size={30} />
                </>
            )
        }else if(pinLength === 1){
            return (
                <>
                <Icon name="ellipse" size={30} />
                <Icon name="ellipse-outline" size={30} />
                <Icon name="ellipse-outline" size={30} />
                <Icon name="ellipse-outline" size={30} />
                </>
            )
        }else if(pinLength === 2){
            return (
                <>
                <Icon name="ellipse" size={30} />
                <Icon name="ellipse" size={30} />
                <Icon name="ellipse-outline" size={30} />
                <Icon name="ellipse-outline" size={30} />
                </>
            )
        }else if(pinLength === 3){
            return (
                <>
                <Icon name="ellipse" size={30} />
                <Icon name="ellipse" size={30} />
                <Icon name="ellipse" size={30} />
                <Icon name="ellipse-outline" size={30} />
                </>
            )
        }else if(pinLength === 4){
            return (
                <>
                <Icon name="ellipse" size={30} />
                <Icon name="ellipse" size={30} />
                <Icon name="ellipse" size={30} />
                <Icon name="ellipse" size={30} />
                </>
            )
        }
    }

    return (
        <Conatainer>
            {drawPinNumber()}
        </Conatainer>
    );
};

export default PinView;