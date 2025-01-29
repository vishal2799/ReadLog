import { ToastAndroid } from 'react-native';
import {
  Client,
  Account,
  ID,
  Avatars,
  Databases,
  Query,
} from 'react-native-appwrite';

const config = {
  databaseId: '67921b93003849f89ac7',
  userCollectionId: '67921bcd003c325e2d0f',
  bookCollectionId: '67924126000437059383',
  logCollectionId: '6793aa7b0013d0c805ac',
};

const client = new Client()
  .setProject('679217400009c3646820')
  .setPlatform('com.vishal2799.readlog');

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

export async function createUser(
  email: string,
  password: string,
  username: string
) {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );

    if (!newAccount) throw Error;

    const avatarUrl = avatars.getInitials(username);

    await signIn(email, password);

    const newUser = await databases.createDocument(
      config.databaseId,
      config.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email: email,
        username: username,
        avatar: avatarUrl,
      }
    );

    return newUser;
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error(String(error));
  }
}

export async function signIn(email: string, password: string) {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    return session;
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error(String(error));
  }
}

export async function getAccount() {
  try {
    const currentAccount = await account.get();
    return currentAccount;
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error(String(error));
  }
}

export async function getCurrentUser() {
  try {
    const currentAccount = await getAccount();
    if (!currentAccount) throw Error;

    const currentUser = await databases.listDocuments(
      config.databaseId,
      config.userCollectionId,
      [Query.equal('accountId', currentAccount.$id)]
    );

    if (!currentUser) throw Error;
    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function signOut() {
  try {
    const session = await account.deleteSession('current');
    return session;
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error(String(error));
  }
}

interface BookForm {
  title: string;
  author: string;
  genre: string | undefined;
  status: string;
  total_pages: number;
  user_id: string;
}

export async function addBook(form: BookForm): Promise<any> {
  try {
    const newBook = await databases.createDocument(
      config.databaseId,
      config.bookCollectionId,
      ID.unique(),
      form
    );
    return newBook;
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error(String(error));
  }
}

export async function getAllBooks(userId: string) {
  try {
    const books = await databases.listDocuments(
      config.databaseId,
      config.bookCollectionId,
      [Query.equal("user_id", userId)]
    );

    return books.documents;
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error(String(error));
  }
}

export async function updateBookStatus(bookId:string, status: string): Promise<any> {
  try {
    const newStatus = await databases.updateDocument(
      config.databaseId,
      config.bookCollectionId,
      bookId,
      {
        status: status
      }
    );
    return newStatus;
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error(String(error));
  }
}

interface LogForm {
  pages_read: number;
  body: string;
  bookId: string | undefined;
  userId: string;
}

export async function addLog(form: LogForm): Promise<any> {
  try {
    const newLog = await databases.createDocument(
      config.databaseId,
      config.logCollectionId,
      ID.unique(),
      form
    );
    return newLog;
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error(String(error));
  }
}

export async function getAllLogs(bookId:string) {
  try {
    const logs = await databases.listDocuments(
      config.databaseId,
      config.logCollectionId,
      [Query.equal("bookId", bookId)]
    );
    console.log('length',logs.documents.length)
    return logs.documents;
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error(String(error));
  }
}

export async function deleteLog(logId: string): Promise<any> {
  try {
    await databases.deleteDocument(config.databaseId, config.logCollectionId, logId);
    ToastAndroid.show("Log deleted successfully.", ToastAndroid.SHORT);
  } catch (error) {
    console.log(error);
    ToastAndroid.show("Failed to delete log.", ToastAndroid.SHORT);
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error(String(error));
  }
}