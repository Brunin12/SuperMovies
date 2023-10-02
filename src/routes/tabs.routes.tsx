
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import Home from '../screens/Home';
import { BookmarkSimple, House, MagnifyingGlass } from 'phosphor-react-native';
import Search from '../screens/Search';
import MyList from '../screens/MyList';
import Details from '../screens/Details';

const {Navigator, Screen } = createBottomTabNavigator();

function TabRoutes() {
  return (
    <Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: "#242a32",
          height: 78,
          alignItems: "center",
          borderTopWidth: 1,
          borderTopColor: "#0296e5",
        },
        headerShown: false,
        tabBarActiveTintColor: "#0296e5",
        tabBarInactiveTintColor: "#67686d",
        tabBarShowLabel: false,
      }}
    >
      <Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => (
            <House color="#FFF" size={30} weight="light" />
          ),
        }}
      />

      <Screen
        name="Details"
        component={Details}
        options={{
          tabBarButton: () => null
        }}
      />

      <Screen
        name="Favoritos"
        component={MyList}
        options={{
          tabBarIcon: ({ color }) => (
            <BookmarkSimple color="#FFF" size={30} weight="light" />
          ),
        }}
      />

      <Screen
        name="Pesquisa"
        component={Search}
        options={{
          tabBarIcon: ({ color }) => (
            <MagnifyingGlass color="#FFF" size={30} weight="light" />
          ),
        }}
      />
    </Navigator>
  );
}

export default TabRoutes;
