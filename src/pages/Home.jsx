import Navbar from '../components/navbar';

function Home() {
  return (
    <>
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-900 via-blue-700 to-blue-500 text-white">
        {/* Navbar dans la Hero section */}
        <Navbar />

        {/* Hero content */}
        <div className="max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-10 lg:py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Texte à gauche */}
            <div className="space-y-6">
              <h1 className="text-5xl font-extrabold sm:text-6xl">
                <span className="block">Simplifiez la gestion</span>
                <span className="block text-indigo-300">des stagiaires professionnels</span>
              </h1>
              <p className="text-lg sm:text-xl text-gray-200">
                Notre plateforme vous permet de suivre, gérer et évaluer vos stagiaires en toute simplicité.
                Optimisez les performances des équipes et créez une expérience professionnelle enrichissante.
              </p>
              <div className="flex space-x-4">
                <a
                  href="#features"
                  className="inline-block bg-indigo-600 hover:bg-indigo-500 text-white py-3 px-6 rounded-lg shadow-md transition duration-300 transform hover:scale-105"
                >
                  Découvrir les fonctionnalités
                </a>
                <a
                  href="#contact"
                  className="inline-block bg-transparent border-2 border-white hover:bg-white hover:text-indigo-700 text-white py-3 px-6 rounded-lg shadow-md transition duration-300 transform hover:scale-105"
                >
                  Contactez-nous
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-gray-100 py-16" id="features">
        <div className="max-w-screen-xl mx-auto px-6 sm:px-12 lg:px-16">
          <h2 className="text-4xl font-bold text-center text-blue-900 mb-12">Fonctionnalités clés</h2>
          <div className="grid md:grid-cols-3 gap-12">
            <div className="flex flex-col items-center text-center bg-white p-8 rounded-lg shadow-lg">
              <div className="bg-indigo-500 p-4 rounded-full mb-6">
                <svg className="w-12 h-12 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v12m6-6H6" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-blue-900">Suivi en temps réel</h3>
              <p className="text-gray-600 mt-4">Suivez les progrès de vos stagiaires en temps réel et générez des rapports détaillés.</p>
            </div>
            <div className="flex flex-col items-center text-center bg-white p-8 rounded-lg shadow-lg">
              <div className="bg-indigo-500 p-4 rounded-full mb-6">
                <svg className="w-12 h-12 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2 2 2m0 0l2-2 2 2m-2-2v4m0 0H6" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-blue-900">Évaluations interactives</h3>
              <p className="text-gray-600 mt-4">Évaluez les performances des stagiaires à travers des questionnaires et des sessions interactives.</p>
            </div>
            <div className="flex flex-col items-center text-center bg-white p-8 rounded-lg shadow-lg">
              <div className="bg-indigo-500 p-4 rounded-full mb-6">
                <svg className="w-12 h-12 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 18c0 1.1.89 2 1.99 2h12c1.1 0 1.99-.9 1.99-2V8l-6-6z" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-blue-900">Gestion administrative</h3>
              <p className="text-gray-600 mt-4">Gérez la documentation et les informations administratives liées aux stagiaires facilement.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
