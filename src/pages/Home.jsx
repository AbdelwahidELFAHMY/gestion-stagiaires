import Navbar from "../components/navbar";
import { motion } from "framer-motion";
import { DeskIllustration } from "../assets/Illustration";
import { Decor } from "../assets/Decor";
import FeatureCard from "./FeatureCard";
import { BarChart3, CalendarClockIcon, Clock, LucideAward, ShieldCheck, Users2Icon } from "lucide-react";
import Footer from "../components/Footer ";


const features = [
  {
    icon: <Users2Icon size={24} className="text-white" />,
    title: "Suivi personnalisé",
    description: "Suivez le parcours de chaque stagiaire avec des tableaux de bord personnalisés et des indicateurs de progression clairs."
  },
  {
    icon: <BarChart3 size={24} className="text-white" />,
    title: "Analyses détaillées",
    description: "Obtenez des insights précis sur les performances de votre programme de stages et de vos stagiaires."
  },
  {
    icon: <CalendarClockIcon size={24} className="text-white" />,
    title: "Planification avancée",
    description: "Planifiez les formations, réunions et évaluations avec un calendrier intuitif synchronisé pour tous les participants."
  },
  {
    icon: <LucideAward size={24} className="text-white" />,
    title: "Certifications",
    description: "Créez et distribuez des certificats de compétences pour valoriser le parcours de vos stagiaires."
  },
  {
    icon: <Clock size={24} className="text-white" />,
    title: "Automatisation",
    description: "Automatisez les tâches répétitives comme les rappels, rapports et notifications pour gagner du temps."
  },
  {
    icon: <ShieldCheck size={24} className="text-white" />,
    title: "Conformité assurée",
    description: "Assurez-vous que votre programme de stages respecte toutes les réglementations en vigueur."
  },
];

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
    x: Math.random() * 100 + "%",
    y: Math.random() * 100 + "%",
    size: Math.random() * 15 + "px",
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
      x: Math.random() * 100 + "%",
      y: Math.random() * 100 + "%",
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


const WaveIllustration = () => (
  <div className="absolute bottom-0 left-0 w-full overflow-hidden z-10 pointer-events-none">
    <svg className="w-full" viewBox="0 0 1440 320" preserveAspectRatio="none">
      {/* Couche 1 - nuage foncé et flouté avec une touche de violet */}
      <motion.path
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 0.15, y: 0 }}
        transition={{ duration: 2, delay: 0.3 }}
        fill="#3f2a7b" // violet profond avec une teinte bleutée
        style={{ filter: "blur(2px)" }}
        d="M0,192L48,208C96,224,192,256,288,245.3C384,235,480,181,576,165.3C672,149,768,171,864,192C960,213,1056,235,1152,218.7C1248,203,1344,149,1392,122.7L1440,96L1440,320L0,320Z"
      />
      
      {/* Couche 2 - plus claire, avec une touche violette */}
      <motion.path
        initial={{ opacity: 0, y: 80 }}
        animate={{ opacity: 0.25, y: 0 }}
        transition={{ duration: 2.2, delay: 0.6 }}
        fill="#6a4f96" // violet plus doux avec une nuance bleue
        style={{ filter: "blur(2px)" }}
        d="M0,96L48,128C96,160,192,224,288,224C384,224,480,160,576,138.7C672,117,768,139,864,154.7C960,171,1056,181,1152,165.3C1248,149,1344,107,1392,85.3L1440,64L1440,320L0,320Z"
      />
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
      boxShadow: "0 10px 25px -5px rgba(66, 85, 255, 0.4)",
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
      <div className="h-screen relative overflow-hidden bg-gradient-to-tr from-indigo-950 via-indigo-950 to-blue-900 text-white">
        <Navbar />
        <StarsBackground />
        <div className="max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-10 lg:py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <motion.h1
                className="text-4xl z-60 font-extrabold sm:text-size50 lg:text-5xl leading-[1.1] sm:leading-[1.1] space-y-2 sm:space-y-3"
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.15,
                      delayChildren: 0.1
                    }
                  }
                }}
              >
                {/* Ligne 1 */}
                <motion.span
                  className="block"
                  variants={{
                    hidden: { opacity: 0, y: 15 },
                    visible: { 
                      opacity: 1, 
                      y: 0,
                      transition: {
                        duration: 0.8,
                        ease: [0.16, 0.77, 0.47, 0.97] // Courbe plus smooth
                      }
                    }
                  }}
                >
                  Simplifiez, Optimisez
                </motion.span>

                {/* Ligne 2 */}
                <motion.span
                  className="block"
                  variants={{
                    hidden: { opacity: 0, y: 15 },
                    visible: { 
                      opacity: 1, 
                      y: 0,
                      transition: {
                        duration: 0.8,
                        ease: [0.16, 0.77, 0.47, 0.97],
                        delay: 0.1
                      }
                    }
                  }}
                >
                  la processus des stages,
                </motion.span>

                {/* Ligne 3 avec effet gradient animé */}
                <motion.span
                  className="block"
                  variants={{
                    hidden: { opacity: 0, y: 15 },
                    visible: { 
                      opacity: 1, 
                      y: 0,
                      transition: {
                        duration: 0.8,
                        ease: [0.16, 0.77, 0.47, 0.97],
                        delay: 0.2
                      }
                    }
                  }}
                >
                  <motion.span
                    className="bg-gradient-to-r from-rose-400 via-purple-500 to-indigo-400 bg-clip-text text-transparent"
                    animate={{
                      backgroundPosition: ["0% 50% ", "100% 50%"],
                    }}
                    transition={{
                      duration: 10,
                      repeat: Infinity,
                      repeatType: "reverse",
                      ease: "linear",
                    }}
                    style={{
                      backgroundSize: "200% 200%",
                    }}
                  >
                    la gestion des stagiaires
                  </motion.span>
                </motion.span>
              </motion.h1>
              <motion.p
                className="text-size15 sm:text-size17 text-gray-50"
                initial={{ opacity: 0, y: 10 }}
                animate={{ 
                  opacity: 1, 
                  y: 0,
                  transition: {
                    duration: 1,
                    ease: [0.16, 0.77, 0.47, 0.97],
                    delay: 0.3
                  }
                }}
              >
                Propulsez votre programme de stages vers l'excellence avec une
                plateforme intelligente qui automatise le suivi, optimise
                l'apprentissage et maximise le potentiel de chaque stagiaire.
              </motion.p>

              <motion.div
                className="flex flex-wrap gap-4 pt-4"
                initial={{ opacity: 0, y: 10 }}
        animate={{ 
          opacity: 1, 
          y: 0,
          transition: {
            duration: 0.8,
            ease: [0.16, 0.77, 0.47, 0.97],
            delay: 0.3
          }
        }}
        >
                <AnimatedButton href="#features" primary>
                  Découvrir nos solutions
                </AnimatedButton>
                <AnimatedButton href="#contact">
                  Demander une démo
                </AnimatedButton>
              </motion.div>
            </div><motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ 
        opacity: 1, 
        x: 0,
        transition: {
          duration: 1,
          ease: [0.16, 0.77, 0.47, 0.97],
          delay: 0.3
        }
      }}
    >
      <DeskIllustration />
    </motion.div>
          </div>

        </div>
        <WaveIllustration />
      </div>
      <section className="py-20 bg-gradient-to-br from-blue-950 via-indigo-950 to-indigo-950">
        <div className="max-w-screen-xl mx-auto px-6 sm:px-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <motion.div
              className="lg:w-1/2"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, margin: "0px 0px -100px 0px" }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-100 mb-6">
                Une interface fluide et flexible
              </h2>
              <p className="text-lg text-gray-300 mb-8">
                Notre tableau de bord intuitif vous donne un contrôle total sur 
                le processus de stage, avec des visualisations claires et des 
                outils puissants pour suivre chaque stagiaire.
              </p>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-indigo-500 rounded-full p-1 mt-1">
                    <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="ml-3 text-gray-300">Suivi en temps réel des stagiaires</p>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-indigo-500 rounded-full p-1 mt-1">
                    <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="ml-3 text-gray-300">Gestion simplifiée des documents</p>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-indigo-500 rounded-full p-1 mt-1">
                    <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="ml-3 text-gray-300">Analyses et rapports automatisés</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="lg:w-1/2"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Decor />
            </motion.div>
          </div>
        </div>
      </section>

      
      <section className="py-20 bg-gradient-to-br from-blue-950 via-indigo-950 to-indigo-950">

      <div id="features" className="max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-10 py-14">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            <span className="text-indigo-100 bg-clip-text bg-gradient-to-r from-stellar-300 to-stellar-400">
              Fonctionnalités puissantes
            </span>
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Découvrez comment notre plateforme transforme la gestion des stagiaires en une expérience fluide et efficace pour tous les acteurs impliqués.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard 
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              index={index}
            />
          ))}
        </div>
      </div>
      </section>

      
      {/* Footer */}
      <section className="bg-gradient-to-t from-indigo-950 to-blue-950">  
        <Footer/>
</section>


  
    </>
  );
}

export default Home;
