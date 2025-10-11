import React, { useState, useEffect } from "react";
import axios from "axios";
import { getToken } from "../Security&Auth/authUtils"; // ajuste le chemin selon ton projet

const Telechar = () => {
  const [documents, setDocuments] = useState([]);
  const [file, setFile] = useState(null);
  const [documentTitle, setDocumentTitle] = useState("");
  const [documentDescription, setDocumentDescription] = useState("");

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const token = getToken();
        const response = await axios.get("/api/documents");
        setDocuments(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des documents:", error);
      }
    };

    fetchDocuments();
  }, []);

  const handleDownload = async (documentId, documentTitle) => {
    try {
      const token = getToken();
      const response = await axios.get(`/api/documents/${documentId}`, {
        responseType: 'blob',

      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', documentTitle || 'document');
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Erreur lors du téléchargement:', error);
      alert('Impossible de télécharger le fichier');
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFileUpload = async () => {
    if (!file || !documentTitle || !documentDescription) return;

    const formData = new FormData();
    formData.append("document", file);
    formData.append("title", documentTitle);
    formData.append("description", documentDescription);

    try {
      const token = getToken();
      await axios.post("/api/documents", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      // Refresh the documents list after upload
      const response = await axios.get("/api/documents", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setDocuments(response.data);
      setFile(null);
      setDocumentTitle("");
      setDocumentDescription("");
    } catch (error) {
      console.error("Erreur lors de l'upload du fichier:", error);
    }
  };

  return (
    <div className="w-full min-h-screen bg-slate-50 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Espace de Téléchargement</h2>
        <div className="bg-white rounded-lg shadow-sm p-8">
          <p className="text-slate-500 mb-6">Téléchargez nos fichiers ci-dessous :</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {documents.map((doc, index) => (
              <div
                key={index}
                className="cursor-pointer transition-transform hover:-translate-y-0.5"
                onClick={() => handleDownload(doc.id, doc.title)}
              >
                <div className="flex items-center bg-green-50 rounded-lg p-4 border border-green-100 hover:bg-green-100 transition-colors">
                  <div className="w-10 h-10 flex items-center justify-center bg-green-200 rounded-full mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-4 h-4 fill-green-800">
                      <path d="M12 2a1 1 0 0 1 1 1v8.59l3.3-3.3a1 1 0 1 1 1.4 1.42l-5 5a1 1 0 0 1-1.4 0l-5-5a1 1 0 1 1 1.4-1.42l3.3 3.3V3a1 1 0 0 1 1-1z" />
                      <path d="M4 14a1 1 0 0 1 1 1v5h14v-5a1 1 0 1 1 2 0v6a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-6a1 1 0 0 1 2 0v5h14v-5a1 1 0 0 1 1-1z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-green-800 mb-1">{doc.title}</p>
                    <p className="text-xs text-green-600">{doc.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Formulaire d'upload (à ajouter si souhaité) */}
          {/* 
          <div className="mt-8">
            <input type="file" onChange={handleFileChange} />
            <input
              type="text"
              placeholder="Titre du document"
              value={documentTitle}
              onChange={(e) => setDocumentTitle(e.target.value)}
            />
            <input
              type="text"
              placeholder="Description"
              value={documentDescription}
              onChange={(e) => setDocumentDescription(e.target.value)}
            />
            <button onClick={handleFileUpload}>Uploader</button>
          </div>
          */}

        </div>
      </div>
    </div>
  );
};

export default Telechar;
