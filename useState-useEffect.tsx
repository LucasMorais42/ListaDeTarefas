import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';

export default function App() {
  const [count, setCount] = useState(0)

  useEffect(()=>{
    if(count == 0){
      Alert.alert("Carrinho", "Seu carrinho esta vazio")
      }else{
        console.log("Valor de count: " + count)
      }
  }, [count])

  const adicionar = () => {
    setCount((prevState) => prevState + 1)
  }

  const retirar = () => {
    if(count > 0){
      setCount((prevState) => prevState - 1)
    }
  }

  return (
    <View style={styles.container}>
      <TextInput style={styles.big}>{count}</TextInput>

      <View style={styles.inline}>
        <Button title="Retirar" onPress={retirar}></Button>
        <Button title="Adicionar" onPress={adicionar}></Button>
      </View>

      
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  big:{
    fontSize: 40,
    fontWeight: 800
  },
  inline: {
    flexDirection: 'row'
  }
});
