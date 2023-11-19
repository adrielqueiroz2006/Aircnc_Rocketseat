import React, { useEffect, useState } from "react"
import socketio from "socket.io-client"
import { Alert, Image, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native"

import storage from "../storage"

import logo from "../assets/logo.png"
import SpotList from "../components/SpotList"

export default function List() {
  const [techs, setTechs] = useState([])

  useEffect(() => {
    const userString = storage.getString("user")
    const userData = JSON.parse(userString)
    const user_id = userData._id
    if (user_id) {
      const socket = socketio("http://localhost:3333", {
        query: { user_id },
      })

      socket.on("booking_response", (booking) => {
        Alert.alert(
          `Sua reserva em ${booking.spot.company} em ${booking.date} foi ${
            booking.approved ? "APROVADA" : "REJEITADA"
          }`
        )
      })
    }
  }, [])

  useEffect(() => {
    const storagedTechs = storage.getString("techs")
    if (storagedTechs) {
      const techsArray = storagedTechs.split(",").map((tech) => tech.trim())

      setTechs(techsArray)
    }
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.logo} source={logo} />

      <ScrollView>
        {techs.map((tech) => (
          <SpotList key={tech} tech={tech} />
        ))}
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  logo: {
    height: 32,
    resizeMode: "contain",
    alignSelf: "center",
    marginTop: 10,
  },
})
