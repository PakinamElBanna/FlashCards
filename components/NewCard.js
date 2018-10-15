import React, { Component } from 'react'
import { View, Text, TextInput,TouchableOpacity, Platform, StyleSheet, KeyboardAvoidingView, ScrollView } from 'react-native'
import TextButton from './TextButton'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { orange, white } from '../utils/colors'
import { addCard } from '../actions'
import { createCard, getDeck } from '../utils/api'
import { receiveDecks } from '../actions'
import { NavigationActions } from 'react-navigation'


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

class NewCard extends Component {

  state = {
      deck: null,
      question: '',
      answer: ''
  }

  static navigationOptions = ({ navigation }) => {
  return {
    title: 'Add Card'
  }
}

static getDerivedStateFromProps(props, state) {
  if (props.deck !== state.deck) {
    const { deck } = props
    return {
      deck
    }
  }
  return null;
}

componentDidMount() {
  const id = this.props.deck.title
  getDeck(id).then((deck)=>{
    this.setState(()=>{
      deck
    })
  })
}

  handleQuestion = (e) => {
    const question = e.nativeEvent.text
    this.setState(() => {
      question
    })
  }


  submit = () => {
    const key =  this.props.deck.title
    const card = { question: this.state.question, answer: this.state.answer}
    const { deck } = this.props

    createCard({key, card}).then((decks)=> this.props.dispatch(receiveDecks(decks)))

    this.setState({
      question: '',
      answer: '',
    })

    this.props.navigation.navigate(
             'DeckDetails',
              { deck }
           )
  }

  render () {
    const { title } = this.state.deck

    return (
      <ScrollView>
      <KeyboardAvoidingView behavior="padding" enabled style={{flex:1}}>
      <NewCardView>
        <Title>Add a New Card to <NewCardTitle>{title}</NewCardTitle></Title>
        <QuizTextInput
          autoFocus
          placeholder="Question"
          onChangeText={(question) => this.setState({question})}
          value={this.state.question}

        />
      <QuizTextInput
          placeholder="Answer"
          onChangeText={(answer) => this.setState({answer})}
          value={this.state.answer}
        />
      <TextButton color={white} style={{marginTop: 20, backgroundColor: orange}} onPress={() => this.submit()}>
          Submit</TextButton>
    </NewCardView>
    </KeyboardAvoidingView>
    </ScrollView>
    )
  }
}

function mapStateToProps(state , {navigation}) {
  const title = navigation.state.params.deck.title
  const deck = state[title]
  return {
    deck
  }
}

export default connect(mapStateToProps)(NewCard)
