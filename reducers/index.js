import { RECEIVE_DECKS, RECEIVE_DECK, ADD_CARD, ADD_DECK } from '../actions'

export default function  decks (state = {}, action) {
  switch (action.type) {
    case RECEIVE_DECKS:
    debugger
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
  const { card } = action
  const appendQuestion = () => {
      return state[action.deckTitle].questions.concat([action.card])
  }
      return {
        ...state,
        [action.deckTitle]: {
          ...state[action.deckTitle],
          questions: appendQuestion()
        }
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
