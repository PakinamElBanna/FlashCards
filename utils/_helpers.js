import React from 'react'
import { View, StyleSheet, AsyncStorage,Platform } from 'react-native'
import { FontAwesome, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons'
import { white, red, orange, blue, lightPurp, pink } from './colors'
import { Notifications, Permissions } from 'expo'

const NOTIFICATION_KEY = 'flashcards:notifications'

export function getDecks () {
  const decks = {
      React: {
        title: 'React',
        questions: [
          {
            question: 'What is React?',
            answer: 'A library for managing user interfaces'
          },
          {
            question: 'Where do you make Ajax requests in React?',
            answer: 'The componentDidMount lifecycle event'
          }
        ]
      },
      JavaScript: {
        title: 'JavaScript',
        questions: [
          {
            question: 'What is a closure?',
            answer: 'The combination of a function and the lexical environment within which that function was declared.'
          }
        ]
      },
      Rails: {
        title: 'Rails',
        questions: [
          {
            question: 'What is the equivalent of a debugger in rails?',
            answer: 'byebug'
          }
        ]
      }
  }
  return decks
}

export function clearLocalNotification() {
  return AsyncStorage.removeItem(NOTIFICATION_KEY)
  .then(Notifications.cancelAllScheduledNotificationsAsync)
}

export function createNotification() {
  return {
    title: 'Finish a quiz today!',
    body: "Don't forget to complete at least one quiz today!",
    ios: {
      sound: true,
    },
    android: {
      sound: true,
      priority: 'high',
      sticky: false,
      vibrate: true
    }
  }
}

export function setLocalNotification() {
  AsyncStorage.getItem(NOTIFICATION_KEY)
              .then(JSON.parse)
              .then((data)=>{
                if(data === null){
                  Permissions.askAsync(Permissions.NOTIFICATIONS)
                  .then(({status}) => {
                    if(status === 'granted') {
                      Notifications.cancelAllScheduledNotificationsAsync()

                      let tomorrow = new Date()
                      tomorrow.setDate(tomorrow.getDate() + 1)
                      tomorrow.setHours(20)
                      tomorrow.setMinutes(0)

                      Notifications.scheduleLocalNotificationAsync(
                        createNotification(),
                        {
                          time: tomorrow,
                          repeat: 'day',
                        }
                      )
                      AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
                    }
                  })
                }
              })
}
