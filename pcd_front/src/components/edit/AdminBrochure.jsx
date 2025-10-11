import React, { useState, useEffect } from "react";
import axios from "axios";
import { AiOutlineDelete } from 'react-icons/ai';
import { getToken } from "../Security&Auth/authUtils";


const FAQAndPDFSection = () => {
  const [faqs, setFaqs] = useState([]);
  const [editingFAQ, setEditingFAQ] = useState(null);
  const [updatedFAQ, setUpdatedFAQ] = useState({ question: "", answer: "" });
  const [newFAQ, setNewFAQ] = useState({ question: "", answer: "" });
  const [openIndex, setOpenIndex] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [file, setFile] = useState(null);
  const [documentTitle, setDocumentTitle] = useState("");
  const [documentDescription, setDocumentDescription] = useState("");
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  useEffect(() => {
    const token = getToken();
  
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  
    axios.get("/api/faqs/", config)
      .then((response) => setFaqs(response.data))
      .catch((error) => console.error("Erreur lors de la récupération des FAQ:", error));
  
    axios.get("/api/documents", config)
      .then((response) => setDocuments(response.data))
      .catch((error) => console.error("Erreur lors de la récupération des documents:", error));
  }, []);

  const handleFAQEdit = (faq) => {
    setEditingFAQ(faq);
    setUpdatedFAQ({ question: faq.question, answer: faq.answer });
    setShowUpdateModal(true);
  };



const handleFAQUpdate = () => {
  if (editingFAQ) {
    const token = getToken();
    axios.put(`/api/faqs/${editingFAQ.id}`, updatedFAQ, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      setFaqs(faqs.map(f => f.id === editingFAQ.id ? response.data : f));
      setEditingFAQ(null);
      setShowUpdateModal(false);
      setUpdatedFAQ({ question: "", answer: "" });
    })
    .catch((error) => console.error("Erreur lors de la mise à jour de la FAQ:", error));
  }
};




const handleFAQDelete = (id) => {
  const token = getToken();
  axios.delete(`/api/faqs/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  .then(() => setFaqs(faqs.filter(faq => faq.id !== id)))
  .catch((error) => console.error("Erreur lors de la suppression de la FAQ:", error));
};


const handleFAQCreate = () => {
  const token = getToken();
  axios.post("/api/faqs/", newFAQ, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  .then((response) => {
    setFaqs([...faqs, response.data]);
    setNewFAQ({ question: "", answer: "" });
  })
  .catch((error) => console.error("Erreur lors de la création de la FAQ:", error));
};



const handleDownload = async (documentId, documentTitle) => {
  try {
    const token = getToken();
    const response = await axios.get(`/api/documents/${documentId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      responseType: 'blob', // Important pour les fichiers binaires
    });
    
    // Créer une URL pour le blob
    const url = window.URL.createObjectURL(new Blob([response.data]));
    
    // Créer un lien temporaire et déclencher le téléchargement
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', documentTitle || 'document');
    document.body.appendChild(link);
    link.click();
    
    // Nettoyer
    link.parentNode.removeChild(link);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Erreur lors du téléchargement:', error);
    alert('Impossible de télécharger le fichier');
  }
};



const handleDocumentDelete = (documentId) => {
  if (window.confirm("Êtes-vous sûr de vouloir supprimer ce document ?")) {
    const token = getToken(); // Récupérer le token
    axios.delete(`/api/documents/${documentId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(() => {
      // Rafraîchir la liste des documents après suppression
      axios.get("/api/documents", {
        headers: {
          Authorization: `Bearer ${token}`, // Ajoutez le token ici aussi
        },
      })
      .then((response) => setDocuments(response.data))
      .catch((error) => console.error("Erreur lors du chargement des documents:", error));
    })
    .catch((error) => {
      console.error("Erreur lors de la suppression du document:", error);
      alert("Erreur lors de la suppression du document");
    });
  }
};


  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFileUpload = () => {
    if (!file || !documentTitle || !documentDescription) return;
  
    const formData = new FormData();
    formData.append("document", file);
    formData.append("title", documentTitle);
    formData.append("description", documentDescription);
  
    const token = getToken(); // Récupérer le token
  
    axios.post("/api/documents", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`, // Ajout du token ici
      },
    })
    .then(() => {
      // Rafraîchir la liste des documents après upload
      axios.get("/api/documents", {
        headers: {
          Authorization: `Bearer ${token}`, // Ajout du token ici aussi
        },
      })
      .then((response) => setDocuments(response.data))
      .catch((error) => console.error("Erreur lors du chargement des documents:", error));
      
      setFile(null);
      setDocumentTitle("");
      setDocumentDescription("");
    })
    .catch((error) => console.error("Erreur lors de l'upload du fichier:", error));
  };
  

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (editingFAQ) {
      setUpdatedFAQ(prev => ({ ...prev, [name]: value }));
    } else {
      setNewFAQ(prev => ({ ...prev, [name]: value }));
    }
  };
  return (
    <div className="w-screen bg-gray-50 py-12 pt-20 ">
      <div className=" mx-auto px-6 pt-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* FAQ Section */}
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Questions Fréquentes</h2>
            <div className="space-y-2">
              {faqs.map((item, index) => (
                <div key={index} className="border rounded-md"> 
                  <button
                    onClick={() => toggleAccordion(index)}
                    className={`w-full text-left p-4 text-lg font-semibold flex justify-between items-center rounded-md bg-[#2D3E50] text-white hover:bg-green-300 text-black`}
                  >
                    {item.question}
                    <span>{openIndex === index ? "▲" : "▼"}</span>
                  </button>
                  {openIndex === index && (
                    <div className="p-4 bg-gray-100 text-gray-700">
                      <p>{item.answer}</p>
                      <button onClick={() => handleFAQEdit(item)} className="text-blue-500">Modifier</button>
                      <button onClick={() => handleFAQDelete(item.id)} className="text-red-500 ml-4">Supprimer</button>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Add New FAQ */}
            <div className="mt-8">
              <h3 className="text-xl font-semibold">Ajouter une nouvelle FAQ</h3>
              <input
                type="text"
                name="question"
                value={newFAQ.question}
                onChange={handleChange}
                className="w-full p-2 mt-2 border rounded-md"
                placeholder="Question"
              />
              <textarea
                name="answer"
                value={newFAQ.answer}
                onChange={handleChange}
                className="w-full p-2 mt-2 border rounded-md"
                placeholder="Réponse"
              />
              <button
                onClick={handleFAQCreate}
                className="mt-4 bg-gradient-to-r from-blue-500 to-green-500 text-white px-4 py-2 rounded font-medium hover:from-green-500 hover:to-blue-500 transition"
              >
                Ajouter
              </button>
            </div>
           
            {/* Edit Existing FAQ */}
            {/* Modal for Editing FAQ */}
          {showUpdateModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
              <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                <h3 className="text-xl font-semibold mb-4">Modifier la FAQ</h3>
                <input
                  type="text"
                  name="question"
                  value={updatedFAQ.question}
                  onChange={handleChange}
                  className="w-full p-2 mb-2 border rounded-md"
                  placeholder="Question"
                />
                <textarea
                  name="answer"
                  value={updatedFAQ.answer}
                  onChange={handleChange}
                  className="w-full p-2 mb-2 border rounded-md"
                  placeholder="Réponse"
                />
                <div className="flex justify-end space-x-4">
                  <button
                    onClick={() => setShowUpdateModal(false)} // Close modal
                    className="text-gray-500 hover:text-gray-700"
                  >
                    Annuler
                  </button>
                  <button
                    onClick={handleFAQUpdate}
                    className="bg-gradient-to-r from-blue-500 to-green-500 text-white px-4 py-2 rounded font-medium hover:from-green-500 hover:to-blue-500 transition"
                  >
                    Mettre à jour   
                  </button>
                </div>
              </div>
            </div>
            )}
          </div>
          
         {/* Documents Section */}
         <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Espace de Téléchargement</h2>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <p>Téléchargez nos fichiers ci-dessous :</p>
              <div className="mt-4 space-y-3">
              {documents.map((doc, index) => (
    <div 
      key={index} 
      className="block w-1/2 mx-auto cursor-pointer"
      onClick={() => handleDownload(doc.id, doc.title)}
    >
      <div className="flex items-center bg-[#2D3E50] text-white p-2 rounded font-medium hover:from-green-500 hover:bg-green-300 text-black">
        <div className="mr-2">
         <button onClick={() => handleDocumentDelete(doc.id)} className="text-red-500 ml-4">
         <AiOutlineDelete className="w-5 h-5" />
         </button>

          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2a1 1 0 0 1 1 1v8.59l3.3-3.3a1 1 0 1 1 1.4 1.42l-5 5a1 1 0 0 1-1.4 0l-5-5a1 1 0 1 1 1.4-1.42l3.3 3.3V3a1 1 0 0 1 1-1z" />
            <path d="M4 14a1 1 0 0 1 1 1v5h14v-5a1 1 0 1 1 2 0v6a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-6a1 1 0 0 1 2 0v5h14v-5a1 1 0 0 1 1-1z" />
          </svg>
        </div>
        <div>
          <p className="text-sm font-semibold">{doc.title}</p>
          <p className="text-xs">{doc.description}</p>
        </div>
      </div>
    </div>
  ))}
              </div>

              {/* Upload File Form */}
              <div className="mt-8 pt-8 border-t border-slate-200">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Ajouter un document</h3>
            <input
              type="text"
              placeholder="Titre du document"
              className="w-full p-3 border border-slate-200 rounded-md mb-4 text-sm"
              value={documentTitle}
              onChange={(e) => setDocumentTitle(e.target.value)}
            />
            <textarea
              placeholder="Description"
              className="w-full p-3 border border-slate-200 rounded-md mb-4 text-sm min-h-[100px]"
              value={documentDescription}
              onChange={(e) => setDocumentDescription(e.target.value)}
            />
            <input
              type="file"
              className="w-full p-3 border border-slate-200 rounded-md mb-4 text-sm"
              onChange={handleFileChange}
            />
            <button
              className="bg-gradient-to-r from-blue-500 to-green-500 text-white px-4 py-2 rounded font-medium hover:from-green-500 hover:to-blue-500 transition"
              onClick={handleFileUpload}
            >
              Télécharger le document
            </button>
          </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQAndPDFSection;