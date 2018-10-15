import { AsyncStorage } from 'react-native'
import { formatResults, DECKS_STORAGE_KEY } from './_decks'

export function getDecks () {
  // return AsyncStorage.clear()
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
                     .then(formatResults)
}

  const getDeck = async (id) => {
  try{
    const decks = await getDecks()
    return decks[id]
  }
  catch(error){
    console.log(error)
  }

}

const createNewDeck = async ({ deck, key }) => {
try{
  AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({
     [key]: deck
   }))
  const newDecks = await getDecks()
  return newDecks
}
catch(error){
  console.log(error)
}

}

export function createDeck ({ deck, key }) {
 AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({
    [key]: deck
  }))
  .then(formatResults)
}

const createCard = async ({ card, key }) => {
try{
  const decks = await getDecks()
  let mergedQuestions = decks[key].questions.concat([card])
  let deck = {title:key, questions: mergedQuestions}
  decks[key] = undefined
  delete decks[key]
  AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(decks))
  AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({
     [key]: deck
   }))
  const finalDecks = await getDecks()
  return finalDecks
}
catch(error){
  console.log(error)
}
}

export {getDeck, createCard, createNewDeck}
