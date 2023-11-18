import { useNavigation, useRoute } from "@react-navigation/native"
import React, { useState } from "react"
import { Alert, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity } from "react-native"

import api from "../services/api"

import storage from "../storage"

export default function Book() {
  const route = useRoute()
  const navigation = useNavigation()

  const [date, setDate] = useState("")
  const { id } = route.params

  async function handleSubmit() {
    const userString = storage.getString("user")
    const userData = JSON.parse(userString)
    const user_id = userData._id

    await api.post(
      `/spots/${id}/bookings`,
      {
        date,
      },
      {
        headers: { user_id },
      }
    )

    Alert.alert("Solicitação de reserva enviada.")

    navigation.navigate("List")
  }

  function handleCancel() {
    navigation.navigate("List")
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.label}>DATA DE INTERESSE *</Text>
      <TextInput
        style={styles.input}
        placeholder="Qual data você quer reservar?"
        placeholderTextColor="#999"
        autoCapitalize="words"
        autoCorrect={false}
        value={date}
        onChangeText={setDate}
      />

      <TouchableOpacity onPress={handleSubmit} style={styles.button}>
        <Text style={styles.buttonText}>Solicitar reserva</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleCancel} style={[styles.button, styles.cancelButton]}>
        <Text style={styles.buttonText}>Cancelar</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    margin: 30,
  },

  label: {
    fontWeight: "bold",
    color: "#444",
    marginBottom: 8,
    marginTop: 30,
  },

  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    paddingHorizontal: 20,
    fontSize: 16,
    color: "#444",
    height: 44,
    marginBottom: 20,
    borderRadius: 2,
  },

  button: {
    height: 42,
    backgroundColor: "#f05a5b",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 2,
  },

  cancelButton: {
    backgroundColor: "#ccc",
    marginTop: 10,
  },

  buttonText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 16,
  },
})
