import { useAuth, useUser } from "@clerk/clerk-react";
import { useNavigate, useParams } from "react-router-dom";

import { useEffect, useState } from "react";
import {
  createANewDocument,
  deleteADocument,
  getUserDocuments,
  updateADocument,
} from "@/api";
import SidebarMain from "./Sidebar_subComponents/SidebarMain";

interface Document {
  id: string;
  title: string;
  updatedAt?: string;
  createdAt?: string;
}
const DashBoard = () => {
  const { user } = useUser();
  const [documents, setDocuments] = useState<Document[]>([]);
  const { getToken } = useAuth();
  const navigate = useNavigate();
  const params = useParams();
  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const token = await getToken();
        if (!token) return;
        const data = await getUserDocuments(token);
        setDocuments(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchDocuments();
  }, [getToken]);
  const addANewDocumentHandler = async () => {
    const token = await getToken();
    if (!token) return;
    // Call the createANewDocument function
    try {
      const docId = await createANewDocument(token);
      navigate(`/${docId}`);
      setDocuments((prev) => [
        ...prev,
        {
          id: docId,
          title: "New page",
        },
      ]);
    } catch (err) {
      console.log(err);
    }
  };
  const deleteADocumentHanlder = async (id: string) => {
    const token = await getToken();
    if (token) {
      const data = await deleteADocument(id, token);
      console.log(data);
      setDocuments((prev) => prev.filter((doc) => doc.id !== id));
      if (params.id == id) navigate("/home");
    } else {
      console.error("Token is null");
    }
    navigate("/home");
  };
  const getTitle = (id: string) => {
    const doc = documents.find((doc) => doc.id === id);
    return doc?.title || "Untitled";
  };
  const updateADocumentTitle = async (id: string, title: string) => {
    const token = await getToken();

    if (token) {
      await updateADocument(
        id,
        { id: id, title: title, updatedAt: new Date().toISOString() },
        token
      );
      setDocuments((prev) =>
        prev.map((doc) => {
          if (doc.id === id) {
            return {
              ...doc,
              title: title,
            };
          }
          return doc;
        })
      );
    } else {
      console.error("Token is null");
    }
  };
  return (
    user && (
      <SidebarMain
        addANewDocumentHandler={addANewDocumentHandler}
        deleteADocumentHanlder={deleteADocumentHanlder}
        documents={documents}
        getToken={getToken}
        getTitle={getTitle}
        user={{
          fullName: user.fullName || "",
          primaryEmailAddress: {
            emailAddress: user.primaryEmailAddress?.emailAddress || "",
          },
          imageUrl: user.imageUrl,
        }}
        updateADocumentTitle={updateADocumentTitle}
      />
    )
  );
};

export default DashBoard;
