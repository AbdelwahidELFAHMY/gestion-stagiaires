/* eslint-disable react/no-unescaped-entities */
import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center dark:bg-gray-900 bg-gradient-to-r from-blue-900 via-blue-700 to-blue-500 text-white text-center px-6">
      <h1 className="text-6xl font-extrabold">404</h1>
      <p className="text-2xl sm:text-3xl mt-4">Page non trouvée</p>
      <p className="text-lg text-gray-200 mt-2">
        Oups ! La page que vous recherchez semble introuvable.
      </p>
      <Link
        to="/"
        className="mt-6 inline-block bg-indigo-600 hover:bg-indigo-500 text-white py-3 px-6 rounded-lg shadow-md transition duration-300 transform hover:scale-105"
      >
        Retour à l'Accueil
      </Link>
    </div>
  );
}
