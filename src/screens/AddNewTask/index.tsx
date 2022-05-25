import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
    Alert,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard,
    Image,
    ScrollView
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import theme from '../../global/styles/theme';

import { useTasks } from '../../hooks/Tasks';
import { useAuth } from '../../hooks/Auth';

import { CalendarComponent } from '../../components/Calendar';
import { Step } from '../../components/Step';
import { Button } from '../../components/Button';

import logo from '../../assets/logo.png';

import {
    Container,
    Input,
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
    const { user } = useAuth();
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

    async function handleAddNewTask() {
        try {
            const dataKey = `@calendar-todo:tasks_user:${user.id}`;

            const data = await AsyncStorage.getItem(dataKey);
            const currentData = data ? JSON.parse(data) : [];

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

            const dataFormatted = [
                ...currentData,
                newTask,
            ];

            await AsyncStorage.setItem(dataKey, JSON.stringify(dataFormatted));
            
            setTasks(prevTasks => [...prevTasks, newTask]);
            setTask('');
            
            Alert.alert('Tarefa cadastrada');

            navigation.navigate('Tarefas');
        } catch (error) {
            console.log(error);
            Alert.alert('Não foi possível cadastrar a tarefa');
        }
    };

    return (
        <KeyboardAvoidingView behavior='position' enabled>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ScrollView>
                    <Container>
                        <Image source={logo} style={{ width: 150, height: 50 }} />

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

                        <Button 
                            title='Adiciona tarefa'
                            onPress={handleAddNewTask}
                        />
                    </Container>
                </ScrollView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
};