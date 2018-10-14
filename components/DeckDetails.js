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
  static navigationOptions = ({ navigation }) => {
  const { deckId } = navigation.state.params
  return {
    title: deckId
  }
}

  render() {
    const { deck, deckId } = this.props

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
    const emptyDeck = (size) => {
      return size < 1
    }

    return (
      <DeckDetailsView>
      <Deck title={deck.title} size={deck.questions.length}/>
      <TextButton color={white} style={{backgroundColor: black}} onPress={addCard}>
        Add Card</TextButton>
      <TextButton disabled={emptyDeck(deck.questions.length)} color={white} style={!emptyDeck(deck.questions.length)? {backgroundColor: orange} : {backgroundColor: orange,opacity: 0.5}} onPress={viewQuiz}>
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
