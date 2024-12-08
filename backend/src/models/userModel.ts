import { firestoreDb } from "../app"; // Đường dẫn đến app.ts của bạn
import { IUser, UserSchema } from "../schemas/userSchema";

export const getAllUsers = async () => {
  try {
    const usersSnapshot = await firestoreDb.collection("users").get();
    console.log("usersSnapshot", usersSnapshot.docs);
    const users = usersSnapshot.docs.map((doc) => {
      const user = { id: doc.id, ...doc.data() };
      const { error, value } = UserSchema.validate(user);
      if (error) {
        throw new Error("Error fetching users: " + error.message);
      }
      return value;
    });
    return users as IUser[];
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error("Error fetching users: " + error.message);
    } else {
      throw new Error("Error fetching users: An unknown error occurred");
    }
  }
};
export const saveAUser = async (user: IUser) => {
  try {
    const { error, value } = UserSchema.validate(user);
    if (error) {
      throw new Error("Error creating user: " + error.message);
    }
    const userRef = firestoreDb.collection("users").doc(value.id);
    await userRef.set(value); // Use 'set' instead of 'add' to specify the ID
    return userRef.id;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error("Error creating user: " + error.message);
    } else {
      throw new Error("Error creating user: An unknown error occurred");
    }
  }
};
