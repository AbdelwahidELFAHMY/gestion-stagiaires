import { useState } from "react";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Building2,
  UserCog,
  CheckCircle,
  Mail,
  Phone,
  MapPin,
  Factory,
  User,
  Key,
  Smartphone,
  Building,
  Globe,
  Image,
} from "lucide-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddCompanyModal = ({ onClose, onSave }) => {
  const MAX_FILE_SIZE = 5 * 1024 * 1024;
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const [entreprise, setEntreprise] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    industry: "",
    website: "",
    isActive: true,
    logo: null, // Ajout pour stocker le logo
    logoPreview: null, // Prévisualisation du logo
  });

  const [rh, setRh] = useState({
    username: "",
    password: "",
    nom: "",
    prenom: "",
    phone: "",
    adresse: "",
    photo: null, // Ajout pour stocker la photo
    photoPreview: null, // Prévisualisation de la photo
  });

  const handleEntrepriseChange = (e) => {
    const { name, value } = e.target;
    setEntreprise((prev) => ({ ...prev, [name]: value }));
  };

  const handleRhChange = (e) => {
    const { name, value } = e.target;
    setRh((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmitError(null);
  
    try {
      await onSave({ entreprise, rh });
    } catch (error) {
      console.error("Erreur lors de la soumission", error);
      setSubmitError(error);
    } finally {
      setIsSubmitting(false);
      onClose();
    }
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > MAX_FILE_SIZE) {
        toast.error("Le logo ne doit pas dépasser 5MB");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setEntreprise((prev) => ({
          ...prev,
          logo: file,
          logoPreview: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > MAX_FILE_SIZE) {
        toast.error("La photo ne doit pas dépasser 5MB");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setRh((prev) => ({
          ...prev,
          photo: file,
          photoPreview: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const nextStep = () => {
    if (step < 3) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div
        className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-3xl flex flex-col"
        style={{ maxHeight: "92.5vh" }}
      >
        {/* Header */}
        <div className="flex justify-between items-center py-3 px-5  border-b dark:border-gray-600">
          <h3 className="text-size14 font-semibold dark:text-gray-200 flex items-center gap-4">
            {step === 1 && <Building2 size={20} />}
            {step === 2 && <UserCog size={20} />}
            {step === 3 && <CheckCircle size={20} />}
            {step === 1 && "Informations d'Entreprise"}
            {step === 2 && "Responsable RH"}
            {step === 3 && "Confirmation"}
          </h3>
          <button
            onClick={onClose}
            className="cursor-pointer text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            <X size={20} />
          </button>
        </div>

        {/* Progress Steps */}
        <div className="px-10 py-4 mb-4">
          <div className="flex items-center justify-between relative">
            {/* Ligne de fond (grisée) */}
            <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-gray-200 dark:bg-gray-700 -translate-y-1/2 z-0"></div>

            {/* Ligne colorée (progression) */}
            <div
              className="absolute top-1/2 left-0 h-[2px] bg-blue-500 -translate-y-1/2 z-0 transition-all duration-300"
              style={{
                width: `${((step - 1) / 2) * 100}%`,
                backgroundColor: step === 3 ? "#10B981" : "#3B82F6", // Vert si complété, bleu sinon
              }}
            ></div>

            {[1, 2, 3].map((stepNumber) => (
              <div key={stepNumber} className="relative z-10">
                <div
                  className={`w-6 h-6 rounded-full text-size11 text-center flex items-center justify-center transition-all ${
                    step === stepNumber
                      ? "bg-blue-500 text-gray-50 border-2 border-blue-400 shadow-lg"
                      : step > stepNumber
                      ? "bg-green-500 text-white border-2 border-green-400"
                      : "bg-white dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-300"
                  }`}
                >
                  {stepNumber}
                </div>
                <div
                  className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 text-size10 font-medium whitespace-nowrap ${
                    step >= stepNumber
                      ? "text-gray-800 dark:text-gray-200"
                      : "text-gray-400 dark:text-gray-500"
                  }`}
                >
                  {stepNumber === 1 && "Entreprise"}
                  {stepNumber === 2 && "Responsable RH"}
                  {stepNumber === 3 && "Confirmation"}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="flex-1 overflow-y-auto py-10 px-8">
          {step === 1 && (
            <div className="space-y-6">
              <div className="text-size13 grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-1">
                  <label className="flex items-center gap-3 font-medium text-gray-700 dark:text-gray-300">
                    <Building size={14} /> Nom *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={entreprise.name}
                    onChange={handleEntrepriseChange}
                    className="w-full px-4 py-2 border-thin rounded-sm focus:outline-none bg-gray-100 border-gray-200 focus:border-blue-200 dark:bg-gray-700 dark:border-gray-600 focus:dark:border-gray-500 "
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="flex items-center gap-3 font-medium text-gray-700 dark:text-gray-300">
                    <Mail size={14} /> Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={entreprise.email}
                    onChange={handleEntrepriseChange}
                    className="w-full px-4 py-2 border-thin rounded-sm focus:outline-none bg-gray-100 border-gray-200 focus:border-blue-200 dark:bg-gray-700 dark:border-gray-600 focus:dark:border-gray-500 "
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="flex items-center gap-3 font-medium text-gray-700 dark:text-gray-300">
                    <Phone size={14} /> Téléphone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={entreprise.phone}
                    onChange={handleEntrepriseChange}
                    className="w-full px-4 py-2 border-thin rounded-sm focus:outline-none bg-gray-100 border-gray-200 focus:border-blue-200 dark:bg-gray-700 dark:border-gray-600 focus:dark:border-gray-500 "
                  />
                </div>

                <div className="space-y-1">
                  <label className="flex items-center gap-3 font-medium text-gray-700 dark:text-gray-300">
                    <MapPin size={14} /> Adresse
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={entreprise.address}
                    onChange={handleEntrepriseChange}
                    className="w-full px-4 py-2 border-thin rounded-sm focus:outline-none bg-gray-100 border-gray-200 focus:border-blue-200 dark:bg-gray-700 dark:border-gray-600 focus:dark:border-gray-500 "
                  />
                </div>

                <div className="space-y-1">
                  <label className="flex items-center gap-3 font-medium text-gray-700 dark:text-gray-300">
                    <Factory size={14} /> Secteur d'activité
                  </label>
                  <input
                    type="text"
                    name="industry"
                    value={entreprise.industry}
                    onChange={handleEntrepriseChange}
                    className="w-full px-4 py-2 border-thin rounded-sm focus:outline-none bg-gray-100 border-gray-200 focus:border-blue-200 dark:bg-gray-700 dark:border-gray-600 focus:dark:border-gray-500 "
                  />
                </div>

                <div className="space-y-1">
                  <label className="flex items-center gap-3 font-medium text-gray-700 dark:text-gray-300">
                    <Globe size={14} /> Site web
                  </label>
                  <input
                    type="url"
                    name="website"
                    value={entreprise.website}
                    onChange={handleEntrepriseChange}
                    className="w-full px-4 py-2 border-thin rounded-sm focus:outline-none bg-gray-100 border-gray-200 focus:border-blue-200 dark:bg-gray-700 dark:border-gray-600 focus:dark:border-gray-500"
                  />
                </div>

                <div className="space-y-2 ">
                  <label className="flex items-center gap-3 font-medium text-gray-700 dark:text-gray-300">
                    <Image size={14} />
                    Logo de l'entreprise
                  </label>

                  <label className="block ">
                    <span className="sr-only ">Choisir un fichier</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleLogoUpload}
                      className="block w-full text-size13 text-gray-500
          file:mr-4 file:py-2 file:px-4
          file:rounded-full file:border-0
          file:bg-gray-200 hover:file:bg-gray-300
          file:text-gray-700
          hover:file:cursor-pointer
          dark:file:bg-gray-600 dark:hover:file:bg-gray-500
          dark:file:text-gray-200"
                    />
                  </label>
                </div>

                <div className="flex items-center space-x-2 pt-6">
                  <input
                    type="checkbox"
                    id="isActive"
                    name="isActive"
                    checked={entreprise.isActive}
                    onChange={(e) =>
                      setEntreprise((prev) => ({
                        ...prev,
                        isActive: e.target.checked,
                      }))
                    }
                    className="w-4 h-4 cursor-pointer text-blue-600 rounded-sm focus:ring-blue-500"
                  />
                  <label
                    htmlFor="isActive"
                    className="text-size14 text-gray-700 dark:text-gray-300"
                  >
                    Entreprise active
                  </label>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div className="text-size13 grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-1">
                  <label className="flex items-center gap-3 font-medium text-gray-700 dark:text-gray-300">
                    <User size={14} /> Nom *
                  </label>
                  <input
                    type="text"
                    name="nom"
                    value={rh.nom}
                    onChange={handleRhChange}
                    className="w-full px-4 py-2 border-thin rounded-sm focus:outline-none bg-gray-100 border-gray-200 focus:border-blue-200 dark:bg-gray-700 dark:border-gray-600 focus:dark:border-gray-500 "
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="flex items-center gap-3 font-medium text-gray-700 dark:text-gray-300">
                    <User size={14} /> Prénom *
                  </label>
                  <input
                    type="text"
                    name="prenom"
                    value={rh.prenom}
                    onChange={handleRhChange}
                    className="w-full px-4 py-2 border-thin rounded-sm focus:outline-none bg-gray-100 border-gray-200 focus:border-blue-200 dark:bg-gray-700 dark:border-gray-600 focus:dark:border-gray-500 "
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="flex items-center gap-3 font-medium text-gray-700 dark:text-gray-300">
                    <User size={14} /> Nom d'utilisateur *
                  </label>
                  <input
                    type="text"
                    name="username"
                    value={rh.username}
                    onChange={handleRhChange}
                    className="w-full px-4 py-2 border-thin rounded-sm focus:outline-none bg-gray-100 border-gray-200 focus:border-blue-200 dark:bg-gray-700 dark:border-gray-600 focus:dark:border-gray-500 "
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="flex items-center gap-3 font-medium text-gray-700 dark:text-gray-300">
                    <Key size={14} /> Mot de passe *
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={rh.password}
                    onChange={handleRhChange}
                    className="w-full px-4 py-2 border-thin rounded-sm focus:outline-none bg-gray-100 border-gray-200 focus:border-blue-200 dark:bg-gray-700 dark:border-gray-600 focus:dark:border-gray-500 "
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="flex items-center gap-3 font-medium text-gray-700 dark:text-gray-300">
                    <Smartphone size={14} /> Téléphone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={rh.phone}
                    onChange={handleRhChange}
                    className="w-full px-4 py-2 border-thin rounded-sm focus:outline-none bg-gray-100 border-gray-200 focus:border-blue-200 dark:bg-gray-700 dark:border-gray-600 focus:dark:border-gray-500 "
                  />
                </div>

                <div className="space-y-1">
                  <label className="flex items-center gap-3 font-medium text-gray-700 dark:text-gray-300">
                    <MapPin size={14} /> Adresse
                  </label>
                  <input
                    type="text"
                    name="adresse"
                    value={rh.adresse}
                    onChange={handleRhChange}
                    className="w-full px-4 py-2 border-thin rounded-sm focus:outline-none bg-gray-100 border-gray-200 focus:border-blue-200 dark:bg-gray-700 dark:border-gray-600 focus:dark:border-gray-500 "
                  />
                </div>

                <div className="space-y-2 ">
                  <label className="flex items-center gap-3 font-medium text-gray-700 dark:text-gray-300">
                    <Image size={14} />
                    Photo de profile
                  </label>

                  <label className="block ">
                    <span className="sr-only ">Choisir un fichier</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoUpload}
                      className="block w-full text-size13 text-gray-500
          file:mr-4 file:py-2 file:px-4
          file:rounded-full file:border-0
          file:bg-gray-200 hover:file:bg-gray-300
          file:text-gray-700
          hover:file:cursor-pointer
          dark:file:bg-gray-600 dark:hover:file:bg-gray-500
          dark:file:text-gray-200"
                    />
                  </label>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="max-h-full space-y-6">
              <div className="bg-gray-100 dark:bg-gray-700 p-5 rounded-xl">
                <h5 className=" font-medium text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-3">
                  <Building2 size={18} /> Entreprise
                </h5>
                <div className="flex gap-6">
                  {/* Colonne gauche - Texte */}
                  <div className="grid grid-cols-2 text-sm flex-1">
                    <div className="text-gray-800 dark:text-gray-300">Nom:</div>
                    <div className="font-medium">{entreprise.name}</div>
                    <div className="text-gray-800 dark:text-gray-300">
                      Email:
                    </div>
                    <div className="font-medium">{entreprise.email}</div>
                    <div className="text-gray-800 dark:text-gray-300">
                      Téléphone:
                    </div>
                    <div className="font-medium">{entreprise.phone || "-"}</div>
                    <div className="text-gray-800 dark:text-gray-300">
                      Adresse:
                    </div>
                    <div className="font-medium">
                      {entreprise.address || "-"}
                    </div>
                    <div className="text-gray-800 dark:text-gray-300">
                      Website:
                    </div>
                    <div className="font-medium">
                      {entreprise.website || "-"}
                    </div>
                    <div className="text-gray-800 dark:text-gray-300">
                      Secteur:
                    </div>
                    <div className="font-medium">
                      {entreprise.industry || "-"}
                    </div>
                    <div className="text-gray-800 dark:text-gray-300">
                      Statut:
                    </div>
                    <div
                      className={`font-medium ${
                        entreprise.isActive ? "text-green-500" : "text-red-500"
                      }`}
                    >
                      {entreprise.isActive ? "Activée" : "Désactivée"}
                    </div>
                  </div>

                  {/* Colonne droite - Logo */}
                  <div className="w-40 h-40 bg-gray-200 dark:bg-gray-600 rounded-lg flex items-center justify-center overflow-hidden">
                    {entreprise.logoPreview ? (
                      <img
                        src={entreprise.logoPreview}
                        alt="Logo entreprise"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Image size={48} className="text-gray-400" />
                    )}
                  </div>
                </div>
              </div>

              <div className="bg-gray-100 dark:bg-gray-700 p-5 rounded-xl">
                <h5 className=" font-medium text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-3">
                  <UserCog size={18} /> Responsable RH
                </h5>
                <div className="flex gap-6">
                  {/* Colonne gauche - Texte */}
                  <div className="grid grid-cols-2 text-sm flex-1">
                    <div className="text-gray-800 dark:text-gray-300">
                      Nom complet:
                    </div>
                    <div className="font-medium">
                      {rh.nom} {rh.prenom}
                    </div>
                    <div className="text-gray-800 dark:text-gray-300">
                      Nom d'utilisateur:
                    </div>
                    <div className="font-medium">{rh.username}</div>
                    <div className="text-gray-800 dark:text-gray-300">
                      Téléphone:
                    </div>
                    <div className="font-medium">{rh.phone || "-"}</div>
                    <div className="text-gray-800 dark:text-gray-300">
                      Adresse:
                    </div>
                    <div className="font-medium">{rh.adresse || "-"}</div>
                  </div>

                  {/* Colonne droite - Photo */}
                  <div className="w-40 h-40 bg-gray-200 dark:bg-gray-600 rounded-lg flex items-center justify-center overflow-hidden">
                    {rh.photoPreview ? (
                      <img
                        src={rh.photoPreview}
                        alt="Photo RH"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User size={48} className="text-gray-400" />
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-between px-8 py-4 ">
          <div>
            {step > 1 && (
              <button
                onClick={prevStep}
                className="cursor-pointer flex items-center text-size14 gap-2 px-4 py-2.5 bg-blue-600 text-gray-100 rounded-sm hover:bg-blue-500 transition-colors"
              >
                <ChevronLeft size={13} /> Précédent
              </button>
            )}
          </div>

          <div className="flex gap-3">
            {step < 3 ? (
              <button
                onClick={nextStep}
                className="cursor-pointer flex items-center text-size14 gap-2 px-4 py-2.5 bg-blue-600 text-gray-100 rounded-sm hover:bg-blue-500 transition-colors"
              >
                Suivant <ChevronRight size={13} />
              </button>
            ) : (
              <button
              type="submit"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className={`cursor-pointer flex items-center justify-center text-size14 gap-2 px-4 py-2.5 ${
                  isSubmitting
                    ? "bg-green-700"
                    : "bg-green-600 hover:bg-green-700"
                } text-gray-100 rounded-sm transition-colors min-w-40`}
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <svg
                      className="animate-spin h-4 w-4 text-white"
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
                    <span className="transition-opacity duration-300">
                      Enregistrement...
                    </span>
                  </div>
                ) : (
                  <>
                    <CheckCircle size={13} /> Confirmer et Enregistrer
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCompanyModal;
