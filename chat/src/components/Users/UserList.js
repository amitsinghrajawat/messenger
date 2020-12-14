import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {Image, TouchableWithoutFeedback} from 'react-native';
import {useDispatch} from 'react-redux';
import {Bot} from '../../images';
import {logout} from '../../store/actions/authActions';
import {ChatUserList} from '../../store/actions/chatActions';
import {Box, Text} from '../theme';
import TopStatus from './TopSearch/TopStatus';
import User from './User';
import UserHeader from './UserHeader';

const UserList = () => {
  const dispatch = useDispatch();
  const {navigate} = useNavigation();

  const onLogout = () => {
    dispatch(logout());
    navigate('Auth');
  };

  useEffect(() => {
    dispatch(ChatUserList());
  }, []);

  return (
    <Box backgroundColor="white" position="relative" flex={1}>
      <UserHeader back={true} />
      <TopStatus />

      <Box marginTop="s" flex={1} backgroundColor="dgrey" padding="m">
        <Text fontFamily="Rubik-Bold" variant="title" color="primary">
          Chats
        </Text>
        <User />
      </Box>

      <TouchableWithoutFeedback onPress={onLogout}>
        <Box position="absolute" bottom={10} right={10}>
          <Image source={Bot} />
        </Box>
      </TouchableWithoutFeedback>
    </Box>
  );
};

export default UserList;
