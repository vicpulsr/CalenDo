import React, { useEffect, useState } from 'react';
import { useTasks } from '../../hooks/Tasks';

import { CalendarComponent } from '../../components/Calendar';
import theme from '../../global/styles/theme';

import logo from '../../assets/logo.png';

import { Task } from '../../components/Task';
import { Image, FlatList } from 'react-native';

import {
    Container,
    Text,
} from './styles';

interface Task {
    id: number;
    title: string;
    date: Date;
};

interface Date {
    dateString: string;
    day: number;
    month: number;
    timestamp: number;
    year: number;
};

export function Tasks() {
    const { tasks } = useTasks();
    const [date, setDate] = useState<Date>({} as Date);
    const [markedDate, setMarkedDate] = useState({});
    const [tasksOfTheDaySelected, setTasksOfTheDaySelected] = useState([]);

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
            ) : (
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

    return (
        <Container>
            <Image source={logo} style={{ marginBottom: 10 }} />

            <CalendarComponent
                onDayPress={selectDate}
                markedDates={markedDate}
            />

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
        </Container>
    );
};