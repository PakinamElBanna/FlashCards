import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
import styled from 'styled-components'
import TextButton from './TextButton'
import { white, orange } from '../utils/colors'

const QuizView = styled.View`
  background: #fff;
  flex:1;
  padding: 20px;
  align-items: center;
`
const QuizAnswer = styled.Text`
  font-size: 16px;
  margin-bottom: 10px;
`
const QuizText = styled.Text`
  font-size: 18px;
  margin: 0 auto;
`
const AnswerView = styled.View`
  margin: 0 auto;
  align-items: center;
`
class QuizDetails extends Component {
  state={
    showAnswer:false,
    questionIndex: 0
  }
  render () {
    const viewAnswer = () => {
      this.setState({
        showAnswer: true
      })
    }

    const { deck } = this.props
    const { questionIndex } = this.state
    return (
      <QuizView>
      <QuizText>{deck.questions[questionIndex].question}</QuizText>
      <TextButton color={orange} style={{backgroundColor: 'transparent'}} onPress={viewAnswer}>
         Answer</TextButton>
      {this.state.showAnswer === true &&
        <AnswerView>
        <QuizAnswer>{deck.questions[questionIndex].answer}</QuizAnswer>
        <TextButton color={white}  style={{backgroundColor: 'green'}}>Correct</TextButton>
        <TextButton color={white}  style={{backgroundColor: 'red'}}>Incorrect</TextButton>
        </AnswerView>
      }
      </QuizView>
    )
  }
}

function mapStateToProps (state, {navigation}) {
  const { deck } = navigation.state.params
  return {
    deck
  }
}

export default connect(mapStateToProps)(QuizDetails)
