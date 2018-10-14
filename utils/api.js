import { AsyncStorage } from 'react-native'
import { formatResults, DECKS_STORAGE_KEY } from './_decks'

export function getDecks () {
  // return AsyncStorage.clear()
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
                     .then(formatResults)
}

export function createDeck ({ deck, key }) {
 AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({
    [key]: deck
  }))
}

export function createCard ({ card, key }) {
  AsyncStorage.getItem(DECKS_STORAGE_KEY)
  .then((results) => {
    const decks = JSON.parse(results)
    let mergedQuestions = decks[key].questions.concat([card])
    let deck = {title:key, questions: mergedQuestions}
    decks[key] = undefined
    delete decks[key]
    AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(decks))
    createDeck({deck, key})
})
}
