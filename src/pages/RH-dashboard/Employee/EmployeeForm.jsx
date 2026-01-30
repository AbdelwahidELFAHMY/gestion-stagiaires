import { useFormik } from "formik";
import PropTypes from "prop-types";
import React, { useMemo } from "react";
import * as Yup from "yup";

// Validation schema aligned with EmployeeRequestDTO
const employeeSchema = Yup.object().shape({
  firstName: Yup.string()
    .required("Le prénom est requis")
    .min(2, "Le prénom doit contenir au moins 2 caractères")
    .max(50, "Le prénom ne doit pas dépasser 50 caractères")
    .matches(/^[a-zA-Z\s-]+$/, "Le prénom ne doit contenir que des lettres"),
  lastName: Yup.string()
    .required("Le nom est requis")
    .min(2, "Le nom doit contenir au moins 2 caractères")
    .max(50, "Le nom ne doit pas dépasser 50 caractères")
    .matches(/^[a-zA-Z\s-]+$/, "Le nom ne doit contenir que des lettres"),
  email: Yup.string()
    .email("Email invalide")
    .required("L'email est requis")
    .max(100, "L'email ne doit pas dépasser 100 caractères"),
  phone: Yup.string()
    .matches(/^\+?\d{0,15}$/, "Numéro de téléphone invalide")
    .nullable(),
  departmentId: Yup.number()
    .required("Le département est requis")
    .positive("Veuillez sélectionner un département valide")
    .integer(),
  position: Yup.string()
    .required("Le poste est requis")
    .oneOf(
      ["CHEF_DEPARTEMENT", "ENCADRENT"],
      "Veuillez sélectionner un poste valide"
    ),
  hireDate: Yup.date()
    .required("La date d'embauche est requise")
    .max(new Date(), "La date ne peut pas être dans le futur")
    .typeError("Date d'embauche invalide"),
  status: Yup.string()
    .required("Le statut est requis")
    .oneOf(
      ["ACTIVE", "ON_LEAVE", "INACTIVE"],
      "Veuillez sélectionner un statut valide"
    ),
  username: Yup.string()
    .required("Le nom d'utilisateur est requis")
    .min(3, "Le nom d'utilisateur doit contenir au moins 3 caractères")
    .max(50, "Le nom d'utilisateur ne doit pas dépasser 50 caractères"),
  password: Yup.string().when("isEdit", (isEdit, schema) =>
    isEdit
      ? schema.nullable()
      : schema
          .required("Le mot de passe est requis")
          .min(6, "Le mot de passe doit contenir au moins 6 caractères")
  ),
  avatar: Yup.string().url("L'URL de l'avatar doit être valide").nullable(),
  isEdit: Yup.boolean(),
});

const EmployeeForm = ({
  employee,
  positions,
  statuses,
  departments,
  onSubmit,
  onCancel,
  isLoading,
}) => {
  const formik = useFormik({
    initialValues: {
      firstName: employee?.firstName || "",
      lastName: employee?.lastName || "",
      email: employee?.email || "",
      phone: employee?.phone || "",
      departmentId: employee?.department?.id || "",
      position: employee?.position || "",
      hireDate: employee?.hireDate
        ? new Date(employee.hireDate).toISOString().split("T")[0]
        : "",
      status: employee?.status || "ACTIVE",
      username: employee?.username || "",
      password: "",
      avatar: employee?.avatar || "",
      isEdit: !!employee,
    },
    validationSchema: employeeSchema,
    onSubmit: (values) => {
      console.log("Submitting form with values:", values);
      console.log("Form isValid:", formik.isValid, "dirty:", formik.dirty);
      const { isEdit, ...payload } = values;
      const cleanedPayload = {
        firstName: payload.firstName,
        lastName: payload.lastName,
        email: payload.email,
        phone: payload.phone || null,
        departmentId: Number(payload.departmentId),
        position: payload.position,
        hireDate: payload.hireDate,
        status: payload.status,
        username: payload.username,
        password: isEdit && !payload.password ? undefined : payload.password,
        avatar: payload.avatar || null,
      };
      console.log("Cleaned payload:", cleanedPayload);
      onSubmit(cleanedPayload);
    },
    enableReinitialize: true,
  });

  // Debug validation errors
  useMemo(() => {
    if (Object.keys(formik.errors).length > 0) {
      console.log("Form validation errors:", formik.errors);
    }
  }, [formik.errors]);

  // Memoized form fields configuration
  const formFields = useMemo(
    () => [
      {
        id: "firstName",
        label: "Prénom",
        type: "text",
        required: true,
      },
      {
        id: "lastName",
        label: "Nom",
        type: "text",
        required: true,
      },
      {
        id: "email",
        label: "Email",
        type: "email",
        required: true,
      },
      {
        id: "phone",
        label: "Téléphone",
        type: "tel",
        required: false,
      },
      {
        id: "departmentId",
        label: "Département",
        type: "select",
        options: [
          { value: "", label: "Sélectionner un département" },
          ...departments.map((dept) => ({
            value: dept.id,
            label: dept.name,
          })),
        ],
        required: true,
      },
      {
        id: "position",
        label: "Poste",
        type: "select",
        options: [{ value: "", label: "Sélectionner un poste" }, ...positions],
        required: true,
      },
      {
        id: "hireDate",
        label: "Date d'embauche",
        type: "date",
        required: true,
      },
      {
        id: "status",
        label: "Statut",
        type: "select",
        options: statuses,
        required: true,
      },
      {
        id: "username",
        label: "Nom d'utilisateur",
        type: "text",
        required: true,
      },
      {
        id: "password",
        label: employee ? "Nouveau mot de passe (facultatif)" : "Mot de passe",
        type: "password",
        required: !employee,
      },
      {
        id: "avatar",
        label: "URL de l'avatar",
        type: "url",
        required: false,
      },
    ],
    [departments, positions, statuses, employee]
  );

  // Debug logging for input changes
  const handleInputChange = (e) => {
    console.log(`Input changed: ${e.target.name}=${e.target.value}`);
    formik.handleChange(e);
  };

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="space-y-6"
      role="form"
      aria-labelledby="employee-form"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {formFields.map((field) => (
          <div key={field.id}>
            <label
              htmlFor={field.id}
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              {field.label}
              {field.required && <span className="text-red-500">*</span>}
            </label>
            {field.type === "select" ? (
              <select
                id={field.id}
                name={field.id}
                value={formik.values[field.id]}
                onChange={handleInputChange}
                onBlur={formik.handleBlur}
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-4 py-2 border ${
                  formik.touched[field.id] && formik.errors[field.id]
                    ? "border-red-500"
                    : ""
                }`}
                disabled={
                  isLoading ||
                  (field.id === "departmentId" && !departments.length)
                }
                aria-invalid={
                  formik.touched[field.id] && formik.errors[field.id]
                    ? "true"
                    : "false"
                }
                aria-describedby={`${field.id}-error`}
              >
                {field.options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            ) : (
              <input
                id={field.id}
                type={field.type}
                name={field.id}
                value={formik.values[field.id] || ""}
                onChange={handleInputChange}
                onBlur={formik.handleBlur}
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-4 py-2 border ${
                  formik.touched[field.id] && formik.errors[field.id]
                    ? "border-red-500"
                    : ""
                }`}
                disabled={isLoading}
                aria-invalid={
                  formik.touched[field.id] && formik.errors[field.id]
                    ? "true"
                    : "false"
                }
                aria-describedby={`${field.id}-error`}
              />
            )}
            {formik.touched[field.id] && formik.errors[field.id] && (
              <div
                id={`${field.id}-error`}
                className="text-red-500 text-xs mt-1"
                role="alert"
              >
                {formik.errors[field.id]}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
        <button
          type="button"
          onClick={onCancel}
          disabled={isLoading}
          className="px-5 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors disabled:opacity-50"
          aria-label="Annuler la modification"
        >
          Annuler
        </button>
        <button
          type="submit"
          disabled={!formik.isValid || isLoading || !formik.dirty}
          className={`px-5 py-2.5 text-sm font-medium text-white rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors ${
            !formik.isValid || isLoading || !formik.dirty
              ? "bg-blue-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
          aria-label={employee ? "Mettre à jour l'employé" : "Créer un employé"}
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
              <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                aria-hidden="true"
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
              {employee ? "Mise à jour..." : "Création..."}
            </span>
          ) : employee ? (
            "Mettre à jour"
          ) : (
            "Enregistrer"
          )}
        </button>
      </div>
    </form>
  );
};

// PropTypes for type checking
EmployeeForm.propTypes = {
  employee: PropTypes.shape({
    id: PropTypes.number,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    email: PropTypes.string,
    phone: PropTypes.string,
    department: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    }),
    position: PropTypes.string,
    hireDate: PropTypes.string,
    status: PropTypes.string,
    username: PropTypes.string,
    avatar: PropTypes.string,
  }),
  positions: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  statuses: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  departments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default EmployeeForm;
