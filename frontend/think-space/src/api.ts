import axios from "axios";

interface Document {
  id: string;
  title: string;
  roomId?: string;
}

export const createANewDocument = async (token: string) => {
  try {
    const response = await axios.post<{ documentId: string }>(
      "http://localhost:3000/documents",
      {
        title: "New page",
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data.documentId; // Return the document ID
  } catch (error) {
    console.error("Error creating document:", (error as any).message);
    throw error;
  }
};

export const getUserDocuments = async (token: string): Promise<Document[]> => {
  try {
    const response = await axios.get<Document[]>(
      "http://localhost:3000/documents/user",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data; // Return the fetched documents
  } catch (error) {
    console.error("Error fetching documents:", (error as any).message);
    throw error; // Re-throw the error if the caller needs to handle it
  }
};
