import React, { Component } from 'react'
import { View, Text, ActivityIndicator} from 'react-native'

class Live extends Component {
  state = {
    status: null,
  }
  render() {
    const { status } = this.state

    if(status === null) {
      return <ActivityIndicator style={{marginTop: 30}}/>
    }

    if(status === 'denied'){
      return (
        <Text>denied</Text>
      )
    }

    if(status === 'undetermined'){
      return (
        <Text>undetermined</Text>
      )
    }

    return (
      <View>
        <Text>{{status}}</Text>
      </View>
    )
  }
}
export default Live
