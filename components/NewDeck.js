import React, { Component } from 'react'
import { View, Text } from 'react-native'
import TextButton from './TextButton'
import styled from 'styled-components'
import { white,orange } from '../utils/colors'
import { receiveDecks } from '../actions'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'
import { createNewDeck } from '../utils/api'
import { Wrapper, Title, TextInput } from '../utils/styles'

const NewDeckInput = styled.TextInput`
  height: 40;
  border: 0 ;
  width: 90%;
`
class NewDeck extends Component {

  state = {
    title: '',
    questions: []
  }

  submit = () => {
    const key = this.state.title
    const deck = this.state
    createNewDeck({key, deck}).then((decks)=>{
      this.props.dispatch(receiveDecks(decks))
      this.setState({
        title: ''
      })
      this.props.navigation.navigate(
               'DeckDetails',
               {deck: decks[key]}
             )
    })

  }

  render () {
    return (
      <Wrapper style={{alignItems: 'center'}}>
      <Title>What is the title of your new deck?</Title>
      <NewDeckInput
        onChangeText={(title) => this.setState({title})}
        value={this.state.title}
      />
    <TextButton disabled={this.state.title.length < 3} color={white} style={{marginTop: 20, backgroundColor: orange}} onPress={() => this.submit()}>
      Submit</TextButton>
  </Wrapper>
    )
  }
}


function mapStateToProps(state,{navigation}) {
  return {
    state
  }
}


export default connect(mapStateToProps)(NewDeck)
