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
    employees: company?.employees || 0,
    interns: company?.interns || 0,
    revenue: company?.revenue || "",
    description: company?.description || "",
    mission: company?.mission || "",
    values: company?.values?.join("\n") || "",
    linkedinUrl: company?.linkedinUrl || "",
    twitterUrl: company?.twitterUrl || "",
    githubUrl: company?.githubUrl || "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Company name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!formData.sector) newErrors.sector = "Sector is required";
    if (!formData.location.trim()) newErrors.location = "Location is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const formattedData = {
        ...formData,
        values: formData.values.split("\n").filter((v) => v.trim() !== ""),
        employees: Number(formData.employees),
        interns: Number(formData.interns),
        // Remove any empty social media URLs
        linkedinUrl: formData.linkedinUrl.trim(),
        twitterUrl: formData.twitterUrl.trim(),
        githubUrl: formData.githubUrl.trim(),
      };

      await onSubmit(formattedData);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Reusable Input Component
  const InputField = ({
    label,
    name,
    type = "text",
    icon: Icon,
    required = false,
  }) => (
    <div className="mb-4">
      <label className="flex items-center text-sm font-medium text-gray-700">
        {Icon && <Icon className="mr-2 text-gray-500" size={16} />}
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        type={type}
        name={name}
        value={formData[name]}
        onChange={handleChange}
        className={`mt-1 block w-full rounded-lg border ${
          errors[name] ? "border-red-500" : "border-gray-300"
        } px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500`}
        required={required}
      />
      {errors[name] && (
        <p className="mt-1 text-sm text-red-600">{errors[name]}</p>
      )}
    </div>
  );

  // Reusable Textarea Component
  const TextareaField = ({ label, name, rows = 3, icon: Icon }) => (
    <div className="mb-4">
      <label className="flex items-center text-sm font-medium text-gray-700">
        {Icon && <Icon className="mr-2 text-gray-500" size={16} />}
        {label}
      </label>
      <textarea
        name={name}
        value={formData[name]}
        onChange={handleChange}
        rows={rows}
        className={`mt-1 block w-full rounded-lg border ${
          errors[name] ? "border-red-500" : "border-gray-300"
        } px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500`}
      />
    </div>
  );

  // Social Media Input Component (simplified)
  const SocialInput = ({ platform, icon: Icon }) => {
    const platforms = {
      linkedin: {
        label: "LinkedIn",
        placeholder: "company/your-company",
        urlPrefix: "https://linkedin.com/",
      },
      twitter: {
        label: "Twitter",
        placeholder: "yourhandle",
        urlPrefix: "https://twitter.com/",
      },
      github: {
        label: "GitHub",
        placeholder: "yourorg",
        urlPrefix: "https://github.com/",
      },
    };

    return (
      <div className="mb-4">
        <label className="flex items-center text-sm font-medium text-gray-700">
          {Icon && <Icon className="mr-2 text-gray-500" size={16} />}
          {platforms[platform].label}
        </label>
        <div className="mt-1 flex rounded-lg shadow-sm">
          <span className="inline-flex items-center rounded-l-lg border border-r-0 border-gray-300 bg-gray-50 px-3 text-gray-500 sm:text-sm">
            {platforms[platform].urlPrefix}
          </span>
          <input
            type="text"
            name={`${platform}Url`}
            value={formData[`${platform}Url`].replace(
              platforms[platform].urlPrefix,
              ""
            )}
            onChange={(e) =>
              handleChange({
                target: {
                  name: `${platform}Url`,
                  value: e.target.value
                    ? `${platforms[platform].urlPrefix}${e.target.value}`
                    : "",
                },
              })
            }
            className={`block w-full min-w-0 flex-1 rounded-none rounded-r-lg border ${
              errors[platform] ? "border-red-500" : "border-gray-300"
            } px-3 py-2 focus:border-blue-500 focus:ring-blue-500`}
            placeholder={platforms[platform].placeholder}
          />
        </div>
      </div>
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 border-b pb-2 mb-4">
            Basic Information
          </h3>

          <InputField
            label="Company Name"
            name="name"
            icon={Building2}
            required
          />

          <InputField
            label="Email"
            name="email"
            type="email"
            icon={Mail}
            required
          />

          <InputField label="Phone" name="phone" type="tel" icon={Phone} />

          <InputField label="Location" name="location" icon={MapPin} required />

          <div className="mb-4">
            <label className="flex items-center text-sm font-medium text-gray-700">
              <Globe className="mr-2 text-gray-500" size={16} />
              Website
            </label>
            <div className="mt-1 flex rounded-lg shadow-sm">
              <span className="inline-flex items-center rounded-l-lg border border-r-0 border-gray-300 bg-gray-50 px-3 text-gray-500 sm:text-sm">
                https://
              </span>
              <input
                type="text"
                name="website"
                value={formData.website.replace("https://", "")}
                onChange={(e) =>
                  handleChange({
                    target: {
                      name: "website",
                      value: e.target.value ? `https://${e.target.value}` : "",
                    },
                  })
                }
                className="block w-full min-w-0 flex-1 rounded-none rounded-r-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
                placeholder="yourwebsite.com"
              />
            </div>
          </div>

          <InputField label="Founded Year" name="founded" icon={Calendar} />
        </div>

        {/* Right Column */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 border-b pb-2 mb-4">
            Key Figures
          </h3>

          <InputField
            label="Number of Employees"
            name="employees"
            type="number"
            icon={Users}
          />

          <InputField
            label="Number of Interns"
            name="interns"
            type="number"
            icon={Users}
          />

          <InputField label="Revenue" name="revenue" icon={BarChart2} />

          <div className="mb-4">
            <label className="flex items-center text-sm font-medium text-gray-700">
              <Shield className="mr-2 text-gray-500" size={16} />
              Sector
              <span className="text-red-500 ml-1">*</span>
            </label>
            <select
              name="sector"
              value={formData.sector}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-lg border ${
                errors.sector ? "border-red-500" : "border-gray-300"
              } px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500`}
              required
            >
              <option value="">Select a sector</option>
              <option value="Information Technology">
                Information Technology
              </option>
              <option value="Finance">Finance</option>
              <option value="Healthcare">Healthcare</option>
              <option value="Education">Education</option>
              <option value="Manufacturing">Manufacturing</option>
              <option value="Retail">Retail</option>
              <option value="Other">Other</option>
            </select>
            {errors.sector && (
              <p className="mt-1 text-sm text-red-600">{errors.sector}</p>
            )}
          </div>
        </div>
      </div>

      {/* Company Description */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 border-b pb-2 mb-4">
          Company Description
        </h3>
        <TextareaField
          label="General Description"
          name="description"
          rows={4}
        />
      </div>

      {/* Mission & Values */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-medium text-gray-900 border-b pb-2 mb-4 flex items-center">
            <Award className="mr-2 text-gray-500" size={16} />
            Mission
          </h3>
          <TextareaField name="mission" rows={3} />
        </div>
        <div>
          <h3 className="text-lg font-medium text-gray-900 border-b pb-2 mb-4 flex items-center">
            <Shield className="mr-2 text-gray-500" size={16} />
            Values
          </h3>
          <TextareaField name="values" rows={3} />
          <p className="mt-1 text-xs text-gray-500">Enter one value per line</p>
        </div>
      </div>

      {/* Social Media */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 border-b pb-2 mb-4">
          Social Media
        </h3>
        <div className="grid grid-cols-1 gap-4">
          <SocialInput platform="linkedin" icon={Users} />
          <SocialInput platform="twitter" icon={Users} />
          <SocialInput platform="github" icon={Users} />
        </div>
      </div>

      {/* Form Actions */}
      <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
        <button
          type="button"
          onClick={onCancel}
          disabled={isSubmitting}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 flex items-center"
        >
          {isSubmitting && (
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
          )}
          Update Company
        </button>
      </div>
    </form>
  );
}
