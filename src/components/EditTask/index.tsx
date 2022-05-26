import React, { useEffect, useState } from 'react';
import { 
    TouchableOpacity, 
    Keyboard, 
    KeyboardAvoidingView, 
    TouchableWithoutFeedback 
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useTasks } from '../../hooks/Tasks';
import { useAuth } from '../../hooks/Auth';

import { Button } from '../Button';
import { CalendarComponent } from '../Calendar';

import {
    Container,
    Header,
    HeaderText,
    Title,
    Text
} from './styles';
import theme from '../../global/styles/theme';

interface Props {
    close: () => void;
};
interface Date {
    dateString: string;
    day: number;
    month: number;
    timestamp: number;
    year: number;
};

interface Task {
    id: number;
    title: string;
    date: Date;
    done: boolean;
};

interface MarkedDateProps {
    [date: string]: {
        selected: boolean;
        selectedColor: string;
    },
};

export function EditTask({ close }: Props) {
    const { user } = useAuth();
    const { tasks, taskId, setTasks } = useTasks();

    const [task, setTask] = useState<Task>({} as Task);
    const [title, setTitle] = useState('');
    const [date, setDate] = useState<Date>({} as Date);
    const [markedDate, setMarkedDate] = useState<MarkedDateProps>({} as MarkedDateProps);

    function getTaskEditingInfo() {
        const task = tasks.find(task => task.id === taskId);
        setTask(task);
        setTitle(task.title);
        setMarkedDate({
            [task.date.dateString]: {
                selected: true,
                selectedColor: theme.colors.success
            }
        })
    };

    function selectDate(day) {
        const date = day;
        setDate(date);
        setMarkedDate({
            [date.dateString]: {
                selected: true,
                selectedColor: theme.colors.success
            }
        })
    };

    async function handleEditTask() {
        const dataKey = `@calendar-todo:tasks_user:${user.id}`;

        const updatedTasks = tasks.map(task => ({ ...task }));

        let foundItem = updatedTasks.find((item: Task) => item.id === task.id);
        if (!foundItem) return;
        foundItem.title = title;
        foundItem.date = date;

        await AsyncStorage.setItem(dataKey, JSON.stringify(updatedTasks));

        setTasks(updatedTasks);
        close();
    };

    useEffect(() => {
        getTaskEditingInfo();
    }, []);

    return (
        <KeyboardAvoidingView behavior='position' enabled>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <Container>
                    <Header>
                        <HeaderText>Editando a tarefa</HeaderText>
                        <TouchableOpacity onPress={close}>
                            <MaterialIcons
                                name='close'
                                size={35}
                                color={theme.colors.shape}
                            />
                        </TouchableOpacity>
                    </Header>

                    <Text>Se desejar, altere a data</Text>
                    <CalendarComponent
                        onDayPress={selectDate}
                        markedDates={markedDate}
                    />

                    <Text>Se desejar, altere o título</Text>
                    <Title
                        value={title}
                        onChangeText={setTitle}
                    />

                    <Button
                        title='Salvar alterações'
                        onPress={handleEditTask}
                    />
                </Container>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
};