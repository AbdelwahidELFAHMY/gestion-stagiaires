import { useState } from "react";

export default function AssignmentForm({ assignment, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    intern: assignment?.intern || "",
    subject: assignment?.subject || "",
    supervisor: assignment?.supervisor || "",
    startDate: assignment?.startDate || "",
    endDate: assignment?.endDate || "",
    status: assignment?.status || "active",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Stagiaire
        </label>
        <select
          value={formData.intern}
          onChange={(e) => setFormData({ ...formData, intern: e.target.value })}
          className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
          required
        >
          <option value="">Sélectionner un stagiaire</option>
          <option value="1">John Doe</option>
          <option value="2">Jane Smith</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Sujet</label>
        <select
          value={formData.subject}
          onChange={(e) =>
            setFormData({ ...formData, subject: e.target.value })
          }
          className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
          required
        >
          <option value="">Sélectionner un sujet</option>
          <option value="1">Développement Web</option>
          <option value="2">Data Analysis</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Encadrant
        </label>
        <select
          value={formData.supervisor}
          onChange={(e) =>
            setFormData({ ...formData, supervisor: e.target.value })
          }
          className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
          required
        >
          <option value="">Sélectionner un encadrant</option>
          <option value="1">Jean Dupont</option>
          <option value="2">Marie Martin</option>
        </select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Date de début
          </label>
          <input
            type="date"
            value={formData.startDate}
            onChange={(e) =>
              setFormData({ ...formData, startDate: e.target.value })
            }
            className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Date de fin
          </label>
          <input
            type="date"
            value={formData.endDate}
            onChange={(e) =>
              setFormData({ ...formData, endDate: e.target.value })
            }
            className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Statut
        </label>
        <select
          value={formData.status}
          onChange={(e) => setFormData({ ...formData, status: e.target.value })}
          className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
          required
        >
          <option value="active">En cours</option>
          <option value="pending">En attente</option>
          <option value="completed">Terminé</option>
        </select>
      </div>

      <div className="flex justify-end gap-3 mt-6">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          Annuler
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700"
        >
          {assignment ? "Mettre à jour" : "Créer"}
        </button>
      </div>
    </form>
  );
}
