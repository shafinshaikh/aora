import {
  Account,
  Client,
  Databases,
  Storage,
} from "react-native-appwrite";

//https://cloud.appwrite.io/v1
//667e9ca5003b01ab7b60

// export const appwriteConfig = {
//   endpoint: "https://cloud.appwrite.io/v1",
//   platform: "com.shafinshaikh.garagemate",
//   projectId: "667e9ca5003b01ab7b60",
//   databaseId: "667e9e7c00146f290854",
//   userCollectionId: "667e9eb000376c6d757e",
// };
const client = new Client();
client
  .setEndpoint('https://cloud.appwrite.io/v1') // Your Appwrite Endpoint
  .setProject('667e9ca5003b01ab7b60'); // Your project ID

const account = new Account(client);
const databases = new Databases(client);
const storage = new Storage(client);

const getCurrentUser = async () => {
  try {
    const user = await account.get();
    return user;
  } catch (error) {
    console.error('Error fetching user:', error);
    return null;
  }
};

export { client, account, databases, storage, getCurrentUser };