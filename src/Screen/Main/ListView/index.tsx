import React,{useEffect, useState, useContext} from 'react';
import { Container, Content, Header, Item, Icon, Input, List, Fab,View  } from 'native-base';
import Styled from 'styled-components/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {TouchableOpacity} from 'react-native';

import FloatinButton from '~/Components/Button/FloatingButton';
import FabFloatingButton from '~/Components/Button/FabFloatingButton';

import ListItem from '~/Components/List/ListItem';
import {UserDataContext} from '~/Context/UserData';


import AsyncStorage from '@react-native-community/async-storage';

type NavigationProp = StackNavigationProp<MainNaviParamList,'ListView'>;

interface Props {
    navigation : NavigationProp;
}

const Main = ({navigation}: Props) => {
    const {userData, getData, deleteData, updateData} = useContext<UserData>(UserDataContext);

    const [arrayData, setArrayData] = useState<IPasswordData[] | undefined>(undefined);
    const [searchTxt, setSearchTxt] = useState<string>('');

     useEffect(() => {   
    },[userData]) 
       
    const onChangeArrayData = (e : string) =>{
        setSearchTxt(e);
    };

    const goRegist = () => {
        navigation.navigate('RegistData');
    }   

    const goUpdateData =() => {
        navigation.navigate('UpdateData');
    }

    return (
        <Container>
            <Header searchBar rounded>  
                <Item>
                    <Icon name="ios-search" />
                    {/* 밑에 방법이 더 효율적인거같음
                        <Input placeholder="Search" onChangeText={(e)=>{onChangeArrayData(e)}}/>
                    */}    
                    <Input placeholder="Search" onChangeText={setSearchTxt}/>
                </Item>
            </Header>
            <Content>
                <List>
                    {userData && 
                    userData
                    .sort((a,b) => a.title > b.title ? 1 : -1)
                    .filter(r => searchTxt !== '' ? r.title.indexOf(searchTxt) !== -1 : r.title !== searchTxt)                    
                    .map((e,i) => {
                        return (                            
                            <ListItem 
                                key ={i}
                                title={e.title}
                                url={e.url}
                                urlId={e.urlId}
                                urlPassword={e.urlPassword}
                                deleteData = {deleteData}
                                goUpdateData = {goUpdateData}
                            />)
                        })
                    }                     
                </List>
            </Content>  
            <FabFloatingButton 
                goPage={goRegist}
                iconName="add-outline"
            />            
        </Container>        
    );
};

export default Main;