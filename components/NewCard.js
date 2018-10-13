import React, { Component } from 'react'
import { View, Text, TextInput,TouchableOpacity, Platform, StyleSheet } from 'react-native'
import TextButton from './TextButton'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { orange, white } from '../utils/colors'
import { addCard } from '../actions'

class NewCard extends Component {
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

  handleAnswerChange=(event)=> {
    const answer = event.nativeEvent.text
    this.setState({
      answer
    })
  }

  submit = () =>{
    console.log(this.state)
    // this.props.dispatch(addCard(this.state, this.props.deckId))
  }

    const deckTitle = this.props.navigation.state.params.deck.title
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
        <Title>Add a New Card to <NewCardTitle>{deckTitle}</NewCardTitle></Title>
        <QuizTextInput
          placeholder="Question"
          onTextChange={this.handleQuestionChange}

        />
      <QuizTextInput
          placeholder="Answer"
          onChange={handleAnswerChange}
        />
        <TouchableOpacity
          style={{backgroundColor: orange}}
          onPress={submit}>
            <Text style={{color: white}}>SUBMIT</Text>
        </TouchableOpacity>
    </NewCardView>
    )
  }
}

function mapStateToProps(state , {navigation}) {
  const deckTitle = navigation.state.params.deck.title
  return {
    deckTitle
  }
}



export default connect(mapStateToProps)(NewCard)
