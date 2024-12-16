import { clerk, firestoreDb } from "../app"; // Đường dẫn đến app.ts của bạn
import { IUser, UserSchema } from "../schemas/userSchema";

export const getAllUsers = async () => {
  try {
    const usersSnapshot = await firestoreDb.collection("users").get();
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

    const userRef = firestoreDb.collection("users").doc(value.email);
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

export const getUsersByRoom = async (roomId: string): Promise<IUser[]> => {
  try {
    const usersList: IUser[] = [];
    const usersSnapshot = await firestoreDb
      .collectionGroup("rooms")
      .where("roomId", "==", roomId)
      .get();
    const ownerSnapshot = await firestoreDb
      .collection("documents")
      .doc(roomId)
      .get();
    const owner = await clerk.users.getUser(ownerSnapshot.data()?.owner);
    // Tìm email chính
    const primaryEmail = owner.emailAddresses.find(
      (email) => email.id === owner.primaryEmailAddressId
    );
    usersList.push({
      email: primaryEmail?.emailAddress || "",
      username: "owner",
    });

    if (usersSnapshot.empty) {
      return usersList;
    }

    // Tạo một mảng chứa các promises
    const userPromises = usersSnapshot.docs.map(async (doc) => {
      const userRef = doc.ref.parent.parent; // Lấy document cha
      if (userRef) {
        const userDoc = await userRef.get(); // Chờ userRef.get() hoàn thành
        if (userDoc.exists) {
          return { email: userDoc.id, ...userDoc.data() } as IUser;
        }
      }
      return null; // Trả về null nếu không tìm thấy user
    });

    // Chờ tất cả các promises hoàn thành
    const resolvedUsers = await Promise.all(userPromises);

    // Lọc bỏ giá trị null và gán vào usersList
    resolvedUsers.forEach((user) => {
      if (user) usersList.push(user);
    });

    return usersList;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error("Error fetching users: " + error.message);
    } else {
      throw new Error("Error fetching users: An unknown error occurred");
    }
  }
};
