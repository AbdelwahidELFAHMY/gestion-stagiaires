import { useState } from "react";
import { motion } from "framer-motion";
import { FaUserEdit } from "react-icons/fa";
import { MdClose } from "react-icons/md";

const Profile = ({ isOpen, onClose, user }) => {
  const [formData, setFormData] = useState({ ...user });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[rgba(0,0,0,0.6)] flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className="bg-white p-6 rounded-lg shadow-lg w-[600px]"
      >
        <div className="flex justify-between items-center border-b pb-2 mb-4">
          <h2 className="text-xl font-semibold flex items-center">
            <FaUserEdit className="mr-2" /> Modifier le profil
          </h2>
          <button onClick={onClose} className="text-gray-600 hover:text-red-500">
            <MdClose size={24} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          {/* Colonne 1 : Infos personnelles */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Informations personnelles</h3>
            <label className="block mb-2">Nom</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full p-2 border rounded" />
            
            <label className="block mt-2 mb-2">Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full p-2 border rounded" />
            
            <label className="block mt-2 mb-2">Téléphone</label>
            <input type="text" name="phone" value={formData.phone} onChange={handleChange} className="w-full p-2 border rounded" />
          </div>

          {/* Colonne 2 : Infos académiques */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Informations académiques</h3>
            <label className="block mb-2">Établissement</label>
            <input type="text" name="school" value={formData.school} onChange={handleChange} className="w-full p-2 border rounded" />
            
            <label className="block mt-2 mb-2">Filière</label>
            <input type="text" name="field" value={formData.field} onChange={handleChange} className="w-full p-2 border rounded" />
            
            <label className="block mt-2 mb-2">Niveau d'étude</label>
            <input type="text" name="level" value={formData.level} onChange={handleChange} className="w-full p-2 border rounded" />
          </div>
        </form>
        <div className="flex justify-end mt-4">
          <button onClick={onClose} className="px-4 py-2 bg-gray-400 text-white rounded mr-2">Annuler</button>
          <button onClick={handleSubmit} className="px-4 py-2 bg-blue-600 text-white rounded">Enregistrer</button>
        </div>
      </motion.div>
    </div>
  );
};

export default Profile;