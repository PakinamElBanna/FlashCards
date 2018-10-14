import { AsyncStorage } from 'react-native'
import { getDecks } from './_helpers'

export const DECKS_STORAGE_KEY = 'Flashcards'

function setDummyData () {

  let dummyData = getDecks()

  AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(dummyData))

  return dummyData
}

function returnData (results) {
  return results
}

export function formatResults (results) {
  return results === null
    ? setDummyData()
    : returnData(JSON.parse(results))
}
