import React from 'react'
import { connect } from 'react-redux'
import { View, TouchableOpacity, Text } from 'react-native'
import TextButton from './TextButton'
import styled from 'styled-components'
import { black, white, orange } from '../utils/colors'

const test= (p) => {
  console.log(p)
}

const DeckView = styled.View`
  margin: 0px auto;
  display: flex;
  align-items: center;
  width: 90%;
  margin: 5px auto;
  border-radius: 5px;
  background: white;
  padding: 10px;
`

const Title = styled.Text`
  font-size: 16px;
`

const SubTitle = styled.Text`
  font-size: 12px;
  margin-bottom: 10px;
`

const Deck = ({id, title, size, viewDeck}) =>

<TouchableOpacity onPress={() => viewDeck(id)}>
  <DeckView>
    <Title>{title}</Title>
    <Title>{id}</Title>
    <SubTitle>({size} cards)</SubTitle>
  </DeckView>
</TouchableOpacity>


export default Deck
