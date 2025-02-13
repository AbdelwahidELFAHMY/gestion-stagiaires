import { useState, useEffect } from 'react';
import { Bell } from 'lucide-react';
import { motion } from 'framer-motion';

const Notifications = () => {
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Simuler la récupération des notifications
    setNotifications([
      { id: 1, text: 'Nouvelle mise à jour disponible.' },
      { id: 2, text: 'Vous avez un nouveau message.' },
      { id: 3, text: 'Votre profil a été mis à jour.' },
    ]);
  }, []);

  const toggleNotifications = () => {
    setIsNotificationsOpen(!isNotificationsOpen);
  };

  return (
    <div className="relative z-10">
      {/* Icône de notification */}
      <div className="relative cursor-pointer" onClick={toggleNotifications}>
        <Bell className="h-6 w-6 text-gray-600" />
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full px-1">
          {notifications.length}
        </span>
      </div>

      {/* Liste des notifications */}
      {isNotificationsOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="absolute right-0 top-12 mt-2 w-64 bg-white shadow-lg rounded-lg overflow-hidden"
          onMouseLeave={() => setIsNotificationsOpen(false)} // Fermer quand la souris quitte
        >
          <ul className="text-gray-700">
            {notifications.map((notification) => (
              <li
                key={notification.id}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                {notification.text}
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </div>
  );
};

export default Notifications;
