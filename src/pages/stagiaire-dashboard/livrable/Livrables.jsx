import { useState, useEffect } from "react";
import { FileText, Plus } from "lucide-react";
import { submitGithubLink ,deleteDocument, getDocuments, submitDocument} from "./ApiServices";
import { getUsernameFromToken } from "../../../utils/getUsernameFromToken";
import DocumentTable from "./DocumentTable";
import DocumentModal from "./DocumentModal";
import GithubLinkForm from "./GithubLinkForm";

export default function Livrables() {
  const [documents, setDocuments] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [newDocument, setNewDocument] = useState({
    name: "",
    file: null,
  });
  const username = getUsernameFromToken();

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        if (username) {
          const docs = await getDocuments(username);
          setDocuments(docs);
        }
      } catch (error) {
        console.error("Failed to fetch documents:", error);
      }
    };

    fetchDocuments();
  }, [username]);

  const handleFileChange = (e) => {
    setNewDocument({
      ...newDocument,
      file: e.target.files[0],
    });
  };

  const handleNameChange = (e) => {
    setNewDocument({
      ...newDocument,
      name: e.target.value,
    });
  };

  const handleSubmitDocument = async (e) => {
    e.preventDefault();
    if (!newDocument.file || !username) return;

    setIsSubmitting(true);

    try {
      const doc = await submitDocument(username, newDocument);

      setDocuments((prev) => [
        ...prev,
        {
          id: doc.id,
          nom: doc.nom,
          type: doc.type,
          taille: doc.taille,
          dateSoumession: doc.dateSoumession?.toLocaleString() || new Date().toLocaleString(),
          path: doc.path,
          githubLink: null,
        },
      ]);

      setNewDocument({ name: "", file: null });
      setShowModal(false);
    } catch (error) {
      console.error("Error submitting document:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmitGithubLink = async (githubLink) => {
    if (!githubLink || !username) return;

    setIsSubmitting(true);

    try {
    
    return  await submitGithubLink(username, githubLink);

    } catch (error) {
      console.error("Error submitting GitHub link:", error);
    } finally {
      setIsSubmitting(false);
    }
  };


  const handleDeleteDocument = async (id) => {
    try {
      await deleteDocument(id);
      setDocuments((prev) => prev.filter((doc) => doc.id !== id));
    } catch (error) {
      console.error("Error deleting document:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2 mb-2">
          <FileText className="text-blue-800" size={20} />
          <span className="bg-gradient-to-r from-blue-700 to-gray-900 font-semibold bg-clip-text text-transparent">
            Soumission des Rapports
          </span>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="cursor-pointer px-4 py-2 bg-blue-600 text-white rounded-md text-size13 hover:bg-blue-700 flex items-center gap-2"
        >
          <Plus size={14} />
          Ajouter
        </button>
      </div>

      <DocumentTable
        documents={documents}
        onDelete={handleDeleteDocument}
      />

      <GithubLinkForm
        onSubmit={handleSubmitGithubLink}
        isSubmitting={isSubmitting}
      />

      <DocumentModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleSubmitDocument}
        documentData={newDocument}
        onFileChange={handleFileChange}
        onNameChange={handleNameChange}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}