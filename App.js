import React from 'react';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { createBottomTabNavigator , createStackNavigator } from 'react-navigation'
import reducer from './reducers'
import { StyleSheet, Text, View, Platform, StatusBar } from 'react-native';
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import DeckList from './components/DeckList'
import DeckDetails from './components/DeckDetails'
import Card from './components/Card'
import NewDeck from './components/NewDeck'
import NewCard from './components/NewCard'
import QuizDetails from './components/QuizDetails'
import { black, white } from './utils/colors'

const Tabs = createBottomTabNavigator ({
  Home: {
    screen: DeckList,
    navigationOptions: {
      tabBarLabel: 'Decks',
      tabBarIcon: ({ tintColor }) => <Ionicons name='ios-albums' size={30} color={tintColor} />
    },
  },
  AddDeck: {
    screen: NewDeck,
    navigationOptions: {
      tabBarLabel: 'Add Deck',
      tabBarIcon: ({ tintColor }) => <Ionicons name='ios-add' size={30} color={tintColor} />
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
    Home: {
      screen: Tabs,
      },
      AddDeck: {
        screen: NewDeck,
        navigationOptions:{
          headerTintColor: white,
          headerStyle: {
            backgroundColor: black
        }
      },
      },
      DeckDetails: {
        screen: DeckDetails,
        navigationOptions:{
          headerTintColor: white,
          headerStyle: {
            backgroundColor: black
        }
      }
    },
    QuizDetails: {
      screen: QuizDetails,
      navigationOptions:{
        headerTintColor: white,
        headerStyle: {
          backgroundColor: black
      }
      }
    },
    NewCard: {
        screen: NewCard,
        navigationOptions:{
          headerTintColor: white,
          headerStyle: {
            backgroundColor: black
        }
      }
    },
    AddDeck: {
      screen: NewDeck,
      title:"TITLE",
      navigationOptions:{
        headerTintColor: white,
        headerStyle: {
          backgroundColor: black
      }
    }
    },
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
