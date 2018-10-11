import React from 'react'
import { View, Text } from 'react-native'
import TextButton from './TextButton'

const test= (p) => {
  console.log(p)
}
const Deck = () =>
      <View>
        <Text>Deck name</Text>
        <Text>Deck size</Text>
        <TextButton style={{margin: 20}} onPress={() =>test('add')}>
        Add Card</TextButton>
        <TextButton style={{margin: 20}} onPress={() =>test('start')}>
        Start Quiz</TextButton>
      </View>

export default Deck
