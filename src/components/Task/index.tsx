import React from 'react';
import { Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useTasks } from '../../hooks/Tasks';
import { useAuth } from '../../hooks/Auth';

import { ButtonActionTask } from '../ButtonActionTask';

import {
    Container,
    TaskItem,
    Checked,
    Text,
    Buttons
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
    const { user } = useAuth();

    async function handleToggleTaskDone(id: number) {
        try {
            const dataKey = `@calendar-todo:tasks_user:${user.id}`;

            const updatedTasks = tasks.map(task => ({ ...task }));
    
            let foundItem = updatedTasks.find(task => task.id === id);
            if (!foundItem) return;
            foundItem.done = !foundItem.done;

            setTasks(updatedTasks);
            await AsyncStorage.setItem(dataKey, JSON.stringify(updatedTasks));
        } catch (error) {
            console.log(error);
            Alert.alert('Não foi possível concluir a tarefa');
        }
    };

    return (
        <Container>
            <TaskItem
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
            </TaskItem>

            <Buttons>
                <ButtonActionTask task={task} type='edit' style={{ marginRight: 10 }} />
                <ButtonActionTask task={task} type='remove' />
            </Buttons>
        </Container>
    );
};