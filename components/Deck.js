import React from 'react'
import { connect } from 'react-redux'
import { View, TouchableOpacity, Text } from 'react-native'
import TextButton from './TextButton'
import styled from 'styled-components'
import { black, white, orange } from '../utils/colors'

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

const Deck = ({deck, ...rest}) =>
<TouchableOpacity key={deck.title} {...rest}>
  <DeckView>
    <Title>{deck.title}</Title>
    <SubTitle>({Object.keys(deck.questions).length} cards)</SubTitle>
  </DeckView>
</TouchableOpacity>


export default Deck
