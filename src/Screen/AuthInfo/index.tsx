import React, {useContext} from 'react';
import { Container, Text, Icon ,Content,Header, Left,ListItem,Button , Body,Right,Switch} from 'native-base';
import {TouchableOpacity, Alert} from 'react-native';

import {AuthContext} from '~/Context/Auth';


const AuthInfo = () => {
    const {delPinNumber} = useContext<IPinumber>(AuthContext);

    const resetPin = () => {
        Alert.alert('PIN 번호를 초기화 하시겠습니까? ', '확인 시 PIN 번호가 초기화됩니다', [
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {
              text: 'OK',
              onPress: () => {
                delPinNumber();                
              },
            },
          ]);
    }

    return (
        <Container>
            <Header>
                <Left>
                    <Text>Setting</Text>
                </Left>
            </Header>
            <Content>
                <ListItem itemDivider />
                <ListItem icon>
                    <Left>
                        <Button style={{ backgroundColor: "#007AFF" }}>
                            <Icon name='ios-information-circle-outline' />
                        </Button>
                    </Left>
                    <Body>
                        <Text>Reset Password</Text>
                    </Body>
                    <Right>
                        <TouchableOpacity onPress={resetPin}>
                            <Text>Reset</Text>
                        </TouchableOpacity>
                    </Right>
                </ListItem>
            </Content>
        </Container>
    );
};

export default AuthInfo;