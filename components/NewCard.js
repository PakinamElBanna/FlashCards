import React, { Component } from 'react'
import { View, Text, TextInput,TouchableOpacity, Platform, StyleSheet, KeyboardAvoidingView } from 'react-native'
import TextButton from './TextButton'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { orange, white } from '../utils/colors'
import { addCard } from '../actions'
import { createCard } from '../utils/api'
import { receiveDecks } from '../actions'
import { NavigationActions } from 'react-navigation'


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
     this.setState(() => {
       question: e
     })
  }

  handleAnswerChange=(e)=> {
    this.setState(() => {
      answer: e
    })
  }

  const submit = () => {
    const key =  this.props.deck.title
    const card = this.state
    const {deck} = this.props

    createCard({key, card}).then((decks)=> this.props.dispatch(receiveDecks(decks)))

    this.setState({
      question: '',
      answer: '',
    })

    this.props.navigation.navigate(
             'DeckDetails',
              {deck: this.props.deck}
           )
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
    const { deck } = this.props
    return (
      <KeyboardAvoidingView behavior="padding" enabled style={{flex:1}}>
      <NewCardView>
        <Title>Add a New Card to <NewCardTitle>{deck.title}</NewCardTitle></Title>
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
    </KeyboardAvoidingView>
    )
  }
}

function mapStateToProps(state , {navigation}) {
  const {title} = navigation.state.params.deck
  const deck = state[title]
  return {
    deck
  }
}

export default connect(mapStateToProps)(NewCard)
