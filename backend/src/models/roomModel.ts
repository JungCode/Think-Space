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

export const saveARoom = async (
  room: IRoom,
  userId: string,
  roomId: string
) => {
  try {
    const { error, value } = RoomSchema.validate(room);
    if (error) {
      throw new Error("Error updating document: " + error.message);
    }
    const roomsRef = firestoreDb
      .collection("users")
      .doc(userId)
      .collection("rooms")
      .doc(roomId);
    await roomsRef.set(value, { merge: true });
    return roomsRef.id;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error("Error fetching documents: " + error.message);
    } else {
      throw new Error("Error fetching documents: An unknown error occurred");
    }
  }
};
