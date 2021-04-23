import React,{useState,useRef, useEffect} from 'react';
import {Animated} from 'react-native';

import Styled from 'styled-components/native';


const Conatiner = Styled.View`
    flex : 1px;
`

const InfoContainer = Styled.View`
    border : solid 1px #131313;
    flex-direction : row;
    justify-content : space-between;
    margin : 10px;
`;


const ButtonConatainer = Styled.TouchableOpacity`  
    flex-direction : row;  
    margin : 10px;
    padding: 12px;
    border-radius: 10px;
`;

const ButtonText = Styled.Text`
  font-size: 16px;
  text-align: center;
  
`;

const DetailViewButton = Styled.Button`
    border : 5px;
`;

const TitleLabel = Styled.Text`
    
`;

const ButtonImage = Styled.Image`
`;


const ListView = () => {
    const rotateAni = useRef(new Animated.Value(0));
    const [rotateState,setRotateState] = useState(false);

    const rotate = rotateAni.current.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '-90deg'],
    });   

    const onRotateClick = () => {
        Animated.timing(rotateAni.current, {
            toValue : rotateState ? 0 : 1,
            duration : 600,
            useNativeDriver : true,
        },
        ).start(() => {
            rotateState ? setRotateState(false) : setRotateState(true);
        });                 
    }



    return (
        <Conatiner>
            <InfoContainer>
                <TitleLabel>라라라랄</TitleLabel>
                <ButtonConatainer onPress={onRotateClick} >
                    <Animated.Image style={{transform: [{rotate}]}}
                        source={require('~/Assets/Images/Icon/left_chevron2x.png')}                        
                    />
                </ButtonConatainer>
            </InfoContainer>
            
        </Conatiner>
    );
};

export default ListView;