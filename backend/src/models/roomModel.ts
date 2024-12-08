import { firestoreDb } from "../app"; // Đường dẫn đến app.ts của bạn
import { RoomSchema, IRoom } from "../schemas/roomSchema";

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

export const saveARoom = async (userId: string, roomId: string) => {
  try {
    const roomsRef = firestoreDb
      .collection("users")
      .doc(userId)
      .collection("rooms")
      .doc(roomId);
    await roomsRef.set({ merge: true });
    console.log(roomsRef.id);
    return roomsRef.id;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error("Error fetching documents: " + error.message);
    } else {
      throw new Error("Error fetching documents: An unknown error occurred");
    }
  }
};
//delete a room
export const deleteRoom = async (userId: string, roomId: string) => {
  try {
    const roomsRef = firestoreDb
      .collection("users")
      .doc(userId)
      .collection("rooms")
      .doc(roomId);
    await roomsRef.delete();
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error("Error fetching documents: " + error.message);
    } else {
      throw new Error("Error fetching documents: An unknown error occurred");
    }
  }
};
