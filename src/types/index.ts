import React from "react";

export type IContextType = {
    user: IUser,
    isLoading: boolean,
    isAuthenticated: boolean,
    setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>,
    setUser: React.Dispatch<React.SetStateAction<IUser>>,
    checkAuthUser: () => Promise<boolean>
}


export type INavLink = {
    imgURL: string;
    route: string;
    label: string;
};

export type IUpdateUser = {
    userId: string;
    fullName: string;
    bio: string;
    imageId: string;
    imageUrl: URL | string;
    file: File[];
};


export type IUser = {
    id: string;
    fullName: string;
    username: string;
    email: string;
    imageUrl: string;
    bio: string;
};

export type INewUser = {
    fullName: string;
    email: string;
    username: string;
    password: string;
};