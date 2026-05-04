import React, { useReducer } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';

const reducer = (state:{counter:number;}, action:{type:string;}) => {
  switch(action.type){
    case "adicionar":
      return{
        counter: state.counter + 1
      }
    case "retirar":
      return{
        counter: state.counter > 0 ? state.counter - 1 : state.counter 
      }
      /*if(state.counter > 0){
        return{
          counter: state.counter - 1
        }
      }*/
    case "zerar":
      return{
        counter: 0
      }
    default:
      return state
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, {counter:0})

  const adicionar = () => {
    dispatch({type:"adicionar"})
  }

  const retirar = () => {
    dispatch({type:"retirar"})
  }

  const zerar = () => {
    dispatch({type:"zerar"})
  }

  return (
    <View style={styles.container}>
      <TextInput style={styles.big}>{state.counter}</TextInput>

      <View style={styles.inline}>
        <Button title="Zerar" onPress={zerar}></Button>
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
