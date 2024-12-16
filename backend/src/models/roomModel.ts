import { firestoreDb } from "../app"; // Đường dẫn đến app.ts của bạn
import { IRoom } from "../schemas/roomSchema";
export const getRoomsByUserId = async (userId: string) => {
  try {
    const roomsRef = firestoreDb
      .collection("users")
      .doc(userId)
      .collection("rooms");
    const roomsSnapshot = await roomsRef.get();
    const rooms = roomsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return rooms as IRoom[];
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error("Error fetching documents: " + error.message);
    } else {
      throw new Error("Error fetching documents: An unknown error occurred");
    }
  }
};

export const saveARoom = async (
  userId: string,
  roomId: string,
  title: string
) => {
  try {
    const userRef = firestoreDb.collection("users").doc(userId);
    const userDoc = await userRef.get();
    if (!userDoc.exists) {
      return false;
    }
    const roomsRef = userRef.collection("rooms").doc(roomId);
    await roomsRef.set({ title, roomId }, { merge: true });
    return true;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error("Error fetching documents: " + error.message);
    } else {
      throw new Error("Error fetching documents: An unknown error occurred");
    }
  }
};
//delete a room
export const deleteRoom = async (roomId: string) => {
  try {
    const querySnapshot = await firestoreDb
      .collectionGroup("rooms")
      .where("roomId", "==", roomId)
      .get();
    const batch = firestoreDb.batch();
    querySnapshot.forEach((doc) => {
      batch.delete(doc.ref);
    });
    await batch.commit();
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error("Error fetching documents: " + error.message);
    } else {
      throw new Error("Error fetching documents: An unknown error occurred");
    }
  }
};

export const removeARoom = async (roomId: string, userEmail: string) => {
  try {
    const roomsRef = firestoreDb
      .collection("users")
      .doc(userEmail)
      .collection("rooms")
      .where("roomId", "==", roomId);
    const roomSnapshot = await roomsRef.get();
    // Lặp qua các kết quả và xóa từng tài liệu
    const deletePromises = roomSnapshot.docs.map((doc) => doc.ref.delete());
    // Chờ tất cả các tài liệu được xóa
    await Promise.all(deletePromises);
    return true;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error("Error fetching documents: " + error.message);
    } else {
      throw new Error("Error fetching documents: An unknown error occurred");
    }
  }
};
