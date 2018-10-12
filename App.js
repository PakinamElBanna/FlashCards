import React from 'react';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { createBottomTabNavigator , createStackNavigator } from 'react-navigation'
import reducer from './reducers'
import { StyleSheet, Text, View, Platform } from 'react-native';
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import DeckList from './components/DeckList'
import DeckDetails from './components/DeckDetails'
import Card from './components/Card'
import NewDeck from './components/NewDeck'
import NewCard from './components/NewCard'
import { black, white } from './utils/colors'

const Tabs = createBottomTabNavigator ({
  DeckList: {
    screen: DeckList,
    navigationOptions: {
      tabBarLabel: 'Home',
      tabBarIcon: ({ tintColor }) => <Ionicons name='ios-home' size={30} color={tintColor} />
    },
  },
}, {
  navigationOptions: {
    header: null
  },
  tabBarOptions: {
    activeTintColor: Platform.OS === 'ios' ? black : white,
    style: {
      height: 56,
      backgroundColor: Platform.OS === 'ios' ? white : black,
      shadowColor: 'rgba(0, 0, 0, 0.24)',
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1
    }
  }
})

const MainNavigator = createStackNavigator({
    DeckList: {
      screen: Tabs,
      },
      Deck: {
        screen: DeckDetails,
        navigationOptions:{
          headerTintColor: white,
          headerStyle: {
            backgroundColor: black
        }
      }
    }
})

export default class App extends React.Component {
  render() {
    return (
    <Provider store={createStore(reducer)}>
      <View style={{flex: 1}}>
        <MainNavigator />
      </View>
    </Provider>
    );
  }
}
