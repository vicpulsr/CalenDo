import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useTasks } from '../../hooks/Tasks';
import {
    Alert,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard,
    Image,
    ScrollView
} from 'react-native';

import theme from '../../global/styles/theme';

import { CalendarComponent } from '../../components/Calendar';
import { Step } from '../../components/Step';

import logo from '../../assets/logo.png';

import {
    Container,
    Text,
    Input,
    ButtonAdd,
    TextButton,
} from './styles';

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

export function AddNewTask() {
    const { setTasks } = useTasks();
    const navigation = useNavigation();

    const [task, setTask] = useState('');
    const [date, setDate] = useState<Date>({} as Date);
    const [markedDate, setMarkedDate] = useState<MarkedDateProps>({} as MarkedDateProps);

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

    function handleAddNewTask() {
        if (!date.dateString) {
            Alert.alert('Selecione a data');
            return
        };

        if (!task) {
            Alert.alert('Digite o nome da tarefa');
            return
        };

        const newTask: Task = {
            id: new Date().getTime(),
            date: date,
            title: task,
            done: false,
        };

        setTasks(prevTasks => [...prevTasks, newTask]);
        setTask('');
        Alert.alert('Tarefa cadastrada');
        navigation.navigate('Tarefas');
    };

    return (
        <KeyboardAvoidingView behavior='position' enabled>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ScrollView>
                    <Container>
                        <Image source={logo} />

                        <Step
                            number={1}
                            text={'Selecione a data da tarefa'}
                        />
                        <CalendarComponent
                            onDayPress={selectDate}
                            markedDates={markedDate}
                        />

                        <Step
                            number={2}
                            text={'Digite a nova tarefa'}
                        />
                        <Input
                            placeholder="Digite a nova tarefa"
                            placeholderTextColor={theme.colors.success_light}
                            returnKeyType="send"
                            value={task}
                            onChangeText={setTask}
                        />

                        <ButtonAdd
                            onPress={handleAddNewTask}
                        >
                            <TextButton>Adicionar tarefa</TextButton>
                        </ButtonAdd>
                    </Container>
                </ScrollView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
};