export const RECEIVE_DECKS = 'RECEIVE_DECKS'
export const RECEIVE_DECK = 'RECEIVE_DECK'

export function receiveDecks(decks) {
  return {
    type: RECEIVE_DECKS,
    decks
  }
}

export function receiveDeck(deck) {
  return {
    type: RECEIVE_DECK,
    deck
  }
}

export function addDeck (deck) {
  return {
    type: ADD_DECK,
    deck
  }
}
