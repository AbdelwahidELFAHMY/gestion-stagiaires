import { useState, useEffect } from 'react';

export default function Stages() {
  const [stagiaires, setStagiaires] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(null);

  useEffect(() => {
    const fetchStagiaires = async () => {
      try {
        const data = [
          {
            id: 1,
            nom: "Dupont",
            prenom: "Claire",
            promotion: "2024",
            actif: true,
          },
          {
            id: 2,
            nom: "Nguyen",
            prenom: "Thomas",
            promotion: "2023",
            actif: false,
          },
          {
            id: 3,
            nom: "Belaid",
            prenom: "Yasmine",
            promotion: "2024",
            actif: true,
          },
          {
            id: 4,
            nom: "Lemoine",
            prenom: "Julien",
            promotion: "2022",
            actif: false,
          },
          {
            id: 5,
            nom: "Kouadio",
            prenom: "Aline",
            promotion: "2023",
            actif: true,
          },
        ];
        setStagiaires(data);
      } catch (error) {
        console.error("Erreur lors du chargement des stagiaires:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStagiaires();
  }, []);

  const toggleDropdown = (id) => {
    setIsDropdownOpen(isDropdownOpen === id ? null : id);
  };

  const filteredStagiaires = stagiaires.filter(stagiaire =>
    `${stagiaire.nom} ${stagiaire.prenom}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div className="text-center py-8">Chargement...</div>;

  return (
    <div style={{ padding: '1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>Gestion des Stagiaires</h2>
        <button style={{
          backgroundColor: '#3b82f6',
          color: 'white',
          padding: '0.5rem 1rem',
          borderRadius: '0.375rem',
          display: 'flex',
          alignItems: 'center'
        }}>
          <span style={{ marginRight: '0.5rem' }}>+</span>
          Ajouter un stagiaire
        </button>
      </div>

      <div style={{ marginBottom: '1.5rem', display: 'flex', gap: '1rem' }}>
        <div style={{ position: 'relative', flexGrow: 1 }}>
          <div style={{ position: 'absolute', top: '50%', left: '0.75rem', transform: 'translateY(-50%)' }}>
            <svg style={{ width: '1.25rem', height: '1.25rem', color: '#6b7280' }} viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            style={{
              width: '100%',
              padding: '0.5rem',
              paddingLeft: '2.5rem',
              border: '1px solid #d1d5db',
              borderRadius: '0.5rem',
              backgroundColor: '#f9fafb'
            }}
            placeholder="Rechercher un stagiaire..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button style={{
          backgroundColor: '#f3f4f6',
          color: '#111827',
          padding: '0.5rem 1rem',
          borderRadius: '0.375rem',
          display: 'flex',
          alignItems: 'center'
        }}>
          <svg style={{ width: '1rem', height: '1rem', marginRight: '0.5rem' }} viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
          Filtres
        </button>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f9fafb' }}>
              <th style={{ padding: '0.75rem 1rem', textAlign: 'left', borderBottom: '1px solid #e5e7eb' }}>Nom</th>
              <th style={{ padding: '0.75rem 1rem', textAlign: 'left', borderBottom: '1px solid #e5e7eb' }}>Prénom</th>
              <th style={{ padding: '0.75rem 1rem', textAlign: 'left', borderBottom: '1px solid #e5e7eb' }}>Promotion</th>
              <th style={{ padding: '0.75rem 1rem', textAlign: 'left', borderBottom: '1px solid #e5e7eb' }}>Statut</th>
              <th style={{ padding: '0.75rem 1rem', textAlign: 'left', borderBottom: '1px solid #e5e7eb' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredStagiaires.map((stagiaire) => (
              <tr key={stagiaire.id} style={{ borderBottom: '1px solid #e5e7eb', backgroundColor: 'white' }}>
                <td style={{ padding: '0.75rem 1rem' }}>{stagiaire.nom}</td>
                <td style={{ padding: '0.75rem 1rem' }}>{stagiaire.prenom}</td>
                <td style={{ padding: '0.75rem 1rem' }}>{stagiaire.promotion}</td>
                <td style={{ padding: '0.75rem 1rem' }}>
                  <span style={{
                    display: 'inline-block',
                    padding: '0.25rem 0.5rem',
                    borderRadius: '0.375rem',
                    backgroundColor: stagiaire.actif ? '#d1fae5' : '#fee2e2',
                    color: stagiaire.actif ? '#065f46' : '#b91c1c'
                  }}>
                    {stagiaire.actif ? 'Actif' : 'Inactif'}
                  </span>
                </td>
                <td style={{ padding: '0.75rem 1rem', position: 'relative' }}>
                  <button onClick={() => toggleDropdown(stagiaire.id)} style={{ padding: '0.25rem' }}>
                    <svg style={{ width: '1.25rem', height: '1.25rem' }} viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                    </svg>
                  </button>
                  {isDropdownOpen === stagiaire.id && (
                    <div style={{
                      position: 'absolute',
                      right: '1rem',
                      top: '3rem',
                      backgroundColor: 'white',
                      border: '1px solid #e5e7eb',
                      borderRadius: '0.375rem',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                      zIndex: 10,
                      minWidth: '10rem'
                    }}>
                      <button style={{
                        display: 'block',
                        width: '100%',
                        padding: '0.5rem 1rem',
                        textAlign: 'left',
                        borderBottom: '1px solid #e5e7eb'
                      }}>
                        Voir profil
                      </button>
                      <button style={{
                        display: 'block',
                        width: '100%',
                        padding: '0.5rem 1rem',
                        textAlign: 'left',
                        borderBottom: '1px solid #e5e7eb'
                      }}>
                        Modifier
                      </button>
                      <button style={{
                        display: 'block',
                        width: '100%',
                        padding: '0.5rem 1rem',
                        textAlign: 'left'
                      }}>
                        Désactiver
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}