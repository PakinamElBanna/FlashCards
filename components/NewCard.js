import React, { Component } from 'react'
import { View, Text, TextInput,TouchableOpacity, Platform, StyleSheet } from 'react-native'
import TextButton from './TextButton'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { orange, white } from '../utils/colors'
import { addCard } from '../actions'
import { createCard } from '../utils/api'
import { NavigationActions } from 'react-navigation'
import {receiveDecks} from '../actions'


class NewCard extends Component {
  static navigationOptions = ({ navigation }) => {
  return {
    title: 'Add Card'
  }
}
  state = {
    question: '',
    answer: ''
  }

  render () {

   handleQuestionChange=(e)=> {
     this.setState({
       question: e
     })
  }

  handleAnswerChange=(e)=> {
    this.setState({
      answer: e
    })
  }

  const submit = () => {
    const key =  this.props.deckTitle
    const card = this.state

    this.props.dispatch(addCard(key,card))

    this.setState({
      question: '',
      answer: '',
    })

    this.props.navigation.navigate(
             'DeckDetails',
             {deckId: key}
           )

   createCard({key, card})
  }

    const NewCardView = styled.View`
      flex: 1;
      background: white;
      align-items: center;
      padding: 10px;
    `
    const Title= styled.Text`
      font-size: 16px;
      margin-bottom: 10px;
    `
    const NewCardTitle = styled.Text`
      color: orange;
    `
    const QuizTextInput = styled.TextInput`
      margin: 10px;
      line-height: 20px;
      border: 0;
      width: 90%;
      padding: 5px;
    `
    // const { deck } = this.props
    return (
      <NewCardView>
        <Title>Add a New Card to <NewCardTitle>{this.props.deckTitle}</NewCardTitle></Title>
        <QuizTextInput
          placeholder="Question"
          onChangeText={(question) => this.setState({question})}
          value={this.state.question}

        />
      <QuizTextInput
          placeholder="Answer"
          onChangeText={(answer) => this.setState({answer})}
          value={this.state.answer}
        />
      <TextButton color={white} style={{marginTop: 20, backgroundColor: orange}} onPress={() => submit()}>
          Submit</TextButton>
    </NewCardView>
    )
  }
}

function mapStateToProps(state , {navigation}) {

  const deckTitle = navigation.state.params.deck.title
  const decks = state
  return {
    decks,
    deckTitle
  }
}



export default connect(mapStateToProps)(NewCard)
