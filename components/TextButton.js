import React from 'react'
import { Text, TouchableOpacity } from 'react-native'
import styled from 'styled-components'

const Button = styled.TouchableOpacity`
  padding: 4px 8px;
  margin: 3px;
  border-radius: 5px;
`
const ButtonText = styled.Text`
  font-size: 12px;
`
export default function TextButton ({ children, onPress, style = {} }) {
  return (
    <Button style={style} onPress={onPress}>
      <ButtonText style={{color: '#fff'}}>{children}</ButtonText>
    </Button>
  )
}
