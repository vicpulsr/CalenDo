import React, {
    createContext,
    ReactNode,
    useContext,
    useState,
    useEffect
} from 'react';

import * as AppleAuthentication from 'expo-apple-authentication';

import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthProviderProps {
    children: ReactNode;
};

interface User {
    id: string;
    name: string;
    email: string;
    photo?: string;
};

interface IAuthContextData {
    user: User;
    signInWithApple(): Promise<void>;
    signOut(): Promise<void>;
    userStorageLoading: boolean;
};

interface AuthorizationResponse {
    params: {
        access_token: string;
    };
    type: string;
};

const AuthContext = createContext({} as IAuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<User>({} as User);
    const [userStorageLoading, setUserStorageLoading] = useState(true);

    const userStorageKey = '@calendar-todo:user';

    async function signInWithApple() {
        try {
            const credential = await AppleAuthentication.signInAsync({
                requestedScopes: [
                    AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                    AppleAuthentication.AppleAuthenticationScope.EMAIL
                ]
            });

            if (credential) {
                const name = credential.fullName!.givenName!;
                const photo = `https://ui-avatars.com/api/?name=${name}&length=1`;

                const userLogged = {
                    id: String(credential.user),
                    email: credential.email!,
                    name,
                    photo,
                };

                setUser(userLogged);
                await AsyncStorage.setItem(userStorageKey, JSON.stringify(userLogged));
            };
        } catch (error) {
            throw new Error(error as string);
        };
    };

    async function signOut() {
        setUser({} as User);
        await AsyncStorage.removeItem(userStorageKey);
    };

    useEffect(() => {
        async function loadUserStorageData() {
            const userStorage = await AsyncStorage.getItem(userStorageKey);

            if(userStorage) {
                const userLogged = JSON.parse(userStorage) as User;
                setUser(userLogged);
            };

            setUserStorageLoading(false)
        };

        loadUserStorageData();
    }, []);

    return (
        <AuthContext.Provider value={{
            user,
            signInWithApple,
            signOut,
            userStorageLoading
        }}>
            {children}
        </AuthContext.Provider>
    );
}

function useAuth() {
    const context = useContext(AuthContext);

    return context;
};

export { AuthProvider, useAuth };