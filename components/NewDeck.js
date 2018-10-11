import React, { Component } from 'react'
import { View, Text, TextInput } from 'react-native'
import TextButton from './TextButton'

class NewDeck extends Component {
  state = {
    text: ''
  }
  render () {
    const test = (p) => {
      console.log(p)
    }
    return (
      <View>
      <Text>What is the title of your new deck?</Text>
      <TextInput
        style={{height: 40, borderColor: 'gray', borderWidth: 1}}
        onChangeText={(text) => this.setState({text})}
        value={this.state.text}
      />
      <TextButton style={{margin: 20}} onPress={() =>test('submit')}>
      Submit</TextButton>
      </View>
    )
  }
}

export default NewDeck
