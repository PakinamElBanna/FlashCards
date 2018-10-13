import { RECEIVE_DECKS, RECEIVE_DECK, ADD_CARD, ADD_DECK } from '../actions'

function decks (state = {}, action) {
  switch (action.type) {
    case RECEIVE_DECKS:
      return {
        ...state,
        ...action.decks,
      }
    case RECEIVE_DECK:
      return {
        ...state,
        ...action.deck
      }
    case ADD_CARD:
    debugger
        return {
          ...state,
          ...action.card
        }
    case ADD_DECK:
        return {
          ...state,
          ...action.deck
        }
    default :
      return state
  }
}

export default decks
