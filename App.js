import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './Home';
import AddBook from './AddBook';
import EditBook from './EditBook';

const Stack = createStackNavigator();

const App = () => {
  return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="AddBook" component={AddBook} />
          <Stack.Screen name="EditBook" component={EditBook} />
        </Stack.Navigator>
      </NavigationContainer>
  );
};

export default App;

