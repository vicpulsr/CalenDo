import React from 'react';
import { Alert, Image, TouchableOpacityProps } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useTasks } from '../../hooks/Tasks';
import { useAuth } from '../../hooks/Auth';

import editIcon from '../../assets/icons/edit/edit.png';
import removeIcon from '../../assets/icons/trash/trash.png';

import {
    Container
} from './styles';

interface Task {
    id: number;
    title: string;
    date: Date;
    done: boolean;
};

interface Props extends TouchableOpacityProps {
    task: Task;
    type: 'edit' | 'remove';
};

export function ButtonActionTask({
    task,
    type,
    ...rest
}: Props) {
    const {
        tasks,
        setTasks,
        setIsEditing,
        setTaskId
    } = useTasks();
    const { user } = useAuth();

    function handleRemoveTask(id: number) {
        Alert.alert(
            "Remover item",
            "Tem certeza que você deseja remover esse item?",
            [
                {
                    text: 'Não',
                    onPress: () => { }
                },
                {
                    text: 'Sim',
                    onPress: async () => {
                        try {
                            const dataKey = `@calendar-todo:tasks_user:${user.id}`;

                            const updatedTasks = tasks.filter(task => task.id !== id);

                            setTasks(updatedTasks);
                            await AsyncStorage.setItem(dataKey, JSON.stringify(updatedTasks));
                        } catch (error) {
                            console.log(error);
                            Alert.alert('Não foi possível concluir a tarefa');
                        }
                    }
                }
            ]
        );
    };

    return (
        <Container
            onPress={
                () => {
                    if (type === 'edit') {
                        setIsEditing(true);
                        setTaskId(task.id);
                    } else {
                        handleRemoveTask(task.id);
                    }
                }
            }
            {...rest}
        >
            <Image source={type === 'edit' ? editIcon : removeIcon} />
        </Container>
    );
};