import React, { Component } from 'react'
import { View, Text, FlatList } from 'react-native'
import { connect } from 'react-redux'
import Deck from './Deck'
import styled from 'styled-components'
import {receiveDecks} from '../actions'
import { getDecks }from '../utils/api'
import { black } from '../utils/colors'

const DeckListView = styled.View`
  background: #3291a0;
  flex:1;
  padding: 10px;
`
class DeckList extends Component {

  state = {
  ready: false
}

  componentDidMount() {
    const { dispatch } = this.props
    getDecks()
      .then((decks) => dispatch(receiveDecks(decks)))
      .then(this.setState({
        ready: true
      }))
  }

 viewDeck = (title) => {
   this.props.navigation.navigate(
            'DeckDetails',
            {deckId: title}
          )
 }

renderDeckList = (decks) => {
   const deckList=Object.values(decks)
   return <FlatList data={deckList}
     renderItem={({item}) =>
     <Deck deck={item} title={item.title} size={item.questions.length} viewDeck={this.viewDeck}/>}
      keyExtractor={item => item.title}
      />
 }

  render () {
    const { ready } = this.state
    const { decks } = this.props
    return (
      <DeckListView>
        {this.state.ready === true ?
          this.renderDeckList(decks)
      :
          <Text>Loading</Text>
      }
      </DeckListView>
    )
  }
}

function mapStateToProps(decks,{navigation}) {
  return {
    decks
  }
}
export default connect(mapStateToProps)(DeckList)
