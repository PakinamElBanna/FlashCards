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
    const viewQuiz = () => {
      this.props.navigation.navigate(
        'QuizDetails',
        {deck: this.props.deck}
      )
    }
    const addCard = () => {
      this.props.navigation.navigate(
        'NewCard',
        {deck: this.props.deck}
      )
    }
    const { deck, deckId } = this.props
    return (
      <DeckDetailsView>
      <Deck title={deck.title} size={deck.questions.length}/>
      <TextButton color={white} style={{backgroundColor: black}} onPress={addCard}>
        Add Card</TextButton>
      <TextButton color={white} style={{backgroundColor: orange}} onPress={viewQuiz}>
        Start Quiz</TextButton>
      </DeckDetailsView>
    )
  }
}

function mapStateToProps (state, {navigation}) {
  const { deckId } = navigation.state.params
  return {
    deckId,
    deck: state[deckId]
  }
}

export default connect(mapStateToProps)(DeckDetails)
