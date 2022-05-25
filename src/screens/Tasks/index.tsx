import React, { useEffect, useState } from 'react';
import { Image, FlatList, Modal } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { CalendarComponent } from '../../components/Calendar';
import theme from '../../global/styles/theme';

import { useTasks } from '../../hooks/Tasks';
import { useAuth } from '../../hooks/Auth';

import logo from '../../assets/logo.png';

import { Task } from '../../components/Task';
import { EditTask } from '../../components/EditTask';

import {
    Container,
    Text,
} from './styles';

interface Task {
    id: number;
    title: string;
    date: Date;
    done: boolean;
};

interface Date {
    dateString: string;
    day: number;
    month: number;
    timestamp: number;
    year: number;
};

export function Tasks() {
    const { tasks, setTasks, isEditing, setIsEditing } = useTasks();
    const { user } = useAuth();
    const [date, setDate] = useState<Date>({} as Date);
    const [markedDate, setMarkedDate] = useState({});
    const [tasksOfTheDaySelected, setTasksOfTheDaySelected] = useState([]);
    // const [tasksStorageLoading, setTasksStorageLoading] = useState(true);

    function selectDate(day: Date) {
        setDate(day);

        setMarkedDate(
            {
                [day.dateString]: {
                    selected: true,
                    selectedColor: theme.colors.success
                }
            }
        );
    };

    useEffect(() => {
        function findTasksOfTheDay() {
            const findedTasks = tasks.filter((task) => (
                task.date.dateString === date.dateString
            ));
            setTasksOfTheDaySelected(findedTasks);
        }

        findTasksOfTheDay();

        tasks.map(task => (
            task.date.dateString === date.dateString ? (
                setMarkedDate(prevState =>
                ({
                    [date.dateString]: {
                        selected: true,
                        selectedColor: theme.colors.success
                    },
                    ...prevState
                })
                )
            ) : !task.done && (
                setMarkedDate(prevState => (
                    {
                        ...prevState,
                        [task.date.dateString]: {
                            marked: true,
                            dotColor: theme.colors.success,
                        },
                    }
                ))
            )
        ));
    }, [date, tasks]);

    async function loadTasksStorageData() {
        const dataKey = `@calendar-todo:tasks_user:${user.id}`;

        console.log('aqui', dataKey)
        const tasksStorage = await AsyncStorage.getItem(dataKey);

        if (tasksStorage) {
            const tasksFormatted = JSON.parse(tasksStorage);
            setTasks(tasksFormatted);
        };

        // setTasksStorageLoading(false)
    };

    useEffect(() => {
        loadTasksStorageData();
    }, []);

    return (
        <Container>
            <Image source={logo} style={{ width: 150, height: 50, marginBottom: 10 }} />

            <CalendarComponent
                onDayPress={selectDate}
                markedDates={markedDate}
            />

            {!!tasksOfTheDaySelected.length &&
                <Text>Quantidade de tarefas do dia: {tasksOfTheDaySelected.length}</Text>
            }

            {tasksOfTheDaySelected.length
                ? (
                    <FlatList
                        data={tasksOfTheDaySelected}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => (
                            <Task task={item} />
                        )}
                        style={{ width: '100%', marginTop: 10 }}
                    // showsVerticalScrollIndicator={false}
                    />
                )
                : (
                    <Text>Não há tarefas neste dia ainda</Text>
                )
            }

            <Modal visible={isEditing}>
                <EditTask close={() => setIsEditing(false)} />
            </Modal>
        </Container>
    );
};