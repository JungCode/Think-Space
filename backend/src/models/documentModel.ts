import { firestoreDb } from "../app"; // Đường dẫn đến app.ts của bạn
import { DocSchema, IDoc } from "../schemas/docSchema";
import { Timestamp } from "firebase-admin/firestore";

const convertTimestampsToDates = (data: any): any => {
  if (data && typeof data === "object") {
    for (const key in data) {
      if (data[key] instanceof Timestamp) {
        data[key] = data[key].toDate();
      } else if (typeof data[key] === "object" && data[key] !== null) {
        data[key] = convertTimestampsToDates(data[key]); // Recursively handle nested objects
      }
    }
  }
  return data;
};
export const getAllDocument = async () => {
  try {
    const documentsSnapshot = await firestoreDb.collection("documents").get();
    const documents = documentsSnapshot.docs.map((doc) => {
      const rawDocument = { id: doc.id, ...doc.data() };
      const document = convertTimestampsToDates(rawDocument);
      const { error, value } = DocSchema.validate(document);
      if (error) {
        throw new Error("Error fetching documents: " + error.message);
      }
      return value;
    });
    return documents as IDoc[];
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error("Error fetching documents: " + error.message);
    } else {
      throw new Error("Error fetching documents: An unknown error occurred");
    }
  }
};

export const getDocumentbyUserId = async (userId: string) => {
  try {
    const documentsSnapshot = await firestoreDb
      .collection("documents")
      .where("owner", "==", userId)
      .get();
    const documents = documentsSnapshot.docs.map((doc) => {
      const rawDocument = { id: doc.id, ...doc.data() };
      const document = convertTimestampsToDates(rawDocument);
      const { error, value } = DocSchema.validate(document);
      if (error) {
        throw new Error("Error fetching documents: " + error.message);
      }
      return value;
    });
    return documents as IDoc[];
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error("Error fetching documents: " + error.message);
    } else {
      throw new Error("Error fetching documents: An unknown error occurred");
    }
  }
};

export const createADocument = async (document: IDoc) => {
  try {
    const { error, value } = DocSchema.validate(document);
    if (error) {
      throw new Error("Error creating document: " + error.message);
    }
    const docRef = await firestoreDb.collection("documents").add(value);
    return docRef.id;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error("Error creating document: " + error.message);
    } else {
      throw new Error("Error creating document: An unknown error occurred");
    }
  }
};

export const updateADocument = async (documentId: string, document: IDoc) => {
  try {
    const { error, value } = DocSchema.validate(document);
    if (error) {
      throw new Error("Error updating document: " + error.message);
    }
    await firestoreDb.collection("documents").doc(documentId).set(value, { merge: true });
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error("Error updating document: " + error.message);
    } else {
      throw new Error("Error updating document: An unknown error occurred");
    }
  }
}

export const deleteADocument = async (documentId: string) => {
  try {
    await firestoreDb.collection("documents").doc(documentId).delete();
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error("Error deleting document: " + error.message);
    } else {
      throw new Error("Error deleting document: An unknown error occurred");
    }
  }
};
