import React, { useState} from 'react';
import Styled from 'styled-components/native';
import { View, Button, Icon, Fab } from 'native-base';

const Container = Styled.View`
`;

interface Props {  
  goPage : () => void;
  iconName : string ;
}

const FabFloatingButton = ({goPage,iconName} : Props) => {
    const [floatingState, setFloatingState] = useState(false);
    return (
        <View>
          <Fab
            active={floatingState}
            direction="right"
            containerStyle={{ }}
            style={{ backgroundColor: '#5067FF' }}
            position="bottomLeft"
            onPress={goPage}>
            <Icon name={iconName} />
            {/*
            onPress={() => floatingState ? setFloatingState(false) : setFloatingState(true)}>
            <Icon name="add-outline" />
            <Button style={{ backgroundColor: '#34A34F' }} onPress={goRegist}>
              <Icon name="add-outline" />
            </Button>
            <Button style={{ backgroundColor: '#3B5998' }} onPress={goMain}>
              <Icon name="logo-facebook" />
            </Button>*/}
          </Fab>
        </View>
    );
};

export default FabFloatingButton;


