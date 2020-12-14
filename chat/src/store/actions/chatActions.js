import IO from 'socket.io-client';
import AsyncStorage from '@react-native-community/async-storage';
import {uuidv4} from '../../Utils';
import {ACTIVE_USER, ALL_USERS, API_URI} from './types';
import {Use} from 'react-native-svg';

//** socket config */
export const socket = IO(`${API_URI}`, {
  forceNew: true,
});

socket.on('connection', () => console.log('Connected'));

export const LoadMessages = () => async (dispatch) => {};
export const ChatUserList = () => async (dispatch, getState) => {
  const {user} = getState().auth;

  const uniqueChat = JSON.parse(await AsyncStorage.getItem('@unique_Chat'));
  const uniqueRoomChat = JSON.parse(
    await AsyncStorage.getItem('@unique_RoomChat'),
  );

  if (!uniqueChat) {
    AsyncStorage.setItem('@unique_Chat', JSON.stringify([]));
  }

  if (!uniqueRoomChat) {
    AsyncStorage.setItem('@unique_RoomChat', JSON.stringify([]));
  }

  //** Set active users */
  dispatch({type: ACTIVE_USER, payload: user.email});

  //** Emit get Users */
  socket.emit('getUsers');

  /** Get all users */
  socket.on('getAllUsers', (users) => {
    const allUsers = users
      .filter(({email}) => email !== user.email)
      .map(({email, name, _id}) => ({
        _id,
        email,
        name,
        time: '1:00',
        msg: 'last msg',
      }));
    // console.log(allUsers);
    dispatch({type: ALL_USERS, payload: allUsers});
  });
};
export const uniqueUserChat = ({_id, email, name}) => async (
  dispatch,
  getState,
) => {
  const {
    user: {email: senderEmail},
  } = getState().auth;

  const uniqueChatData = {
    senderEmail,
    receiverEmail: email,
    receiverName: name,
  };

  const uniqueChat = JSON.parse(await AsyncStorage.getItem('@unique_Chat'));

  if (uniqueChat.length > 0) {
    // console.log(uniqueChat);
    const User = uniqueChat.filter(
      ({receiverEmail}) => receiverEmail === email,
    );

    // console.log(User);
    if (User.length > 0) {
      const {receiverEmail, receiverName, receiverID} = User[0];
      dispatch(
        onUniqueChat({senderEmail, receiverEmail, receiverName, receiverID}),
      );
    } else {
      dispatch(onUniqueChat({...uniqueChatData, senderEmail}));
      uniqueChat.push(uniqueChatData);
      AsyncStorage.setItem('@unique_Chat', JSON.stringify(uniqueChat));
    }
  } else {
    uniqueChat.push(uniqueChatData);
    AsyncStorage.setItem('@unique_Chat', JSON.stringify(uniqueChat));
  }
};
export const onUniqueChat = ({
  senderEmail,
  receiverEmail,
  receiverID,
}) => async (dispatch, getState) => {
  // console.log(senderEmail);
  const uniqueRoomChat = JSON.parse(
    await AsyncStorage.getItem('@unique_RoomChat'),
  );
  socket.emit(
    'startUniqueChat',
    {receiverEmail, senderEmail, receiverID},
    (err) => {},
  );
};
export const sendMsg = () => async (dispatch) => {};
export const handleDispatchMsg = () => async (dispatch) => {};
export const LoadRoomMsgs = () => async (dispatch) => {};
export const clearActiveMsgs = () => async (dispatch) => {};
