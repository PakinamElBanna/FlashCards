import React, { Component } from 'react'
import { View, Text, TextInput } from 'react-native'
import TextButton from './TextButton'
import styled from 'styled-components'
import { white,orange } from '../utils/colors'
import { addDeck } from '../actions'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'
import { createDeck } from '../utils/api'

const NewDeckView = styled.View`
margin: 0px auto;
display: flex;
align-items: center;
width: 100%;
margin: 0 auto;
background: white;
padding: 10px;
flex:1;`
const Title = styled.Text`
font-size: 18px;
margin-bottom: 10px;
  `
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
    const deck =this.state
    this.props.dispatch(addDeck({
      [key]: this.state
  }))

  this.setState({
    title: ''
  })

    this.props.navigation.navigate(
             'DeckDetails',
             {deckId: key}
           )

  createDeck({key, deck})

  }

  render () {
    return (
      <NewDeckView>
      <Title>What is the title of your new deck?</Title>
      <NewDeckInput
        onChangeText={(title) => this.setState({title})}
        value={this.state.title}
      />
    <TextButton disabled={this.state.title.length < 3} color={white} style={{marginTop: 20, backgroundColor: orange}} onPress={() => this.submit()}>
      Submit</TextButton>
    </NewDeckView>
    )
  }
}


function mapStateToProps(state) {
  debugger
  return {
    state
  }
}


export default connect(mapStateToProps)(NewDeck)
