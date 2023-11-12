import {Client, Databases, Storage, Avatars, Account} from "appwrite"


export const appwriteConfig = {
    projectId: import.meta.env.VITE_APPWRITE_PROJECT_ID,
    url: import.meta.env.VITE_APPWRITE_URL,
    storageId: import.meta.env.VITE_APPWRITE_STORAGE_ID,
    databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
    categoriesCollectionId: import.meta.env.VITE_APPWRITE_CATEGORIES_COLLECTION_ID,
    expenseCollectionId: import.meta.env.VITE_APPWRITE_EXPENSE_COLLECTION_ID,
    usersCollectionId: import.meta.env.VITE_APPWRITE_USERS_COLLECTION_ID,
    incomeCollectionId: import.meta.env.VITE_APPWRITE_INCOME_COLLECTION_ID,
}


export const client = new Client();

client.setProject(appwriteConfig.projectId)
client.setEndpoint(appwriteConfig.url)
export const accounts = new Account(client);
export const databases = new Databases(client);
export const storages = new Storage(client);
export const avatars = new Avatars(client);