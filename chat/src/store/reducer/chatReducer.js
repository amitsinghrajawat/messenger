import {ACTIVE_USER, ALL_USERS} from '../actions/types';

const initTialState = {
  activeUser: null,
  users: [],
};

export default (state = initTialState, {type, payload}) => {
  switch (type) {
    case ACTIVE_USER:
      // console.log(payload);
      return {
        ...state,
        activeUser: payload,
      };
    case ALL_USERS:
      return {
        ...state,
        users: payload,
      };
    default:
      return state;
  }
};
