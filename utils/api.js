import { AsyncStorage } from 'react-native'
import { formatResults, DECKS_STORAGE_KEY } from './_decks'

export function getRandomKey() {
  return Math.random().toString(13).replace('0.', '')
}
export function getDecks () {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
                     .then(formatResults)
}

export function createDeck ({ deck, key }) {
 AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({
    [key]: deck
  }))
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
                     .then(formatResults)
}

export function createCard ({ card, key }) {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
  .then((results) => {
    let decks = JSON.parse(results)
    AsyncStorage.setItem(DECKS_STORAGE_KEY,JSON.stringify(
      decks[key].questions.concat([card])
    ))
  })
  .then(formatResults)
}
