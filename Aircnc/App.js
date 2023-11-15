import React from "react"
import { Text, SafeAreaView, StyleSheet } from "react-native"

function App() {
  return (
    <SafeAreaView style={styles.Container}>
      <Text>Hello World!</Text>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
})

export default App
