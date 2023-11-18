import React, { useEffect, useState } from "react"
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native"

import storage from "../storage"

import logo from "../assets/logo.png"
import SpotList from "../components/SpotList"

export default function List() {
  const [techs, setTechs] = useState([])

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
