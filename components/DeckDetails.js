import React, {Component} from 'react'
import { connect } from 'react-redux'
import { TouchableOpacity, Animated, View, StyleSheet } from 'react-native'
import TextButton from './TextButton'
import { black, white, orange } from '../utils/colors'
import { Container } from '../utils/styles'
import Deck from './Deck'
import { getDeck } from '../utils/api'

class DeckDetails extends Component{
  state = {
    deck: null,
    opacity: new Animated.Value(0)
  }

  static navigationOptions = ({ navigation }) => {
  const { title } = navigation.state.params.deck
  return {
    title: title
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

componentDidMount() {
  const { opacity } = this.state
  Animated.timing(opacity, {toValue: 1, duration: 1000}).start()
  const id = this.props.deck.title
  getDeck(id).then((deck)=>{
    this.setState(()=>{
      deck
    })
  })
}

  render() {
    const { deckId } = this.props
    const { deck, opacity } = this.state
    const viewQuiz = () => {
      this.props.navigation.navigate(
        'QuizDetails',
        {deck}
      )
    }
    const addCard = () => {
      this.props.navigation.navigate(
        'NewCard',
          {deck}
      )
    }
    const emptyDeck = (size) => {
      return size < 1
    }

    return (
      <Animated.View style={[styles.container,{ opacity}]}>
      <Deck deck={deck}/>
      <TextButton color={white} style={{backgroundColor: black}} onPress={addCard}>
        Add Card</TextButton>
      <TextButton disabled={emptyDeck(deck.questions.length)} color={white} style={!emptyDeck(deck.questions.length)? {backgroundColor: orange} : {backgroundColor: orange,opacity: 0.5}} onPress={viewQuiz}>
        Start Quiz</TextButton>
    </Animated.View>
    )
  }
}

function mapStateToProps (state, {navigation}) {
  const title = navigation.state.params.deck.title
  return {
    deck: state[title]
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 0,
    marginRight: 'auto',
    marginBottom: 0,
    marginLeft: 'auto',
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    backgroundColor: white,
    paddingTop: 10,
    paddingRight: 20,
    paddingLeft: 20,
    flex:1,
  }
})

export default connect(mapStateToProps)(DeckDetails)
