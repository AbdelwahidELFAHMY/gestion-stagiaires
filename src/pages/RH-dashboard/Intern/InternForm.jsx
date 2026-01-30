import { format } from "date-fns";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-hot-toast";
import { DepartmentService } from "../Departments/DepartmentService";

export default function InternForm({
  intern,
  onSubmit,
  onCancel,
  isSubmitting,
}) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    departmentId: "",
    university: "",
    fieldOfStudy: "",
    subject: "",
    startDate: new Date(),
    endDate: new Date(new Date().setMonth(new Date().getMonth() + 3)),
    status: "active",
    supervisor: "",
    reportUrl: "",
  });

  const [departments, setDepartments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const data = await DepartmentService.getAllDepartments();
        setDepartments(data);
      } catch (error) {
        toast.error("Failed to load departments");
      }
    };

    fetchDepartments();

    if (intern) {
      setFormData({
        firstName: intern.firstName || "",
        lastName: intern.lastName || "",
        email: intern.email || "",
        phone: intern.phone || "",
        departmentId: intern.departmentId || "",
        university: intern.university || "",
        fieldOfStudy: intern.fieldOfStudy || "",
        subject: intern.subject || "",
        startDate: intern.startDate ? new Date(intern.startDate) : new Date(),
        endDate: intern.endDate
          ? new Date(intern.endDate)
          : new Date(new Date().setMonth(new Date().getMonth() + 3)),
        status: intern.status || "active",
        supervisor: intern.supervisor || "",
        reportUrl: intern.reportUrl || "",
      });
    }
  }, [intern]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim())
      newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.departmentId)
      newErrors.departmentId = "Department is required";
    if (!formData.subject.trim()) newErrors.subject = "Subject is required";
    if (formData.startDate > formData.endDate) {
      newErrors.endDate = "End date must be after start date";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const dataToSubmit = {
        ...formData,
        departmentId: formData.departmentId,
        startDate: format(formData.startDate, "yyyy-MM-dd"),
        endDate: format(formData.endDate, "yyyy-MM-dd"),
      };

      await onSubmit(dataToSubmit);
    } catch (error) {
      if (typeof error === "object" && !error.response) {
        setErrors(error);
      } else {
        toast.error(
          error.message || "An error occurred while saving the intern"
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            First Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className={`mt-1 block w-full rounded-lg border ${
              errors.firstName ? "border-red-500" : "border-gray-300"
            } px-3 py-2`}
            required
            aria-label="First Name"
            aria-invalid={!!errors.firstName}
            aria-describedby={errors.firstName ? "firstName-error" : undefined}
          />
          {errors.firstName && (
            <p id="firstName-error" className="mt-1 text-sm text-red-500">
              {errors.firstName}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Last Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className={`mt-1 block w-full rounded-lg border ${
              errors.lastName ? "border-red-500" : "border-gray-300"
            } px-3 py-2`}
            required
            aria-label="Last Name"
            aria-invalid={!!errors.lastName}
            aria-describedby={errors.lastName ? "lastName-error" : undefined}
          />
          {errors.lastName && (
            <p id="lastName-error" className="mt-1 text-sm text-red-500">
              {errors.lastName}
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`mt-1 block w-full rounded-lg border ${
              errors.email ? "border-red-500" : "border-gray-300"
            } px-3 py-2`}
            required
            aria-label="Email"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
          />
          {errors.email && (
            <p id="email-error" className="mt-1 text-sm text-red-500">
              {errors.email}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Phone Number
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
            aria-label="Phone Number"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Department <span className="text-red-500">*</span>
          </label>
          <select
            name="departmentId"
            value={formData.departmentId}
            onChange={handleChange}
            className={`mt-1 block w-full rounded-lg border ${
              errors.departmentId ? "border-red-500" : "border-gray-300"
            } px-3 py-2`}
            required
            aria-label="Department"
            aria-invalid={!!errors.departmentId}
            aria-describedby={
              errors.departmentId ? "departmentId-error" : undefined
            }
          >
            <option value="">Select Department</option>
            {departments.map((dept) => (
              <option key={dept.id} value={dept.id}>
                {dept.name}
              </option>
            ))}
          </select>
          {errors.departmentId && (
            <p id="departmentId-error" className="mt-1 text-sm text-red-500">
              {errors.departmentId}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Supervisor
          </label>
          <input
            type="text"
            name="supervisor"
            value={formData.supervisor}
            onChange={handleChange}
            className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
            aria-label="Supervisor"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            University
          </label>
          <input
            type="text"
            name="university"
            value={formData.university}
            onChange={handleChange}
            className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
            aria-label="University"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Field of Study
          </label>
          <input
            type="text"
            name="fieldOfStudy"
            value={formData.fieldOfStudy}
            onChange={handleChange}
            className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
            aria-label="Field of Study"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Internship Subject <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          className={`mt-1 block w-full rounded-lg border ${
            errors.subject ? "border-red-500" : "border-gray-300"
          } px-3 py-2`}
          required
          aria-label="Internship Subject"
          aria-invalid={!!errors.subject}
          aria-describedby={errors.subject ? "subject-error" : undefined}
        />
        {errors.subject && (
          <p id="subject-error" className="mt-1 text-sm text-red-500">
            {errors.subject}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Start Date <span className="text-red-500">*</span>
          </label>
          <DatePicker
            selected={formData.startDate}
            onChange={(date) => setFormData({ ...formData, startDate: date })}
            className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
            dateFormat="yyyy-MM-dd"
            required
            aria-label="Start Date"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            End Date <span className="text-red-500">*</span>
          </label>
          <DatePicker
            selected={formData.endDate}
            onChange={(date) => setFormData({ ...formData, endDate: date })}
            className={`mt-1 block w-full rounded-lg border ${
              errors.endDate ? "border-red-500" : "border-gray-300"
            } px-3 py-2`}
            dateFormat="yyyy-MM-dd"
            minDate={formData.startDate}
            required
            aria-label="End Date"
            aria-invalid={!!errors.endDate}
            aria-describedby={errors.endDate ? "endDate-error" : undefined}
          />
          {errors.endDate && (
            <p id="endDate-error" className="mt-1 text-sm text-red-500">
              {errors.endDate}
            </p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Status <span className="text-red-500">*</span>
        </label>
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
          required
          aria-label="Status"
        >
          <option value="active">Active</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
          <option value="terminated">Terminated</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Report URL
        </label>
        <input
          type="url"
          name="reportUrl"
          value={formData.reportUrl}
          onChange={handleChange}
          className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
          placeholder="https://example.com/report.pdf"
          aria-label="Report URL"
        />
      </div>

      <div className="flex justify-end gap-3 mt-6">
        <button
          type="button"
          onClick={onCancel}
          disabled={isSubmitting || isLoading}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
          aria-label="Cancel"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting || isLoading}
          className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 disabled:opacity-50"
          aria-label={intern ? "Update Intern" : "Create Intern"}
        >
          {isSubmitting || isLoading ? (
            <span className="flex items-center">
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
              Processing...
            </span>
          ) : intern ? (
            "Update Intern"
          ) : (
            "Create Intern"
          )}
        </button>
      </div>
    </form>
  );
}
