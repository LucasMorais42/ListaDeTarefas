import { Text, View } from "react-native";
import { Task } from "../types/Task";

type CardProps = {
  task: Task;
};
export default function Card({task}: CardProps){
    return(
        <View key={task.id}>
            <Text>{task.id}</Text>
            <Text>{task.name}</Text>
        </View>
       
    )
}