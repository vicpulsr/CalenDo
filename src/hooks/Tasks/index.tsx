import React, {
    createContext,
    ReactNode,
    useContext,
    useState,
    useEffect,
    SetStateAction,
} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { useAuth } from '../Auth';

interface TasksProviderProps {
    children: ReactNode;
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

interface ITasksContextData {
    tasks: Task[];
    setTasks: React.Dispatch<SetStateAction<Task[]>>;
    tasksStorageLoading: boolean;
    isEditing: boolean;
    setIsEditing: React.Dispatch<SetStateAction<boolean>>;
    taskIdIsEditing: number;
    setTaskIdIsEditing: React.Dispatch<SetStateAction<number>>;
};

const TasksContext = createContext({} as ITasksContextData);

function TasksProvider({ children }: TasksProviderProps) {
    const { user } = useAuth();

    const [tasks, setTasks] = useState<Task[]>([]);
    const [tasksStorageLoading, setTasksStorageLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [taskIdIsEditing, setTaskIdIsEditing] = useState();

    const dataKey = `@calendar-todo:tasks_user:${user.id}`;

    async function loadTasksStorageData() {
        const tasksStorage = await AsyncStorage.getItem(dataKey);

        if(tasksStorage) {
            const tasksFormatted = JSON.parse(tasksStorage);
            setTasks(tasksFormatted);
        };

        setTasksStorageLoading(false)
    };

    useEffect(() => {
        loadTasksStorageData();
    }, []);
    
    useEffect(() => {
        loadTasksStorageData();
    }, [tasks]);

    return (
        <TasksContext.Provider value={{
            tasks,
            setTasks,
            tasksStorageLoading,
            isEditing, 
            setIsEditing,
            taskIdIsEditing, 
            setTaskIdIsEditing,
        }}>
            {children}
        </TasksContext.Provider>
    );
};

function useTasks() {
    const context = useContext(TasksContext);

    return context;
};

export { TasksProvider, useTasks };