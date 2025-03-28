import {
  Award,
  BarChart2,
  Building2,
  Calendar,
  ChevronDown,
  ChevronUp,
  Edit,
  Globe,
  Link,
  Mail,
  MapPin,
  Phone,
  Shield,
  Users,
} from "lucide-react";
import React, { useState } from "react";
import CompanyForm from "./components/forms/CompanyForm";
import Modal from "./components/Modal";

function CompaniesContent() {
  const [expandedSection, setExpandedSection] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [company, setCompany] = useState({
    name: "Entreprise XYZ",
    email: "contact@entreprisexyz.com",
    phone: "+33 1 23 45 67 89",
    sector: "Technologie de l'Information",
    location: "Paris, France",
    employees: 50,
    interns: 5,
    website: "entreprisexyz.com",
    founded: "2010",
    revenue: "€10M",
    description:
      "Entreprise XYZ est un leader dans le secteur technologique, spécialisée dans le développement de solutions logicielles innovantes pour les entreprises Fortune 500. Notre plateforme primée transforme les opérations commerciales grâce à l'IA et l'analytique avancée.",
    mission:
      "Accélérer la transformation numérique des entreprises grâce à des solutions technologiques intuitives et performantes.",
    values: [
      "Innovation continue",
      "Excellence technique",
      "Collaboration transparente",
      "Impact client",
    ],
    socialMedia: {
      linkedin: "linkedin.com/company/entreprisexyz",
      twitter: "twitter.com/entreprisexyz",
      github: "github.com/entreprisexyz",
    },
    certifications: [
      "ISO 27001",
      "GDPR Compliant",
      "Tech Innovator Award 2023",
    ],
    leadership: [
      {
        name: "Jean Dupont",
        title: "PDG & Fondateur",
        bio: "20+ ans d'expérience en technologie d'entreprise",
      },
      {
        name: "Marie Lambert",
        title: "Directrice Technique",
        bio: "Spécialiste en architecture cloud native",
      },
    ],
  });

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  // const handleEdit = () => {
  //   setIsEditModalOpen(!isEditModalOpen);
  // };
  const handleSubmit = (data) => {
    console.log("Form submitted:", data);
    // toast.success(selectedIntern ? "Stagiaire mis à jour" : "Stagiaire ajouté");
    setIsEditModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 max-w-7xl mx-auto">
      {/* Main Company Card */}
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        {/* Hero Header */}
        <div className="relative">
          <div className="h-48 bg-gradient-to-r from-blue-600 to-blue-800"></div>
          <div className="absolute -bottom-16 left-6">
            <div className="h-32 w-32 rounded-xl bg-white shadow-xl flex items-center justify-center border-4 border-white">
              <Building2 className="text-blue-600" size={56} />
            </div>
          </div>
        </div>

        {/* Company Header */}
        <div className="pt-20 px-6 pb-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {company.name}
              </h1>
              <div className="flex items-center mt-2 space-x-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-sm font-medium">
                  {company.sector}
                </span>
                <span className="inline-flex items-center text-gray-500">
                  <MapPin className="mr-1" size={16} />
                  {company.location}
                </span>
                <span className="inline-flex items-center text-gray-500">
                  <Calendar className="mr-1" size={16} />
                  Fondé en {company.founded}
                </span>
              </div>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => setIsEditModalOpen(true)}
                className="flex items-center gap-2 bg-white hover:bg-gray-50 text-blue-600 border border-blue-200 px-4 py-2 rounded-lg transition-colors shadow-sm"
              >
                <Edit size={18} />
                Modifier le profil
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            <button className="py-4 px-1 border-b-2 border-blue-500 text-blue-600 font-medium">
              Aperçu
            </button>
            <button className="py-4 px-1 text-gray-500 hover:text-gray-700 font-medium">
              Opportunités
            </button>
            <button className="py-4 px-1 text-gray-500 hover:text-gray-700 font-medium">
              Équipe
            </button>
            <button className="py-4 px-1 text-gray-500 hover:text-gray-700 font-medium">
              Avis
            </button>
          </nav>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 p-6">
          {/* Left Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Contact Card */}
            <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
              <h3 className="font-semibold text-lg text-gray-900 mb-4">
                Coordonnées
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="bg-blue-100 p-2 rounded-lg mr-3">
                    <Mail className="text-blue-600" size={18} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <a
                      href={`mailto:${company.email}`}
                      className="text-gray-700 hover:text-blue-600"
                    >
                      {company.email}
                    </a>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-blue-100 p-2 rounded-lg mr-3">
                    <Phone className="text-blue-600" size={18} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Téléphone</p>
                    <a
                      href={`tel:${company.phone}`}
                      className="text-gray-700 hover:text-blue-600"
                    >
                      {company.phone}
                    </a>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-blue-100 p-2 rounded-lg mr-3">
                    <Globe className="text-blue-600" size={18} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Site Web</p>
                    <a
                      href={`https://${company.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-700 hover:text-blue-600 flex items-center"
                    >
                      {company.website}
                      <Link className="ml-1" size={14} />
                    </a>
                  </div>
                </li>
              </ul>
            </div>

            {/* Stats Card */}
            <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
              <h3 className="font-semibold text-lg text-gray-900 mb-4">
                Chiffres clés
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg shadow-xs border border-gray-100">
                  <div className="flex items-center text-gray-500 mb-1">
                    <Users size={16} className="mr-2" />
                    <span className="text-xs">Employés</span>
                  </div>
                  <p className="text-2xl font-bold">{company.employees}</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-xs border border-gray-100">
                  <div className="flex items-center text-gray-500 mb-1">
                    <Users size={16} className="mr-2" />
                    <span className="text-xs">Stagiaires</span>
                  </div>
                  <p className="text-2xl font-bold">{company.interns}</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-xs border border-gray-100">
                  <div className="flex items-center text-gray-500 mb-1">
                    <Calendar size={16} className="mr-2" />
                    <span className="text-xs">Fondé en</span>
                  </div>
                  <p className="text-2xl font-bold">{company.founded}</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-xs border border-gray-100">
                  <div className="flex items-center text-gray-500 mb-1">
                    <BarChart2 size={16} className="mr-2" />
                    <span className="text-xs">Chiffre d'affaires</span>
                  </div>
                  <p className="text-2xl font-bold">{company.revenue}</p>
                </div>
              </div>
            </div>

            {/* Social Media Card */}
            <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
              <h3 className="font-semibold text-lg text-gray-900 mb-4">
                Réseaux sociaux
              </h3>
              <div className="space-y-3">
                <a
                  href={`https://${company.socialMedia.linkedin}`}
                  className="flex items-center p-3 bg-white rounded-lg border border-gray-200 hover:border-blue-200 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="bg-blue-100 p-2 rounded-lg mr-3">
                    <svg
                      className="w-5 h-5 text-[#0A66C2]"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </div>
                  <span>LinkedIn</span>
                </a>
                <a
                  href={`https://${company.socialMedia.twitter}`}
                  className="flex items-center p-3 bg-white rounded-lg border border-gray-200 hover:border-blue-200 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="bg-blue-100 p-2 rounded-lg mr-3">
                    <svg
                      className="w-5 h-5 text-[#1DA1F2]"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </div>
                  <span>Twitter</span>
                </a>
                <a
                  href={`https://${company.socialMedia.github}`}
                  className="flex items-center p-3 bg-white rounded-lg border border-gray-200 hover:border-blue-200 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="bg-blue-100 p-2 rounded-lg mr-3">
                    <svg
                      className="w-5 h-5 text-gray-800"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                    </svg>
                  </div>
                  <span>GitHub</span>
                </a>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* About Section */}
            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">À propos</h2>

                <button className="text-sm text-blue-600 hover:text-blue-800">
                  Modifier
                </button>
              </div>
              <p className="text-gray-700 leading-relaxed mb-6">
                {company.description}
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-lg text-gray-900 mb-3 flex items-center">
                    <span className="bg-blue-100 p-2 rounded-lg mr-3">
                      <Award className="text-blue-600" size={18} />
                    </span>
                    Mission
                  </h3>
                  <p className="text-gray-700">{company.mission}</p>
                </div>

                <div>
                  <h3 className="font-semibold text-lg text-gray-900 mb-3 flex items-center">
                    <span className="bg-blue-100 p-2 rounded-lg mr-3">
                      <Shield className="text-blue-600" size={18} />
                    </span>
                    Valeurs
                  </h3>
                  <ul className="space-y-2">
                    {company.values.map((value, index) => (
                      <li key={index} className="flex items-start">
                        <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mt-2 mr-2"></span>
                        <span className="text-gray-700">{value}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Expandable Sections */}
            <div className="space-y-4">
              {/* Certifications Section */}
              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                <button
                  onClick={() => toggleSection("certifications")}
                  className="w-full flex justify-between items-center p-6 hover:bg-gray-50 transition-colors"
                >
                  <h3 className="text-xl font-semibold text-gray-900 flex items-center">
                    <span className="bg-blue-100 p-2 rounded-lg mr-4">
                      <Award className="text-blue-600" size={20} />
                    </span>
                    Certifications & Récompenses
                  </h3>
                  {expandedSection === "certifications" ? (
                    <ChevronUp className="text-gray-400" size={20} />
                  ) : (
                    <ChevronDown className="text-gray-400" size={20} />
                  )}
                </button>

                {expandedSection === "certifications" && (
                  <div className="p-6 pt-0 border-t border-gray-200">
                    <ul className="space-y-4">
                      {company.certifications.map((cert, index) => (
                        <li key={index} className="flex items-start">
                          <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-blue-100 text-blue-600 mr-3 mt-0.5">
                            {index + 1}
                          </span>
                          <span className="text-gray-700">{cert}</span>
                        </li>
                      ))}
                    </ul>

                    <button className="mt-4 text-sm text-blue-600 hover:text-blue-800">
                      + Ajouter une certification
                    </button>
                  </div>
                )}
              </div>

              {/* Leadership Section */}
              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                <button
                  onClick={() => toggleSection("leadership")}
                  className="w-full flex justify-between items-center p-6 hover:bg-gray-50 transition-colors"
                >
                  <h3 className="text-xl font-semibold text-gray-900 flex items-center">
                    <span className="bg-blue-100 p-2 rounded-lg mr-4">
                      <Users className="text-blue-600" size={20} />
                    </span>
                    Direction
                  </h3>
                  {expandedSection === "leadership" ? (
                    <ChevronUp className="text-gray-400" size={20} />
                  ) : (
                    <ChevronDown className="text-gray-400" size={20} />
                  )}
                </button>

                {expandedSection === "leadership" && (
                  <div className="p-6 pt-0 border-t border-gray-200">
                    <div className="grid md:grid-cols-2 gap-6">
                      {company.leadership.map((leader, index) => (
                        <div key={index} className="flex items-start space-x-4">
                          <div className="h-16 w-16 rounded-full bg-gray-200 flex items-center justify-center">
                            <Users className="text-gray-500" size={24} />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900">
                              {leader.name}
                            </h4>
                            <p className="text-blue-600 text-sm">
                              {leader.title}
                            </p>
                            <p className="text-gray-600 text-sm mt-1">
                              {leader.bio}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <button className="mt-4 text-sm text-blue-600 hover:text-blue-800">
                      + Ajouter un membre de la direction
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title={"Modifier info"}
      >
        <CompanyForm
          company={company}
          onSubmit={handleSubmit}
          onCancel={() => setIsEditModalOpen(false)}
        />
      </Modal>
    </div>
  );
}

export default CompaniesContent;
