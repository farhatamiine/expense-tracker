import {
    useMutation,
} from "@tanstack/react-query";
import {INewUser} from "@/types";
import {createNewUser, signInAccount} from "@/lib/appwrite/api.ts";


export const useCreateUserAccount = () => {
    return useMutation({
        mutationFn: (user: INewUser) => createNewUser(user)
    })
}

export const useSignInAccount = () => {
    return useMutation({
        mutationFn: (user: { email: string, password: string }) => signInAccount(user)
    })
}