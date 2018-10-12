import React, {Component} from 'react'
import { connect } from 'react-redux'
import { View, TouchableOpacity, Text } from 'react-native'
import TextButton from './TextButton'
import styled from 'styled-components'
import { black, white, orange } from '../utils/colors'
import Deck from './Deck'

const DeckDetailsView = styled.View`
margin: 0px auto;
display: flex;
align-items: center;
width: 100%;
margin: 0 auto;
background: white;
padding: 10px;
flex:1;`

class DeckDetails extends Component{
  render() {
    return (
      <DeckDetailsView>
      <Deck />
      <TextButton style={{backgroundColor: black}} onPress={() =>test('add')}>
        Add Card</TextButton>
      <TextButton style={{backgroundColor: orange}} onPress={() =>test('start')}>
        Start Quiz</TextButton>
      </DeckDetailsView>
    )
  }
}

export default DeckDetails
