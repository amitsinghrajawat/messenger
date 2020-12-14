import React from 'react';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';

//** user component */
import UserList from './UserList';
import UserChats from './UserChats';
import Message from './Messages/Message';

export type UserRoutes = {
  UserList: undefined;
  UserChats: undefined;
  Message: undefined;
};

export const UserStack = createSharedElementStackNavigator<UserRoutes>();

export const UserNavigator = () => (
  <UserStack.Navigator initialRouteName="UserList">
    <UserStack.Screen
      name="UserList"
      options={{
        headerShown: false,
      }}
      component={UserList}
    />

    <UserStack.Screen
      name="UserChats"
      options={{
        headerShown: false,
      }}
      component={UserChats}
    />

    <UserStack.Screen
      name="Message"
      options={{
        headerShown: false,
      }}
      component={Message}
    />
  </UserStack.Navigator>
);
