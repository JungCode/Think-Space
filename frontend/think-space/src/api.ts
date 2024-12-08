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

export const useOwner = async (
  roomId: string,
  userId: string,
  token: string
) => {
  // Fetch the room owner
  try {
    const response = await axios.get<{ owner: string }>(
      `http://localhost:3000/documents/${roomId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return userId == response.data.owner;
  } catch (error) {
    console.error("Error fetching owner:", (error as any).message);
    throw error; // Re-throw the error if the caller needs to handle it
  }
};

export const deleteADocument = async (documentId: string, token: string) => {
  try {
    const response = await axios.delete(`http://localhost:3000/documents/${documentId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting document:", (error as any).message);
    throw error;
  }
}
