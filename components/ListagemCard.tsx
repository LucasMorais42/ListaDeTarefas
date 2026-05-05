import { View } from "react-native";
import Card from "./Card";
import { Task } from "../types/Task";


type Props = {
    tasks: Task[];
};

export default function ListagemCard({ tasks }: Props) {
    return(
        <View>
            {tasks.map((task) => (
                <Card key={task.id} task={task} />
            ))}
        </View>
    )
}