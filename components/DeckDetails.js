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
  state = {
    deck: null
  }

  static navigationOptions = ({ navigation }) => {
  const { deck } = navigation.state.params
  return {
    title: deck.title
  }
}

// static getDerivedStateFromProps(props, state) {
//   if (props.deck !== state.deck) {
//     return {
//       deck: props.deck
//     }
//   }
//   return null;
//
// }

  render() {
    const { deckId } = this.props
    const viewQuiz = () => {
      const deck = this.props.deck
      this.props.navigation.navigate(
        'QuizDetails',
        {deck}
      )
    }
    const addCard = () => {
      const deck = this.props.deck
      this.props.navigation.navigate(
        'NewCard',
          {deck}
      )
    }
    const emptyDeck = (size) => {
      return size < 1
    }

    return (
      <DeckDetailsView>
      <Deck deck={this.props.deck}/>
      <TextButton color={white} style={{backgroundColor: black}} onPress={addCard}>
        Add Card</TextButton>
      <TextButton disabled={emptyDeck(this.props.deck.questions.length)} color={white} style={!emptyDeck(this.props.size)? {backgroundColor: orange} : {backgroundColor: orange,opacity: 0.5}} onPress={viewQuiz}>
        Start Quiz</TextButton>
      </DeckDetailsView>
    )
  }
}

function mapStateToProps (state, {navigation}) {
  const deckId  = navigation.state.params.deck.title
  const deck = state[deckId]
  const size = Object.keys(deck.questions).length
  return {
    deck,
    size
  }
}

export default connect(mapStateToProps)(DeckDetails)
