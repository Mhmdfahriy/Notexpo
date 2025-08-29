import React from 'react'
import { Text, TouchableOpacity } from 'react-native'

const CardNote = ({ content }: { content: string }) => {
  return (
    <TouchableOpacity
        style={{
          borderColor: "black",
          borderWidth: 1,
          borderRadius: 10,
          paddingHorizontal: 20,
          paddingVertical: 10,
          marginTop: 10,
      }}
      >
        <Text>{content}</Text>
      </TouchableOpacity>
  )
}

export default CardNote