import { useState, useEffect } from "react";
import axiosInstance from "./axiosInstance";

function CompanyLogo({ logoUrl, alt, className }) {
  const [imageSrc, setImageSrc] = useState("");

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await axiosInstance.get(logoUrl, {
          responseType: 'blob', // Important pour les images
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
          }
        });
        
        const reader = new FileReader();
        reader.onloadend = () => {
          setImageSrc(reader.result);
        };
        reader.readAsDataURL(response.data);
      } catch (error) {
        console.error("Error loading image:", error);
        setImageSrc("/default-logo.png"); // Chemin vers votre image par défaut
      }
    };

    fetchImage();

    return () => {
      // Nettoyage
      if (imageSrc) URL.revokeObjectURL(imageSrc);
    };
  }, [logoUrl]);

  return (
    <img
      src={imageSrc}
      alt={alt}
      className={className}
      onError={(e) => {
        e.target.onerror = null;
        e.target.src = "/default-logo.png";
      }}
    />
  );
}

export default CompanyLogo;