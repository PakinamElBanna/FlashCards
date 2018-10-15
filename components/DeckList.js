import React, { Component } from 'react'
import { View, Text, FlatList } from 'react-native'
import { connect } from 'react-redux'
import Deck from './Deck'
import { receiveDecks } from '../actions'
import { getDecks }from '../utils/api'
import { black } from '../utils/colors'
import { Wrapper } from '../utils/styles'

class DeckList extends Component {
  state = {
  decks: {},
  ready:false
  }

static getDerivedStateFromProps(props, state) {
  if (props.decks !== state.decks) {
    return {
      decks: props.decks
    }
  }
  return null;
}

componentDidMount() {
  const { dispatch } = this.props
  getDecks()
    .then((decks) => dispatch(receiveDecks(decks)))
    .then(this.setState({
      ready: true
    }))
}

 viewDeck = (deck) => {
   this.props.navigation.navigate(
            'DeckDetails',
            {deck}
          )
 }

 _renderItem = ({item}) => (
   <Deck title={item.title} deck={item} onPress={() => this.viewDeck(item)}/>
 )

renderDeckList = (decks) => {
   const deckList = Object.values(decks)
   return <FlatList data = {deckList}
                     keyExtractor={(item, index) => item.title}
                     renderItem={this._renderItem}
                    />
 }

  render () {
    const { ready, decks } = this.state
    return (
      <Wrapper style={{backgroundColor: '#3291a0'}}>
        {ready?
          this.renderDeckList(this.props.decks)
      :
          <Text>Loading</Text>
      }
    </Wrapper>
    )
  }
}

function mapStateToProps(decks,{navigation}) {
  return {
    decks
  }
}
export default connect(mapStateToProps)(DeckList)
