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
