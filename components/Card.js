import React from 'react'
import { View, Text } from 'react-native'
import TextButton from './TextButton'

const test = () => {
  console.log('Boo')
}

// TODO:  toggle between questoon and answer dependingon local state
const Deck = () =>
      <View>
        <Text>Random Question</Text>
        <TextButton style={{margin: 20}} onPress={test}>
        Answer</TextButton>
        <TextButton style={{margin: 20}} onPress={test}>
        correct</TextButton>
        <TextButton style={{margin: 20}} onPress={test}>
        incorrect</TextButton>
      </View>

export default Deck
