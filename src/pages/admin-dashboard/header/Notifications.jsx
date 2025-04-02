import { useState, useEffect, useCallback, useMemo, useRef, memo } from 'react';
import { FaTimes, FaCheck, FaCheckDouble } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const NotificationItem = memo(function NotificationItem({ notification, onMarkAsRead }) {
  const [expanded, setExpanded] = useState(false);
  
  const formatDate = useCallback((dateString) => {
    try {
      const date = new Date(dateString);
      return isNaN(date.getTime()) 
        ? 'Date inconnue' 
        : date.toLocaleDateString('fr-FR', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          });
    } catch {
      return 'Date inconnue';
    }
  }, []);

  return (
    <motion.li
      initial={{ opacity: 0, x: 10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.2 }}
      className={`py-3 px-2 hover:bg-gray-50 dark:hover:bg-gray-700 ${
        !notification.read ? 'bg-blue-50/50 dark:bg-blue-900/20' : ''
      }`}
    >
      <div className="flex justify-between items-start gap-2">
        <div className="flex-1 min-w-0">
          <p 
            className={`text-sm text-gray-800 dark:text-gray-200 break-words whitespace-pre-wrap ${
              !expanded && notification.message.length > 100 ? 'line-clamp-3' : ''
            }`}
          >
            {notification.message}
          </p>
          {notification.message.length > 100 && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="cursor-pointer text-xs text-blue-500 hover:text-blue-700 dark:hover:text-blue-400 mt-1"
            >
              {expanded ? 'Voir moins' : 'Voir plus'}
            </button>
          )}
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            {formatDate(notification.dateEnvoie)}
          </p>
        </div>
        <button
          onClick={() => onMarkAsRead(notification.id)}
          disabled={notification.read}
          className={` ml-2 p-1.5 rounded-full flex-shrink-0 ${
            notification.read 
              ? 'text-gray-400 dark:text-gray-500 cursor-default' 
              :  'cursor-pointer text-green-500 hover:bg-green-50 dark:hover:bg-green-900/20'
          }`}
          aria-label={notification.read ? "Notification lue" : "Marquer comme lu"}
        >
          {notification.read ? <FaCheck size={12} /> : <FaCheckDouble size={12} />}
        </button>
      </div>
    </motion.li>
  );
});

const Notifications = ({ notifications, isOpen, onClose, onMarkAsRead }) => {
  const [hasUnread, setHasUnread] = useState(false);
  const modalRef = useRef();

  // Gestion du clic en dehors
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  const sortedNotifications = useMemo(() => {
    return [...notifications].sort((a, b) => 
      new Date(b.dateEnvoie) - new Date(a.dateEnvoie)
    );
  }, [notifications]);

  useEffect(() => {
    setHasUnread(notifications.some(n => !n.read));
  }, [notifications]);

  const markAllAsRead = useCallback(() => {
    notifications.forEach(notification => {
      if (!notification.read) {
        onMarkAsRead(notification.id);
      }
    });
  }, [notifications, onMarkAsRead]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={modalRef}
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ 
            type: 'spring',
            damping: 25,
            stiffness: 500
          }}
          className="fixed right-4 top-16 z-50 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700"
        >
          <div className="p-4">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-sm font-semibold text-gray-800 dark:text-white">
                Notifications
              </h3>
              <div className="flex items-center gap-3">
                {hasUnread && (
                  <button
                    onClick={markAllAsRead}
                    className="cursor-pointer text-xs text-blue-500 hover:text-blue-700 dark:hover:text-blue-300 px-2 py-1 rounded hover:bg-blue-100 dark:hover:bg-blue-400/10 transition-colors"
                  >
                    Tout marquer comme lu
                  </button>
                )}
                <button 
                  onClick={onClose}
                  className="cursor-pointer text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                  aria-label="Fermer les notifications"
                >
                  <FaTimes size={15} />
                </button>
              </div>
            </div>

            <div className="max-h-[calc(100vh-10rem)] overflow-y-auto">
              {sortedNotifications.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-8 text-gray-500 dark:text-gray-400"
                >
                  Aucune notification
                </motion.div>
              ) : (
                <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                  {sortedNotifications.map((notification) => (
                    <NotificationItem
                      key={notification.id}
                      notification={notification}
                      onMarkAsRead={onMarkAsRead}
                    />
                  ))}
                </ul>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

Notifications.displayName = 'Notifications';

export default memo(Notifications);