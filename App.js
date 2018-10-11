import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import DeckList from './components/DeckList'
import Card from './components/Card'
import NewDeck from './components/NewDeck'
import NewCard from './components/NewCard'

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <DeckList/>
        <NewDeck/>
        <NewCard />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
