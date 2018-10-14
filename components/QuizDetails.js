import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
import styled from 'styled-components'
import TextButton from './TextButton'
import {getDeck} from '../utils/api'
import { white, orange,black } from '../utils/colors'
import { NavigationActions } from 'react-navigation'

const QuizView = styled.View`
  background: #fff;
  flex:1;
  align-items: center;
`
const QuizAnswer = styled.Text`
  font-size: 14px;
  margin-bottom: 10px;
  color: black;
`
const QuizText = styled.Text`
  font-size: 16px;
  margin: 0 auto;
`
const AnswerView = styled.View`
  margin: 0 auto;
  align-items: center;
`
class QuizDetails extends Component {
  static navigationOptions = ({ navigation }) => {
  const { deck } = navigation.state.params
  return {
    title: 'Quiz'
  }
}
static getDerivedStateFromProps(props, state) {
  if (props.deck !== state.deck) {
    return {
      deck: props.deck
    }
  }
  return null;

}

  state={
    showAnswer:false,
    questionIndex: 0,
    correct: 0,
    incorrect: 0,
    questionsAnswered: 0,
    showScore: false,
    deck: {}
  }

  componentDidMount() {
    const id = this.props.deck.title
    getDeck(id).then((deck)=>{
      this.setState(()=>{
        deck
      })
    })
  }

  render () {
    const viewAnswer = () => {
      this.setState({
        showAnswer: true
      })
    }

    const markAsCorrect = () => {
      if(Object.keys(this.state.deck.questions).length > this.state.questionsAnswered) {
        this.setState(prevState =>
            ({correct: prevState.correct + 1,
            questionsAnswered: prevState.questionsAnswered+1,
            questionIndex: prevState.questionIndex + 1,
            showAnswer:false
          }))
      } else {
        this.setState(prevState => (
          {
            questionIndex: prevState.questionIndex,
            showScore:true
          }
        ))
      }
    }

    const markAsIncorrect = () => {
      if(Object.keys(this.state.deck.questions).length > this.state.questionsAnswered) {
        this.setState(prevState =>
            ({incorrect: prevState.incorrect + 1,
            questionsAnswered: prevState.questionsAnswered+1,
            questionIndex: prevState.questionIndex + 1,
            showAnswer:false
          }))
      } else {
        this.setState(prevState => (
          {
            questionIndex: prevState.questionIndex,
            showScore:true
          }
        ))
      }
      this.props.navigation.setParams({title: this.state.questionsAnswered})
    }

    const restartQuiz = () => {
      this.setState({
        showAnswer:false,
        questionIndex: 0,
        correct: 0,
        incorrect: 0,
        questionsAnswered: 0,
        showScore: false,
      })
    }

  const goBack =  () => this.props.navigation.dispatch(NavigationActions.back())

    const displayQuiz =()=>{
      if(questionsAnswered !== Object.keys(this.state.deck.questions).length){
        return <QuizView>
        <QuizText>{deck.questions[questionIndex].question}</QuizText>
        <TextButton color={orange} style={{backgroundColor: 'transparent'}} onPress={viewAnswer}>
           Answer</TextButton>
        {this.state.showAnswer === true &&
          <AnswerView>
          <QuizAnswer>{deck.questions[questionIndex].answer}</QuizAnswer>
        <View>
        <TextButton color={white}  style={{backgroundColor: 'green'}}  onPress={markAsCorrect}>Correct</TextButton>
        <TextButton color={white}  style={{backgroundColor: 'red'}}  onPress={markAsIncorrect}>Incorrect</TextButton>
      </View>
      </AnswerView>
    }
    </QuizView>

    }else {
      return <QuizView>
        <QuizText>Correct Answers: {(this.state.correct / this.state.deck.questions.length) * 100}%</QuizText>
        <AnswerView>
          <TextButton color={white}  style={{backgroundColor: orange}}  onPress={restartQuiz}>Start Over</TextButton>
          <TextButton color={white}  style={{backgroundColor: black}}  onPress={goBack}>Back</TextButton>
        </AnswerView>
      </QuizView>
    }
    }
    const { questionIndex, questionsAnswered} = this.state
    const {deck}=this.state

    return (
        <View style={{flex:1, backgroundColor: white, padding: 20}}>
          <Text style={{padding: 10}}>{questionIndex}/{this.state.deck.questions.length}</Text>
          <QuizView>{displayQuiz()}</QuizView>
        </View>

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
