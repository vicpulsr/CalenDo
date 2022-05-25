import React from 'react';
import { Image } from 'react-native';

import { useTasks } from '../../hooks/Tasks';

import editIcon from '../../assets/icons/edit/edit.png';

import {
    Container
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

export function ButtonEditTask({ task }: Props) {
    const { setIsEditing, setTaskIdIsEditing } = useTasks();

    return (
        <Container
            onPress={
                () => {
                    setIsEditing(true)
                    setTaskIdIsEditing(task.id)
                }
            }
        >
            <Image source={editIcon} />
        </Container>
    );
};