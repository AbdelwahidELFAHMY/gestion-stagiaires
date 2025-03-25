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
      opacity: [0.3, 0.9, 0.3],
      scale: [0.3, 0.32, 0.3],
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
    size: Math.random() * 15 + 'px',
    delay: Math.random() * 3,
  }));
  
  // Composant pour les cartes de fonctionnalités avec animation au scroll
  const FeatureCard = ({ icon, title, description, index }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px 0px" });
    
    return (
      <motion.div
        ref={ref}
        className="flex flex-col items-center text-center bg-white p-8 rounded-xl shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-500"
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.6, delay: index * 0.2 }}
        whileHover={{ y: -8, transition: { duration: 0.3 } }}
      >
        <div className="bg-gradient-to-br from-indigo-600 to-blue-700 p-4 rounded-full mb-6 shadow-lg">
          {icon}
        </div>
        <h3 className="text-2xl font-bold text-gray-800 mb-4">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </motion.div>
    );
  };
  
  // Particules flottantes pour l'arrière-plan
  const Particles = () => {
    const particles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100 + '%',
      y: Math.random() * 100 + '%',
      size: Math.random() * 8 + 2,
    }));
  
    return (
      <div className="absolute inset-0 overflow-hidden">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full bg-white"
            style={{
              top: particle.y,
              left: particle.x,
              width: particle.size,
              height: particle.size,
              opacity: 0.2,
            }}
            animate={{
              y: ["-20px", "20px", "-20px"],
              x: ["10px", "-10px", "10px"],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 8 + Math.random() * 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>
    );
  };

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

const WaveIllustration = () => (
  <div className="absolute bottom-0 left-0 w-full overflow-hidden z-10">
    <svg className="w-full" viewBox="0 0 1440 320" preserveAspectRatio="none">
      <motion.path
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 0.2, y: 0 }}
        transition={{ duration: 1.5, delay: 0.5 }}
        fill="#ffffff"
        fillOpacity="0.3"
        d="M0,192L48,208C96,224,192,256,288,245.3C384,235,480,181,576,165.3C672,149,768,171,864,192C960,213,1056,235,1152,218.7C1248,203,1344,149,1392,122.7L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
      ></motion.path>
      <motion.path
        initial={{ opacity: 0, y: 80 }}
        animate={{ opacity: 0.5, y: 0 }}
        transition={{ duration: 1.8, delay: 0.8 }}
        fill="#ffffff"
        fillOpacity="0.2"
        d="M0,96L48,128C96,160,192,224,288,224C384,224,480,160,576,138.7C672,117,768,139,864,154.7C960,171,1056,181,1152,165.3C1248,149,1344,107,1392,85.3L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
      ></motion.path>
    </svg>
  </div>
);




const AnimatedButton = ({ href, primary, children }) => (
  <motion.a
    href={href}
    className={`inline-flex items-center justify-center shadow-glow ${
      primary
        ? "bg-gradient-to-r from-indigo-800 to-blue-700 text-white"
        : "bg-transparent border-thin border-white hover:bg-white hover:text-indigo-700 text-white"
    } py-2 px-4 rounded-lg shadow-lg transition duration-300 font-medium text-size13 z-20`}
    whileHover={{ 
      boxShadow: "0 10px 25px -5px rgba(66, 85, 255, 0.4)" 
    }}
    whileTap={{ scale: 0.98 }}
  >
    {children}
    <svg
      className="ml-2 w-5 h-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M14 5l7 7m0 0l-7 7m7-7H3"
      ></path>
    </svg>
  </motion.a>
);

function Home() {
  return (
    <>
      <div className="h-screen relative overflow-hidden bg-gradient-to-br from-blue-950 via-blue-950 to-blue-900 text-white">
        <Navbar/>
        <StarsBackground /> 
        <div className="max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-10 lg:py-20">
          
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <motion.h1
                className="text-4xl font-extrabold sm:text-6xl"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
              >
                <span className="block">Simplifiez la gestion de</span>
                <span className="block text-indigo-300"> vos stagiaires</span>
              </motion.h1>
              <motion.p
                className="text-lg sm:text-xl text-gray-200 z-30"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, delay: 0.2 }}
              >
                Propulsez votre programme de stages vers l'excellence avec une plateforme intelligente qui automatise le suivi, optimise l'apprentissage et maximise le potentiel de chaque stagiaire.
              </motion.p>
              
            <motion.div 
                className="flex flex-wrap gap-4 pt-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                <AnimatedButton href="#features" primary>
                  Découvrir nos solutions
                </AnimatedButton>
                <AnimatedButton href="#contact">
                  Demander une démo
                </AnimatedButton>
              </motion.div>
            </div>
            <DeskIllustration />
          </div>
        </div>
        <WaveIllustration />
      </div>  

      {/* Features Section */}
      <div className="bg-custom-600 to-blue-900 py-16" id="features">
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