import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
import styled from 'styled-components'
import TextButton from './TextButton'
import {getDeck} from '../utils/api'
import { white, orange,black } from '../utils/colors'
import { Title, Container } from '../utils/styles'
import { NavigationActions } from 'react-navigation'
import { clearLocalNotification, setLocalNotification } from '../utils/_helpers'

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

  componentDidUpdate() {
    if(this.state.questionsAnswered === this.state.deck.questions.length) {
      clearLocalNotification()
      .then(setLocalNotification)
    }
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

    const displayQuiz = () => {
      if(questionsAnswered !== Object.keys(this.state.deck.questions).length){
        return <QuizView>
        <Title>{deck.questions[questionIndex].question}</Title>
        <TextButton color={orange} style={{backgroundColor: 'transparent'}} onPress={viewAnswer}>
           Answer</TextButton>
        {this.state.showAnswer === true &&
          <View style={{marginTop: 20, alignItems: 'center'}}>
          <Title style={{color: black}}>{deck.questions[questionIndex].answer}</Title>
        <View style={{marginTop: 10}}>
        <TextButton color={white}  style={{backgroundColor: '#3291a0'}}  onPress={markAsCorrect}>Correct</TextButton>
        <TextButton color={white}  style={{backgroundColor: orange}}  onPress={markAsIncorrect}>Incorrect</TextButton>
      </View>
    </View>
    }
    </QuizView>

    }else {
      return <QuizView>
        <Title>Correct Answers: {(this.state.correct / this.state.deck.questions.length) * 100}%</Title>
        <Container style={{alignItems: 'center'}}>
          <TextButton color={white}  style={{backgroundColor: orange}}  onPress={restartQuiz}>Start Over</TextButton>
          <TextButton color={white}  style={{backgroundColor: black}}  onPress={goBack}>Back</TextButton>
        </Container>
      </QuizView>
    }
    }
    const { questionIndex, questionsAnswered} = this.state
    const {deck}=this.state

    return (
        <View style={{flex:1, backgroundColor: white, padding: 20}}>
          <Text style={{paddingBottom: 10, color: orange, fontSize: 12}}>{questionIndex}/{this.state.deck.questions.length} answered</Text>
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
