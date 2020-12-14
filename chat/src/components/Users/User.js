import {useNavigation} from '@react-navigation/native';
import {FlatList, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {Spinner} from 'native-base';
import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import theme, {Box, Text} from '../theme';
import {Right, user} from '../../images';
import {clearActiveMsgs} from '../../store/actions/chatActions';

function UserList({_id, name, msg, time, email}) {
  return (
    <Box
      flexDirection="row"
      marginBottom="s"
      backgroundColor="dgrey"
      alignItems="center">
      <Box
        paddingVertical="s"
        marginRight="m"
        justifyContent="center"
        position="relative"
        height={52}
        width={52}
        alignItems="center">
        <Image
          source={user}
          style={{...StyleSheet.absoluteFillObject, height: 50, width: 50}}
          resizeMode="contain"
        />
      </Box>
      <Box
        flexDirection="column"
        justifyContent="space-between"
        paddingVertical="m">
        <Text
          variant="title"
          color="black"
          fontSize={19}
          textTransform="capitalize">
          {name}
        </Text>
        <Text>{msg}</Text>
      </Box>
      <Box
        marginLeft="l"
        flexDirection="column"
        alignItems="center"
        justifyContent="space-between"
        paddingVertical="m"
        flex={1}
        paddingLeft="m"
        position="absolute"
        right={10}>
        <Image source={Right} style={{marginBottom: 10}} />
        <Text variant="smtitle" fontSize={12}>
          {time}
        </Text>
      </Box>
    </Box>
  );
}

const User = () => {
  const dispatch = useDispatch();
  const {navigate} = useNavigation();
  const [loadUsers, setLoadUsers] = useState(false);
  const {users} = useSelector((state) => state.chat);

  useEffect(() => {
    setTimeout(() => {
      setLoadUsers(true);
    }, 1200);
  }, []);

  // const users = [
  //   {
  //     _id: 1,
  //     name: 'Amit Singh Rajawat',
  //     msg: ' Hi',
  //     time: '11:07',
  //     email: 'amitsingh@gmail.com',
  //   },
  //   {
  //     _id: 2,
  //     name: 'Aman Singh Rajawat',
  //     msg: ' Hello',
  //     time: '10:23',
  //     email: 'amansingh@gmail.com',
  //   },
  //   {
  //     _id: 3,
  //     name: 'Nikhil Singh Rajawat',
  //     msg: ' okay',
  //     time: '10:50',
  //     email: 'nikhilsingh@gmail.com',
  //   },
  //   {
  //     _id: 4,
  //     name: 'Aryan Singh Rajawat',
  //     msg: ' now',
  //     time: '08:14',
  //     email: 'aryansingh@gmail.com',
  //   },
  //   {
  //     _id: 5,
  //     name: 'Aniket Mishra',
  //     msg: ' fine',
  //     time: '05:54',
  //     email: 'aniketmishra@gmail.com',
  //   },
  //   {
  //     _id: 6,
  //     name: 'Sanskar Awasthi ',
  //     msg: ' go',
  //     time: '03:43',
  //     email: 'sanskarawasthi@gmail.com',
  //   },
  //   {
  //     _id: 7,
  //     name: 'Amit Singh',
  //     msg: ' am good',
  //     time: '01:23',
  //     email: 'amitsingh@gmail.com',
  //   },
  // ];

  return (
    <Box marginTop="l" flex={1}>
      {loadUsers ? (
        <>
          {users.length > 0 ? (
            <FlatList
              contentContainerStyle={{
                justifyContent: 'center',
                flexDirection: 'column',
              }}
              showsVerticalScrollIndicator={false}
              data={users}
              numColumns={1}
              renderItem={({item: {_id, name, msg, time, email}}) => {
                return (
                  <>
                    <TouchableOpacity
                      onPress={() => {
                        dispatch(clearActiveMsgs());
                        navigate('Message', {_id, name, email});
                      }}>
                      <UserList {...{_id, name, msg, time, email}} />
                    </TouchableOpacity>
                  </>
                );
              }}
              keyExtractor={({_id}) => _id.toString()}
            />
          ) : (
            <Box flex={1} justifyContent="center" alignItems="center">
              <Text variant="title" color="black">
                No Contacts yet
              </Text>
            </Box>
          )}
        </>
      ) : (
        <Spinner color={theme.colors.primary} />
      )}
    </Box>
  );
};

export default User;
