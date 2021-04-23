import React,{useState, useContext} from 'react';
import { Container, Header, Content, Form, Item, Input, Label ,Button, Right, Icon,Title, Body ,Left, Text,Toast} from 'native-base';
import {StackNavigationProp} from '@react-navigation/stack';
import {Alert} from 'react-native';
import FabFloatingButton from '~/Components/Button/FabFloatingButton';
import { TouchableOpacity } from 'react-native-gesture-handler';

import {UserDataContext} from '~/Context/UserData';

type NavigationProp = StackNavigationProp<MainNaviParamList,'UpdateData'>;

interface Props {
    navigation : NavigationProp;
}
const UpdateData = ({navigation} : Props) => {
    const {saveData,userData} = useContext<UserData>(UserDataContext);

    const [title, setTitle] = useState<string>('');
    const [url, setUrl] = useState<string>('');
    const [urlId, setUrlId] = useState<string>('');
    const [urlPassword, setUrlPassword] = useState<string>('');

    const goMain = () => {
        navigation.navigate('ListView');
    }

    const onSave = async () => {
        if(title === '' || url === '' || urlId ==='' || urlPassword ===''){
            Alert.alert('인풋을 채워야해');
            return;
        }
        await saveData(title,url,urlId,urlPassword);
        Alert.alert('등록이 완료되었습니다');
    }

    return (
        <Container>
            <Header>
                <Left>
                    <TouchableOpacity>
                        <Button transparent onPress={goMain}>
                        <Icon name='arrow-back' />
                        </Button>
                    </TouchableOpacity>
                </Left>
                <Body>
                    <Title>Update Data</Title>
                </Body>
                <Right>
                    <TouchableOpacity>
                        <Button transparent onPress={onSave}>
                        <Text>SAVE</Text>
                        </Button>
                    </TouchableOpacity>
                </Right>
            </Header>
        <Content>
            <Form>
                <Item floatingLabel>
                    <Label>Title</Label>
                    <Input onChangeText={setTitle} />
                </Item>
                <Item floatingLabel>
                    <Label>URL</Label>
                    <Input onChangeText={setUrl} />
                </Item>
                <Item floatingLabel>
                    <Label>ID</Label>
                    <Input onChangeText={setUrlId} />
                </Item>
                <Item floatingLabel last>
                    <Label>PW</Label>
                    <Input onChangeText={setUrlPassword} />
                </Item>
            </Form>
        </Content>
        <FabFloatingButton 
                goPage={goMain}
                iconName="arrow-undo-outline"
            />  
      </Container>
    );
};

export default UpdateData;