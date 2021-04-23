import React from 'react';
import Styled from 'styled-components/native';

const Container = Styled.View`
    background-color : #faf6f6;    
`;



const NumberButton = Styled.TouchableOpacity`
    background-color : #e7e5e5;
    align-items : center;
    justify-content : center;
    width : 70;
    height : 70;
    border-radius : 35;    
`;

const Label = Styled.Text`
    color: #313131;
    font-size : 40px;
    font-family: 'DancingScript-Bold';
`;

interface Props {
    label : number;    
    onClick : () => void;
}

const index = ({label,onClick} : Props) => {
    return (
        <Container>
            <NumberButton onPressOut={onClick}>
                <Label>{label}</Label>
            </NumberButton>
        </Container>
    );
};

export default index;
