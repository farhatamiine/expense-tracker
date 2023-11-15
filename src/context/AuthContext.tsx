import React, {createContext, useContext, useEffect, useState} from 'react';
import {IContextType, IUser} from "@/types";
import {getCurrentUser} from "@/lib/appwrite/api.ts";
import {useNavigate} from "react-router-dom";


const INITIAL_USER = {
    id: '',
    name: '',
    username: '',
    fullName: '',
    email: '',
    imageUrl: '',
    bio: '',
}

const INITIAL_STATE = {
    user: INITIAL_USER,
    isLoading: false,
    isAuthenticated: false,
    setUser: () => {
    },
    setIsAuthenticated: () => {
    },
    checkAuthUser: async () => false as boolean
}

const AuthContext = createContext<IContextType>(INITIAL_STATE);

export function AuthProvider({children}: { children: React.ReactNode }) {

    const [user, setUser] = useState<IUser>(INITIAL_USER)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
    const navigate = useNavigate();
    const checkAuthUser = async () => {
        try {
            const currentAccount = await getCurrentUser();
            if (currentAccount) {
                setUser({
                    id: currentAccount.$id,
                    fullName: currentAccount.fullName,
                    username: currentAccount.username,
                    email: currentAccount.email,
                    imageUrl: currentAccount.imageUrl,
                    bio: currentAccount.bio
                })
                setIsAuthenticated(true);
                return true
            }
            return false;
        } catch (e) {
            console.log(e);
            return false
        } finally {
            setIsLoading(false)
        }
    };

    //)
    useEffect(() => {
        const cookieFallback = localStorage.getItem("cookieFallback");
        console.log("Im here")
        console.log("cookieFallback", cookieFallback)
        console.log("1", cookieFallback === "[]")
        console.log("2", cookieFallback === null)
        console.log("3", cookieFallback === undefined)
        if (
            cookieFallback === "[]" ||
            cookieFallback === null ||
            cookieFallback === undefined
        ) {
            navigate('/sign-in')
        }else{
            navigate('/')
        }
        checkAuthUser();
    }, []);

    const value = {
        user,
        setUser,
        isLoading,
        isAuthenticated,
        setIsAuthenticated,
        checkAuthUser,
    };


    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export const useUserContext = () => useContext(AuthContext);