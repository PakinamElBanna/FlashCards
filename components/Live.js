import React, { Component } from 'react'
import { View, Text, ActivityIndicator, TouchableOpacity,StyleSheet} from 'react-native'
import { Foundation }  from '@expo/vector-icons'
import { black, white } from '../utils/colors'

class Live extends Component {
  state = {
    status: 'undetermined',
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
        <View style={styles.center}>
          <Foundation name='alert' size={50} />
          <Text>You need to enable notifications for this app</Text>
        </View>

      )
    }

    return (
      <View>
        <Text>{{status}}</Text>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between'
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 30,
    marginRight: 30,
  },
  button: {
    padding: 10,
    backgroundColor: black,
    alignSelf: 'center',
    borderRadius: 5,
    margin: 20,
  },
  buttonText :{
    color: white,
    fontSize: 20,
  }
})
export default Live
