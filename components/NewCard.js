import React, { Component } from 'react'
import { View, Text, TextInput } from 'react-native'
import TextButton from './TextButton'

class NewCard extends Component {
  state = {
    question: '',
    answer: ''
  }
  render () {
    const test = (p) => {
      console.log(p)
    }
    return (
      <View>
      <TextInput
        style={{height: 40, borderColor: 'gray', borderWidth: 1}}
        onChangeText={(text) => this.setState({text})}
        value={this.state.question}
      />
      <TextInput
        style={{height: 40, borderColor: 'gray', borderWidth: 1}}
        onChangeText={(text) => this.setState({text})}
        value={this.state.answer}
      />
      <TextButton style={{margin: 20}} onPress={() =>test('submit')}>
      Submit</TextButton>
      </View>
    )
  }
}

export default NewCard
