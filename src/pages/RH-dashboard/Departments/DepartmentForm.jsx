import { Briefcase, Building2, Info, MapPin, UserRound } from "lucide-react";
import { useEffect, useState } from "react";

export default function DepartmentForm({ department, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    id: department?.id || null,
    name: department?.name || "",
    description: department?.description || "",
    chefUsername: department?.chefUsername || "",
    location: department?.location || "",
    sector: department?.sector || "",
    email: department?.email || "",
    entrepriseId: department?.entrepriseId || "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (department) {
      setFormData({
        id: department.id,
        name: department.name || "",
        description: department.description || "",
        chefUsername: department.chefUsername || "",
        location: department.location || "",
        sector: department.sector || "",
        email: department.email || "",
        entrepriseId: department.entrepriseId || "",
      });
      console.log("Loaded department for edit:", department);
    } else {
      setFormData({
        id: null,
        name: "",
        description: "",
        chefUsername: "",
        location: "",
        sector: "",
        email: "",
        entrepriseId: "",
      });
    }
  }, [department]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim())
      newErrors.name = "Le nom du département est requis";
    if (!formData.location.trim())
      newErrors.location = "La localisation est requise";
    if (!formData.sector.trim()) newErrors.sector = "Le secteur est requis";
    if (!formData.entrepriseId)
      newErrors.entrepriseId = "L'ID de l'entreprise est requis";

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Email invalide";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      console.log("Form data before submit:", formData);
      await onSubmit({
        ...formData,
        id: formData.id ? Number(formData.id) : null,
        entrepriseId: Number(formData.entrepriseId), // Ensure number
      });
    } catch (error) {
      setErrors({
        submit:
          error.message || "Une erreur s'est produite lors de la mise à jour",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Name Field */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700 flex items-center gap-2">
          <Building2 className="h-4 w-4" />
          Nom du département *
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={`mt-1 block w-full rounded-md border ${
            errors.name ? "border-red-500" : "border-gray-300"
          } shadow-sm px-4 py-2 focus:ring-indigo-500 focus:border-indigo-500`}
          placeholder="Ex: Département Informatique"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name}</p>
        )}
      </div>

      {/* Sector Field */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Secteur *
        </label>
        <select
          name="sector"
          value={formData.sector}
          onChange={handleChange}
          className={`mt-1 block w-full rounded-md border ${
            errors.sector ? "border-red-500" : "border-gray-300"
          } shadow-sm px-4 py-2 focus:ring-indigo-500 focus:border-indigo-500`}
        >
          <option value="">Sélectionner un secteur</option>
          <option value="Technologie">Technologie</option>
          <option value="Finance">Finance</option>
          <option value="Ressources Humaines">Ressources Humaines</option>
          <option value="Marketing">Marketing</option>
          <option value="Production">Production</option>
          <option value="Recherche & Développement">
            Recherche & Développement
          </option>
        </select>
        {errors.sector && (
          <p className="mt-1 text-sm text-red-600">{errors.sector}</p>
        )}
      </div>

      {/* Description Field */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700 flex items-center gap-2">
          <Info className="h-4 w-4" />
          Description
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 focus:ring-indigo-500 focus:border-indigo-500"
          rows={3}
          placeholder="Description des activités du département..."
        />
      </div>

      {/* chefUsername Field */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700 flex items-center gap-2">
          <UserRound className="h-4 w-4" />
          Responsable
        </label>
        <input
          type="text"
          name="chefUsername"
          value={formData.chefUsername}
          onChange={handleChange}
          className={`mt-1 block w-full rounded-md border ${
            errors.chefUsername ? "border-red-500" : "border-gray-300"
          } shadow-sm px-4 py-2 focus:ring-indigo-500 focus:border-indigo-500`}
          placeholder="Nom d'utilisateur du responsable"
        />
        {errors.chefUsername && (
          <p className="mt-1 text-sm text-red-600">{errors.chefUsername}</p>
        )}
      </div>

      {/* Location Field */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700 flex items-center gap-2">
          <MapPin className="h-4 w-4" />
          Localisation *
        </label>
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          className={`mt-1 block w-full rounded-md border ${
            errors.location ? "border-red-500" : "border-gray-300"
          } shadow-sm px-4 py-2 focus:ring-indigo-500 focus:border-indigo-500`}
          placeholder="Ex: Bâtiment A, étage 3"
        />
        {errors.location && (
          <p className="mt-1 text-sm text-red-600">{errors.location}</p>
        )}
      </div>

      {/* Entreprise ID Field */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700 flex items-center gap-2">
          <Briefcase className="h-4 w-4" />
          ID de l'entreprise *
        </label>
        <input
          type="number"
          name="entrepriseId"
          value={formData.entrepriseId}
          onChange={handleChange}
          className={`mt-1 block w-full rounded-md border ${
            errors.entrepriseId ? "border-red-500" : "border-gray-300"
          } shadow-sm px-4 py-2 focus:ring-indigo-500 focus:border-indigo-500`}
          placeholder="Ex: 1"
        />
        {errors.entrepriseId && (
          <p className="mt-1 text-sm text-red-600">{errors.entrepriseId}</p>
        )}
      </div>

      {/* Email Field */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={`mt-1 block w-full rounded-md border ${
            errors.email ? "border-red-500" : "border-gray-300"
          } shadow-sm px-4 py-2 focus:ring-indigo-500 focus:border-indigo-500`}
          placeholder="contact@departement.com"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email}</p>
        )}
      </div>

      {/* Form Actions */}
      <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
        <button
          type="button"
          onClick={onCancel}
          disabled={isSubmitting}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Annuler
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className={`px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
            isSubmitting ? "opacity-75 cursor-not-allowed" : ""
          }`}
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center">
              <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              {department ? "Mise à jour..." : "Création..."}
            </span>
          ) : department ? (
            "Mettre à jour"
          ) : (
            "Créer le département"
          )}
        </button>
      </div>

      {errors.submit && (
        <p className="mt-4 text-sm text-red-600">{errors.submit}</p>
      )}
      <p className="text-xs text-gray-500 mt-4">* Champs obligatoires</p>
    </form>
  );
}
