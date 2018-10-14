import React, { Component } from 'react'
import { View, Text, FlatList } from 'react-native'
import { connect } from 'react-redux'
import { getDecks }from '../utils/api'
import {receiveDecks} from '../actions'
import Deck from './Deck'
import styled from 'styled-components'

const DeckListView = styled.View`
  background: #004783;
  flex:1;
  padding: 10px;
`
class DeckList extends Component {
  state = {
    ready: false
  }

  componentDidMount(){
    const { dispatch } = this.props

  getDecks()
    .then((decks) => dispatch(receiveDecks(decks)))
    .then(this.setState({
      ready: true
    }))
    }

    viewDeck = (id) => {
      this.props.navigation.navigate(
               'DeckDetails',
               {deckId: id}
             )
    }

// TODO: Youcant fetch itemby title
    renderDeckList = (decks) => {
      const deckList=Object.values(decks)
      debugger
      return <FlatList data={deckList}
        renderItem={({ item }) =>
        <Deck key={item.title} title={item.title} size={item.questions.length} viewDeck={this.viewDeck(item.title)}/>}
        keyExtractor={item => item.title}
        />

    }

  render () {
    const { ready } = this.state

    return (
      <DeckListView>
        {this.state.ready === true ?
          this.renderDeckList(this.props.decks)
      :
          <Text>Loading</Text>
      }
      </DeckListView>
    )
  }
}

function mapStateToProps (decks,{navigation}) {
  return {
    decks
  }
}
export default connect(mapStateToProps)(DeckList)
