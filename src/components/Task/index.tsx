import React from 'react';

import Icon from 'react-native-vector-icons/Feather';
import { useTasks } from '../../hooks/Tasks';

import {
    Container,
    Checked,
    Text
} from './styles';

interface Task {
    id: number;
    title: string;
    date: Date;
    done: boolean;
};

interface Props {
    task: Task;
};

export function Task({ task }: Props) {
    const { tasks, setTasks } = useTasks();

    function handleToggleTaskDone(id: number) {
        const updatedTasks = tasks.map(task => ({ ...task }));

        let foundItem = updatedTasks.find((task: Task) => task.id === id);
        if (!foundItem) return;
        foundItem.done = !foundItem.done;

        setTasks(updatedTasks);
    };

    return (
        <Container
            onPress={() => handleToggleTaskDone(task.id)}
            activeOpacity={0.7}
        >
            <Checked
                done={task.done}
            >
                {task.done && (
                    <Icon
                        name="check"
                        size={12}
                        color="#FFF"
                    />
                )}
            </Checked>
            <Text>{task.title}</Text>
        </Container>
    );
};