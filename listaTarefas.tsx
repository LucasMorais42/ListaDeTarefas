import React, { useReducer, useState } from 'react';
import { Button, StatusBar, TextInput, View, Text } from 'react-native';
import {styles} from './styles';


export default function ListaTarefas(){

type Action = 
| { type: "adicionar" } 
| { type: "listar" }
| { type: "remover-selecionados" } 
| { type: "zerar" } 
| { type: "marcar-como-concluida"; id: number } 
| { type: "toggle-task"; id: number }
| { type: "marcar-como-selecionado"; id: number }

const reducer = (state:{counter:number, tasks: any[]}, action: Action) => {
  switch(action.type){
    case "adicionar":
      return{
        counter: state.counter + 1,  
        tasks: [...state.tasks, {id: state.counter, name: "Tarefa " + state.counter, selected: false, completed: false}]
      }
    case "remover-selecionados":
      return{
        counter: state.counter - state.tasks.filter(task => task.selected).length,
        tasks: state.tasks.filter(task => !task.selected),
      }
    case "marcar-como-selecionado":
      return{
        ...state,
        tasks: state.tasks.map(task => task.id === action.id ? {...task, selected: !task.selected} : task)
      }
    case "listar":
        return{
           ...state
    }
    case "marcar-como-concluida":
        return{
            ...state,
            tasks: state.tasks.map(task => task.id === action.id ? {...task, completed: true} : task)
        }
     
    case "zerar":
      return{
        tasks: [],  
        counter: 0
      }
    default:
      return state
  }
}
const [state, dispatch] = useReducer(reducer, {tasks: [], counter: 0});
    
    const adicionarTarefa = () => {
       dispatch({type:"adicionar"})
    }
    
    const retirarTarefa = () => {
        dispatch({type:"remover-selecionados"})
    }
    
    const zerarTarefa = () => {
        dispatch({type:"zerar"})
    }
    
    const removerSelecionadas = () => {
        dispatch({type:"remover-selecionados"})
    }
    
    const marcarComoConcluida = (id: number) => {
        dispatch({type:"marcar-como-concluida", id})
    }

    const marcarComoSelecionado = (id: number) => {  
        dispatch({type:"marcar-como-selecionado", id})
    } 

    const [inputValue, setInputValue] = useState("");

    return (
        <View style={styles.container}>
          <View style={styles.inline}>
            <TextInput
              style={styles.enter}
              value={inputValue}
              onChangeText={(text) => setInputValue(text)}
            ></TextInput>
            <Button title="adicionar tarefa" onPress={adicionarTarefa}></Button>
          </View>
           <Text>Lista de tarefas</Text>
           <View>
            <Text>Pendente</Text>  
          {state.tasks.map((task: any) => (
            <Text
              key={task.id}
              onPress={() => marcarComoSelecionado(task.id)}
              style={[
                styles.enter,
                {
                  marginTop: 10,
                  marginBottom: 5,
                  textAlign: "center",
                  paddingVertical: 10,
                  backgroundColor: task.selected ? "red" : "blue",
                },
              ]}>
                
              id: {task.id} - {task.name}
            </Text>
            ))}
            </View>
          <Button title="deletar tarefas" onPress={removerSelecionadas}></Button>
    
          <StatusBar />
        </View>
      );

}