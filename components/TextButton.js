import React from 'react'
import { Text, TouchableOpacity } from 'react-native'
import styled from 'styled-components'

const Button = styled.TouchableOpacity`
  padding: 4px 8px;
  margin: 3px;
  border-radius: 5px;
  width: 70px;
`
const ButtonText = styled.Text`
  font-size: 12px;
  text-align:center;
`
export default function TextButton ({ children, onPress, style = {}, color, disabled }) {
  return (
    <Button disabled={disabled} style={disabled?[style, {opacity: 0.5}]: style} onPress={onPress} >
      <ButtonText style={{color: color}}>{children}</ButtonText>
    </Button>
  )
}
