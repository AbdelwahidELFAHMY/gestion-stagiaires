import React, { useEffect, useState } from "react";
import { getUsernameFromToken } from "../../../utils/getUsernameFromToken";
import axiosInstance from "../../../utils/axiosInstance";

const GithubLinkForm = ({ onSubmit, isSubmitting }) => {
  const [githubLink, setGithubLink] = useState("");
  const [existingLink, setExistingLink] = useState(null);
  const username = getUsernameFromToken();

  useEffect(() => {
    const fetchGitHubLink = async () => {
      if (!username) return;

      try {
        const response = await axiosInstance.get(`/livrables/github/${username}`);
        if (response.data) {
          setExistingLink(response.data);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchGitHubLink();
  }, [username]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!githubLink) return;
    
    setExistingLink(onSubmit(githubLink));
    setGithubLink("");
  };

  return (
    <div className="mt-10 bg-white rounded-md border-thin border-gray-100 p-6">
      <h2 className="text-size13 font-medium mb-4">
        {existingLink ? "Votre lien GitHub" : "Ajouter lien GitHub de votre repo"}
      </h2>
      
      {existingLink && (
        <div className="mb-4">
          <p className="text-sm text-gray-700 mb-2">Lien actuel :</p>
          <a 
            href={existingLink} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline break-all"
          >
            {existingLink}
          </a>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="flex items-end gap-4">
        <div className="flex-grow">
          <label className="block text-xs font-medium text-gray-700 mb-1">
            {existingLink ? "Mettre à jour le lien GitHub" : "Lien GitHub"} <span className="text-red-500">*</span>
          </label>
          <input
            type="url"
            value={githubLink}
            onChange={(e) => setGithubLink(e.target.value)}
            placeholder="https://github.com/votre-repo"
            required
            className="w-full px-3 py-2 border-thin placeholder:text-size11 text-size12 border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <button
          type="submit"
          disabled={isSubmitting || !githubLink}
          className={`px-3 py-2 rounded-md cursor-pointer text-white font-medium text-size12 ${
            isSubmitting || !githubLink
              ? "bg-green-300"
              : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {isSubmitting 
            ? "Envoi en cours..." 
            : existingLink 
              ? "Mettre à jour" 
              : "Soumettre le lien"}
        </button>
      </form>
    </div>
  );
};

export default GithubLinkForm;