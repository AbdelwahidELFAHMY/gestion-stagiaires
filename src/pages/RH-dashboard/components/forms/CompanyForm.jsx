import {
  Award,
  BarChart2,
  Building2,
  Calendar,
  Globe,
  Mail,
  MapPin,
  Phone,
  Shield,
  Users,
} from "lucide-react";
import { useState } from "react";

export default function CompanyForm({ company, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    name: company?.name || "",
    email: company?.email || "",
    phone: company?.phone || "",
    sector: company?.sector || "",
    location: company?.location || "",
    website: company?.website || "",
    founded: company?.founded || "",
    employees: company?.employees || "",
    interns: company?.interns || "",
    revenue: company?.revenue || "",
    description: company?.description || "",
    mission: company?.mission || "",
    values: company?.values?.join("\n") || "",
    socialMedia: {
      linkedin: company?.socialMedia?.linkedin || "",
      twitter: company?.socialMedia?.twitter || "",
      github: company?.socialMedia?.github || "",
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const formattedData = {
      ...formData,
      values: formData.values.split("\n").filter((v) => v.trim() !== ""),
    };
    onSubmit(formattedData);
  };

  const handleSocialMediaChange = (platform, value) => {
    setFormData({
      ...formData,
      socialMedia: {
        ...formData.socialMedia,
        [platform]: value,
      },
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Company Basic Info */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900 border-b pb-2">
            Informations de base
          </h3>

          <div>
            <label className="flex items-center text-sm font-medium text-gray-700">
              <Building2 className="mr-2 text-gray-500" size={16} />
              Nom de l'entreprise
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="flex items-center text-sm font-medium text-gray-700">
              <Mail className="mr-2 text-gray-500" size={16} />
              Email
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="flex items-center text-sm font-medium text-gray-700">
              <Phone className="mr-2 text-gray-500" size={16} />
              Téléphone
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="flex items-center text-sm font-medium text-gray-700">
              <MapPin className="mr-2 text-gray-500" size={16} />
              Localisation
            </label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) =>
                setFormData({ ...formData, location: e.target.value })
              }
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="flex items-center text-sm font-medium text-gray-700">
              <Globe className="mr-2 text-gray-500" size={16} />
              Site Web
            </label>
            <div className="mt-1 flex rounded-lg shadow-sm">
              <span className="inline-flex items-center rounded-l-lg border border-r-0 border-gray-300 bg-gray-50 px-3 text-gray-500 sm:text-sm">
                https://
              </span>
              <input
                type="text"
                value={formData.website}
                onChange={(e) =>
                  setFormData({ ...formData, website: e.target.value })
                }
                className="block w-full min-w-0 flex-1 rounded-none rounded-r-lg border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
                placeholder="votresite.com"
              />
            </div>
          </div>

          <div>
            <label className="flex items-center text-sm font-medium text-gray-700">
              <Calendar className="mr-2 text-gray-500" size={16} />
              Année de création
            </label>
            <input
              type="text"
              value={formData.founded}
              onChange={(e) =>
                setFormData({ ...formData, founded: e.target.value })
              }
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="2010"
            />
          </div>
        </div>

        {/* Company Stats */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900 border-b pb-2">
            Chiffres clés
          </h3>

          <div>
            <label className="flex items-center text-sm font-medium text-gray-700">
              <Users className="mr-2 text-gray-500" size={16} />
              Nombre d'employés
            </label>
            <input
              type="number"
              value={formData.employees}
              onChange={(e) =>
                setFormData({ ...formData, employees: e.target.value })
              }
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              min="0"
            />
          </div>

          <div>
            <label className="flex items-center text-sm font-medium text-gray-700">
              <Users className="mr-2 text-gray-500" size={16} />
              Nombre de stagiaires
            </label>
            <input
              type="number"
              value={formData.interns}
              onChange={(e) =>
                setFormData({ ...formData, interns: e.target.value })
              }
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              min="0"
            />
          </div>

          <div>
            <label className="flex items-center text-sm font-medium text-gray-700">
              <BarChart2 className="mr-2 text-gray-500" size={16} />
              Chiffre d'affaires
            </label>
            <input
              type="text"
              value={formData.revenue}
              onChange={(e) =>
                setFormData({ ...formData, revenue: e.target.value })
              }
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="€10M"
            />
          </div>

          <div>
            <label className="flex items-center text-sm font-medium text-gray-700">
              <Shield className="mr-2 text-gray-500" size={16} />
              Secteur d'activité
            </label>
            <select
              value={formData.sector}
              onChange={(e) =>
                setFormData({ ...formData, sector: e.target.value })
              }
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            >
              <option value="">Sélectionner un secteur</option>
              <option value="Technologie de l'Information">
                Technologie de l'Information
              </option>
              <option value="Finance">Finance</option>
              <option value="Santé">Santé</option>
              <option value="Éducation">Éducation</option>
              <option value="Industrie">Industrie</option>
              <option value="Commerce">Commerce</option>
              <option value="Services">Services</option>
              <option value="Autre">Autre</option>
            </select>
          </div>
        </div>
      </div>

      {/* Company Description */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 border-b pb-2 mb-4">
          Description de l'entreprise
        </h3>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Description générale
          </label>
          <textarea
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            rows={4}
            placeholder="Décrivez votre entreprise, ses activités principales et ses spécialités..."
          />
        </div>
      </div>

      {/* Mission & Values */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-medium text-gray-900 border-b pb-2 mb-4 flex items-center">
            <Award className="mr-2 text-gray-500" size={16} />
            Mission
          </h3>
          <textarea
            value={formData.mission}
            onChange={(e) =>
              setFormData({ ...formData, mission: e.target.value })
            }
            className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            rows={3}
            placeholder="Quelle est la mission principale de votre entreprise ?"
          />
        </div>
        <div>
          <h3 className="text-lg font-medium text-gray-900 border-b pb-2 mb-4 flex items-center">
            <Shield className="mr-2 text-gray-500" size={16} />
            Valeurs
          </h3>
          <textarea
            value={formData.values}
            onChange={(e) =>
              setFormData({ ...formData, values: e.target.value })
            }
            className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            rows={3}
            placeholder="Entrez une valeur par ligne"
          />
          <p className="mt-1 text-xs text-gray-500">
            Séparez chaque valeur par un retour à la ligne
          </p>
        </div>
      </div>

      {/* Social Media */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 border-b pb-2 mb-4">
          Réseaux sociaux
        </h3>
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              LinkedIn
            </label>
            <div className="mt-1 flex rounded-lg shadow-sm">
              <span className="inline-flex items-center rounded-l-lg border border-r-0 border-gray-300 bg-gray-50 px-3 text-gray-500 sm:text-sm">
                linkedin.com/company/
              </span>
              <input
                type="text"
                value={formData.socialMedia.linkedin.replace(
                  "linkedin.com/company/",
                  ""
                )}
                onChange={(e) =>
                  handleSocialMediaChange("linkedin", e.target.value)
                }
                className="block w-full min-w-0 flex-1 rounded-none rounded-r-lg border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
                placeholder="nom-entreprise"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Twitter
            </label>
            <div className="mt-1 flex rounded-lg shadow-sm">
              <span className="inline-flex items-center rounded-l-lg border border-r-0 border-gray-300 bg-gray-50 px-3 text-gray-500 sm:text-sm">
                twitter.com/
              </span>
              <input
                type="text"
                value={formData.socialMedia.twitter.replace("twitter.com/", "")}
                onChange={(e) =>
                  handleSocialMediaChange("twitter", e.target.value)
                }
                className="block w-full min-w-0 flex-1 rounded-none rounded-r-lg border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
                placeholder="nom-entreprise"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              GitHub
            </label>
            <div className="mt-1 flex rounded-lg shadow-sm">
              <span className="inline-flex items-center rounded-l-lg border border-r-0 border-gray-300 bg-gray-50 px-3 text-gray-500 sm:text-sm">
                github.com/
              </span>
              <input
                type="text"
                value={formData.socialMedia.github.replace("github.com/", "")}
                onChange={(e) =>
                  handleSocialMediaChange("github", e.target.value)
                }
                className="block w-full min-w-0 flex-1 rounded-none rounded-r-lg border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
                placeholder="nom-entreprise"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Form Actions */}
      <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Annuler
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          {company ? "Mettre à jour" : "Créer l'entreprise"}
        </button>
      </div>
    </form>
  );
}
