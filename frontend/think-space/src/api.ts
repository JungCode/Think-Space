import axios from "axios";

interface Document {
  id: string;
  title: string;
  roomId?: string;
  updatedAt?: string;
  createdAt?: string;
}

export const createANewDocument = async (token: string) => {
  try {
    const response = await axios.post<{ documentId: string }>(
      "https://think-space-back-end-production.up.railway.app/documents",
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
      "https://think-space-back-end-production.up.railway.app/documents/user",
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
      `https://think-space-back-end-production.up.railway.app/documents/${roomId}`,
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
    const response = await axios.delete(
      `https://think-space-back-end-production.up.railway.app/documents/${documentId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting document:", (error as any).message);
    throw error;
  }
};

export const updateADocument = async (
  documentId: string,
  document: Document,
  token: string
) => {
  try {
    const response = await axios.patch(
      `https://think-space-back-end-production.up.railway.app/documents/${documentId}`,
      {
        document,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating document title:", (error as any).message);
    throw error;
  }
};
export const inviteAUserToRoom = async (
  roomId: string,
  email: string,
  token: string,
  title: string
) => {
  try {
    const response = await axios.post<{ roomRes: string }>(
      `https://think-space-back-end-production.up.railway.app/rooms/${roomId}`,
      {
        email,
        title,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.roomRes;
  } catch (error) {
    console.error("Error inviting user to room:", (error as any).message);
    throw error;
  }
};
export const saveAUser = async (email: string, username: string) => {
  try {
    const response = await axios.post(`https://think-space-back-end-production.up.railway.app/`, {
      username: username,
      email: email,
    });
    return response.data;
  } catch (error) {
    console.error("Error saving user:", (error as any).message);
    throw error;
  }
};
export const getSharedDocuments = async (token: string, userId: string) => {
  try {
    const response = await axios.get<Document[]>(
      `https://think-space-back-end-production.up.railway.app/rooms/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching shared documents:", (error as any).message);
    throw error;
  }
};
export const getSharedRoomsbyUserId = async (token: string, userId: string) => {
  try {
    const response = await axios.get<Document[]>(
      `https://think-space-back-end-production.up.railway.app/rooms/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching shared rooms:", (error as any).message);
    throw error;
  }
};

export const getUsersByRoom = async (roomId: string, token: string) => {
  try {
    const response = await axios.get<Document[]>(
      `https://think-space-back-end-production.up.railway.app/byRoom/${roomId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching users by room:", (error as any).message);
    throw error;
  }
};

export const removeARoom = async (
  roomId: string,
  userEmail: string,
  token: string
) => {
  try {
    const response = await axios.post(
      `https://think-space-back-end-production.up.railway.app/rooms/removeARoom/${roomId}`,
      {
        userEmail,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching users by room:", (error as any).message);
    throw error;
  }
};
export const askAIQuestion = async (
  documentData: any,
  language: string,
  setSummary: React.Dispatch<React.SetStateAction<string>>
) => {
  try {
    const response = await fetch("https://think-space-back-end-production.up.railway.app/askAIQuestion", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        language: language,
        documentData: documentData,
      }),
    });
    const reader = response.body?.getReader();
    if (!reader) {
      throw new Error("Failed to get reader from response body");
    }
    const decoder = new TextDecoder("utf-8");

    let result = "";
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value, { stream: true });
      result += chunk;

      // Update useState with the latest chunk
      setSummary((prev) => prev + chunk);
    }
    return result;
  } catch (error) {
    console.error("Error asking AI question:", (error as any).message);
    throw error;
  }
};

export const chatToDocument = async (
  documentData: any,
  question: string,
  setSummary: React.Dispatch<React.SetStateAction<string>>
) => {
  try {
    const response = await fetch(
      "https://think-space-back-end-production.up.railway.app/askAIQuestion/chatToDocument",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: question,
          documentData: documentData,
        }),
      }
    );
    const reader = response.body?.getReader();
    if (!reader) {
      throw new Error("Failed to get reader from response body");
    }
    const decoder = new TextDecoder("utf-8");

    let result = "";
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value, { stream: true });
      result += chunk;

      // Update useState with the latest chunk
      setSummary((prev) => prev + chunk);
    }
    return result;
  } catch (error) {
    console.error("Error asking AI question:", (error as any).message);
    throw error;
  }
};
