import { AsyncStorage } from 'react-native'
import { formatResults, DECKS_STORAGE_KEY } from './_decks'

export function getDecks () {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
                     .then(formatResults)
}

export function createDeck ({ deck, key }) {
  return AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({
    [key]: deck
  }))
}
