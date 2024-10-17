import admin from 'firebase-admin';
import { firestoreDb } from '../app'; // Đường dẫn đến app.ts của bạn


export const getAllUsers = async () => {
  try {
		const usersSnapshot = await firestoreDb.collection('users').get();
    const users = usersSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    return users;
  } catch (error : unknown) {
		if (error instanceof Error) {
      throw new Error('Error fetching users: ' + error.message);
    } else {
      throw new Error('Error fetching users: An unknown error occurred');
    }
  }
};
