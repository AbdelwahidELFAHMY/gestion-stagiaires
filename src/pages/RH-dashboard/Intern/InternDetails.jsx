import { format } from "date-fns";
import React from "react";
import StatusBadge from "../components/StatusBadge";

const InternDetails = ({ intern, departmentName }) => {
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return format(new Date(dateString), "MMMM d, yyyy");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0">
          <img
            className="h-16 w-16 rounded-full"
            src={
              intern.avatarUrl ||
              `https://ui-avatars.com/api/?name=${intern.firstName}+${intern.lastName}&background=random`
            }
            alt={`${intern.firstName} ${intern.lastName}`}
          />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-medium text-gray-900">
            {intern.firstName} {intern.lastName}
          </h3>
          <p className="text-sm text-gray-500">{intern.email}</p>
          <p className="text-sm text-gray-500">
            Username: {intern.username || "N/A"}
          </p>
          <div className="mt-1">
            <StatusBadge status={intern.status} />
          </div>
        </div>
      </div>

      <div className="border-t pt-4">
        <h4 className="text-sm font-medium text-gray-500 mb-2">
          Contact Information
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h5 className="text-sm font-medium text-gray-500">Phone</h5>
            <p className="mt-1 text-sm text-gray-900">
              {intern.phone || "N/A"}
            </p>
          </div>
          <div>
            <h5 className="text-sm font-medium text-gray-500">Email</h5>
            <p className="mt-1 text-sm text-gray-900">{intern.email}</p>
          </div>
        </div>
      </div>

      <div className="border-t pt-4">
        <h4 className="text-sm font-medium text-gray-500 mb-2">
          Internship Details
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h5 className="text-sm font-medium text-gray-500">Department</h5>
            <p className="mt-1 text-sm text-gray-900">
              {departmentName || "N/A"}
            </p>
          </div>
          <div>
            <h5 className="text-sm font-medium text-gray-500">Subject</h5>
            <p className="mt-1 text-sm text-gray-900">
              {intern.subject || "N/A"}
            </p>
          </div>
          <div>
            <h5 className="text-sm font-medium text-gray-500">Start Date</h5>
            <p className="mt-1 text-sm text-gray-900">
              {formatDate(intern.startDate)}
            </p>
          </div>
          <div>
            <h5 className="text-sm font-medium text-gray-500">End Date</h5>
            <p className="mt-1 text-sm text-gray-900">
              {formatDate(intern.endDate)}
            </p>
          </div>
          <div>
            <h5 className="text-sm font-medium text-gray-500">Supervisor</h5>
            <p className="mt-1 text-sm text-gray-900">
              {intern.supervisor || "N/A"}
            </p>
          </div>
        </div>
      </div>

      <div className="border-t pt-4">
        <h4 className="text-sm font-medium text-gray-500 mb-2">
          Academic Information
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h5 className="text-sm font-medium text-gray-500">University</h5>
            <p className="mt-1 text-sm text-gray-900">
              {intern.university || "N/A"}
            </p>
          </div>
          <div>
            <h5 className="text-sm font-medium text-gray-500">
              Field of Study
            </h5>
            <p className="mt-1 text-sm text-gray-900">
              {intern.fieldOfStudy || "N/A"}
            </p>
          </div>
        </div>
      </div>

      {intern.reportUrl && (
        <div className="border-t pt-4">
          <h4 className="text-sm font-medium text-gray-500 mb-2">Report</h4>
          <a
            href={intern.reportUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-indigo-600 hover:text-indigo-800"
            aria-label="View Internship Report"
          >
            View Internship Report
          </a>
        </div>
      )}
    </div>
  );
};

export default InternDetails;
