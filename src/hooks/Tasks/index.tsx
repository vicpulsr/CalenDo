import React, {
    createContext,
    ReactNode,
    useContext,
    useState,
    useEffect,
    SetStateAction
} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

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
    // id: string;
    title: string;
    date: Date;
};

interface ITasksContextData {
    tasks: Task[];
    setTasks: React.Dispatch<SetStateAction<Task[]>>;
    tasksStorageLoading: boolean;
};

const TasksContext = createContext({} as ITasksContextData);

function TasksProvider({ children }: TasksProviderProps) {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [tasksStorageLoading, setTasksStorageLoading] = useState(true);

    const tasksStorageKey = '@calendar-todo:tasks';

    useEffect(() => {
        async function loadTasksStorageData() {
            const tasksStorage = await AsyncStorage.getItem(tasksStorageKey);

            if(tasksStorage) {
                const tasksFormatted = JSON.parse(tasksStorage);
                setTasks(tasksFormatted);
            };

            setTasksStorageLoading(false)
        };

        loadTasksStorageData();
    }, []);

    return (
        <TasksContext.Provider value={{
            tasks,
            setTasks,
            tasksStorageLoading
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