import {INewUser} from "@/types"
import {ID, Query} from 'appwrite'
import {accounts, appwriteConfig, avatars, databases} from "@/lib/appwrite/config.ts";


export async function createNewUser(user: INewUser) {
    try {
        const account = await accounts.create(
            ID.unique(),
            user.email,
            user.password,
            user.username,
        );

        const avatarUrl = avatars.getInitials(account.name);

        return await saveUserToDB({
            email: account.email,
            accountId: account.$id,
            username: account.name,
            fullName:user.fullName,
            imageUrl: avatarUrl
        })

    } catch (error) {
        console.log(error)
        return error;
    }
}

export async function saveUserToDB(user: {
    accountId: string,
    email: string,
    fullName:string,
    imageUrl: URL,
    username?: string
}) {
    try {
        return await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.usersCollectionId,
            ID.unique(),
            user
        );
    } catch (Error) {
        console.log(Error)
    }
}

export async function signInAccount(user: {
    email: string,
    password: string,
}) {
    try {
        const session = await accounts.createEmailSession(user.email, user.password);
        return session;
    } catch (Error) {
        console.log(Error)
    }
}

export async function getCurrentUser() {
    try {
        const currentAccount = await accounts.get();
        if (!currentAccount) throw Error

        const currentUser = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.usersCollectionId,
            [Query.equal('accountId', currentAccount.$id)]
        )
        if (!currentUser) throw Error
        return currentUser.documents[0];
    } catch (e) {
        console.log(e)
    }
}