import React, {useState, useRef, useEffect, useContext} from 'react';
import Styled from 'styled-components/native';
import {
  ListItem,
  Text,
  Left,
  Right,
  Card,
  CardItem,
  Button,
  Icon,
  Grid,
  Input,
  Col,
} from 'native-base';
import {
  TouchableOpacity,
  Animated,
  LayoutAnimation,
  Platform,
  UIManager,
  Alert,
  Linking,
} from 'react-native';
import Clipboard, {useClipboard} from '@react-native-community/clipboard';
import {UserDataContext} from '~/Context/UserData';

const Container = Styled.View``;

const CustomRight = Styled.View`
  
`;

interface Props {
  title: string;
  url: string;
  urlId: string;
  urlPassword: string;
  deleteData: (title: string) => void;
  goUpdateData: () => void;
}

const index = ({
  title,
  url,
  urlId,
  urlPassword,
  deleteData,
  goUpdateData,
}: Props) => {
  const {updateData} = useContext<UserData>(UserDataContext);

  const rotateAni = useRef(new Animated.Value(0));
  const [rotateState, setRotateState] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [isShowPassword, setIsShowPassword] = useState(false);

  const [_url, setUrl] = useState<string>('');
  const [_urlId, setUrlId] = useState<string>('');
  const [_urlPassword, setUrlPassword] = useState<string>('');

  const [idClipboard, setIdClipboard] = useClipboard();

  const writeToClipboard = async (type: string) => {
    if (type === 'password') {
      Clipboard.setString(urlPassword);
      Alert.alert('Copied the password to the clipboard');
    } else {
      Clipboard.setString(urlId);
      Alert.alert('Copied the ID to the clipboard');
    }
  };

  const rotate = rotateAni.current.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '-90deg'],
  });

  if (
    Platform.OS === 'android' &&
    UIManager.setLayoutAnimationEnabledExperimental
  ) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  const onRotateClick = () => {
    Animated.timing(rotateAni.current, {
      toValue: rotateState ? 0 : 1,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      rotateState ? setRotateState(false) : setRotateState(true);
    });
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    expanded ? setExpanded(false) : setExpanded(true);
  };

  const showPassword = () => {
    if (isShowPassword) {
      setIsShowPassword(false);
    } else {
      setIsShowPassword(true);
    }
  };

  useEffect(() => {
    setUrl(url);
    setUrlId(urlId);
    setUrlPassword(urlPassword);
  }, []);

  return (
    <Container>
      <ListItem>
        <Left>
          <TouchableOpacity onPress={onRotateClick}>
            <Text>{title}</Text>
          </TouchableOpacity>
        </Left>
        <Right>
          <TouchableOpacity onPress={onRotateClick}>
            <Animated.Image
              style={{transform: [{rotate}]}}
              source={require('~/Assets/Images/Icon/left_chevron2x.png')}
            />
          </TouchableOpacity>
        </Right>
      </ListItem>
      {expanded && (
        <Card>
          <CardItem>
            <Left>
              <Text>URL</Text>
            </Left>

            {isUpdate ? (
              <Right>
                <Input value={_url} onChangeText={setUrl} />
              </Right>
            ) : (
              <Grid>
                <Col style={{flexDirection: 'row-reverse'}}>
                  <TouchableOpacity
                    onPress={() => {
                      // 포함이 되면
                      if (url.indexOf('http://') !== -1) {
                        Linking.openURL(url).catch(err => {
                          console.log(err);
                        });
                      } else {
                        // 포함이 안되면
                        Linking.openURL('http://' + url).catch(err => {
                          console.log(err);
                        });
                      }
                    }}>
                    <Icon name="globe" />
                  </TouchableOpacity>
                  <Text style={{marginRight: 10}}>{url}</Text>
                </Col>
              </Grid>
            )}
          </CardItem>
          <CardItem>
            <Left>
              <Text>ID</Text>
            </Left>

            {isUpdate ? (
              <Right>
                <Input value={_urlId} onChangeText={setUrlId} />
              </Right>
            ) : (
              <Grid>
                <Col style={{flexDirection: 'row-reverse'}}>
                  <TouchableOpacity
                    onPress={() => {
                      writeToClipboard('id');
                    }}>
                    <Icon name="cut" />
                  </TouchableOpacity>
                  <Text style={{marginRight: 10}}>{urlId}</Text>
                </Col>
              </Grid>
            )}
          </CardItem>
          <CardItem>
            <Left>
              <Text>PW</Text>
            </Left>

            {isUpdate ? (
              <Right>
                <Input value={_urlPassword} onChangeText={setUrlPassword} />
              </Right>
            ) : (
              <Grid>
                <Col style={{flexDirection: 'row-reverse'}}>
                  <TouchableOpacity
                    onPress={() => {
                      writeToClipboard('password');
                    }}>
                    <Icon name="cut" />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={showPassword}>
                    {isShowPassword ? (
                      <Icon name="glasses-outline" />
                    ) : (
                      <Icon name="glasses" />
                    )}
                  </TouchableOpacity>
                  {isShowPassword ? (
                    <Text style={{marginRight: 10}}>{urlPassword}</Text>
                  ) : (
                    <Text style={{marginRight: 10}}>*********</Text>
                  )}
                </Col>
              </Grid>
            )}
          </CardItem>

          <CardItem style={{alignSelf: 'flex-end'}}>
            <Button
              style={{backgroundColor: '#f54444', marginRight: 10}}
              small
              onPress={() => {
                Alert.alert('삭제하시겠습니까?', title + '이(가) 삭제됩니다.', [
                  {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                  },
                  {
                    text: 'OK',
                    onPress: () => {
                      deleteData(title);
                      //onRotateClick();
                    },
                  },
                ]);
              }}>
              <Icon active name="trash" />
            </Button>
            <Button
              style={{backgroundColor: '#3c4deb'}}
              small
              onPress={() => {
                if (isUpdate) {
                  updateData(title, _url, _urlId, _urlPassword);
                }
                setIsUpdate(isUpdate ? false : true);
              }}>
              {isUpdate ? (
                <Icon active name="checkmark" />
              ) : (
                <Icon active name="pencil" />
              )}
            </Button>
          </CardItem>
        </Card>
      )}
    </Container>
  );
};

export default index;
