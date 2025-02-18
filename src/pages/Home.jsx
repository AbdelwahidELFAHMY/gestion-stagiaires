import React from 'react';
import Navbar from '../components/navbar';
import { motion } from 'framer-motion';
import { DeskIllustration } from '../assets/Illustration';

// Composant pour une étoile SVG
const Star = ({ x, y, size, delay }) => (
  <motion.svg
    className="absolute"
    style={{ top: y, left: x, width: size, height: size }}
    viewBox="0 0 24 24"
    fill="white"
    initial={{ opacity: 0.3, scale: 0.4 }}
    animate={{
      opacity: [0.3, 0.7, 0.3],
      scale: [0.3, 0.4, 0.3],
      rotate: [0, 10, -10, 0],
    }}
    transition={{
      duration: 2.5 + Math.random() * 2,
      repeat: Infinity,
      delay,
    }}
  >
    <polygon points="12 2 15 9 22 9 16 14 18 21 12 17 6 21 8 14 2 9 9 9" />
  </motion.svg>
);

// Composant pour le fond étoilé
const StarsBackground = () => {
  const stars = Array.from({ length: 100 }, (_, i) => ({
    id: i,
    x: Math.random() * 100 + '%',
    y: Math.random() * 100 + '%',
    size: Math.random() * 20 + 2 + 'px',
    delay: Math.random() * 3,
  }));

  return (
    <div className="absolute top-0 h-2/3 inset-0 overflow-hidden">
      {stars.map((star) => (
        <Star key={star.id} {...star} />
      ))}
    </div>
  );
};

const SvgIllustration = () => (
  <svg className="absolute bottom-0 left-0 w-full z-0" viewBox="0 0 1440 320">
    <path
      fill="#000000"
      fillOpacity="0.3"
      d="M0,192L48,202.7C96,213,192,235,288,224C384,213,480,171,576,144C672,117,768,107,864,106.7C960,107,1056,117,1152,122.7C1248,128,1344,128,1392,128L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
    ></path>
  </svg>
);

function Home() {
  return (
    <>
      <div className="h-screen relative overflow-hidden bg-gradient-to-r from-blue-900 via-blue-700 to-blue-500 text-white">
  
        <Navbar/>
        <StarsBackground /> {/* Ajout des étoiles animées */}
        <div className="max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-10 lg:py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <motion.h1
                className="text-5xl font-extrabold sm:text-6xl"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
              >
                <span className="block">Simplifiez la gestion</span>
                <span className="block text-indigo-300">des stagiaires professionnels</span>
              </motion.h1>
              <motion.p
                className="text-lg sm:text-xl text-gray-200 z-30"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, delay: 0.2 }}
              >
                Notre plateforme vous permet de suivre, gérer et évaluer vos stagiaires en toute simplicité.
                Optimisez les performances des équipes et créez une expérience professionnelle enrichissante.
              </motion.p>
              <div className="flex space-x-4">
                <motion.a
                  href="#features"
                  className="inline-block bg-indigo-600 hover:bg-indigo-500 text-white py-3 px-6 rounded-lg shadow-glow transition duration-300 transform hover:scale-105 z-30"
                  whileHover={{ scale: 1.1 }}
                >
                  Découvrir les fonctionnalités
                </motion.a>
                <motion.a
                  href="#contact"
                  className="inline-block shadow-glow bg-transparent border-2 border-white hover:bg-white hover:text-indigo-700 text-white py-3 px-6 rounded-lg transition duration-300 transform hover:scale-105 z-30"
                  whileHover={{ scale: 1.1 }}
                >
                  Contactez-nous
                </motion.a>
              </div>
            </div>
            <SvgIllustration />
            <DeskIllustration />
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