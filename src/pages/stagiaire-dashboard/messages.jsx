import { useState } from "react";
import { AiOutlineSend } from "react-icons/ai"; // Import de l'icône

const Messaging = () => {
  const [messages, setMessages] = useState([
    {
      sender: "John Doe",
      content: "Salut ! Comment ça va ?",
      timestamp: "2025-02-08 14:20",
      isUser: false,
      avatar: "https://i.pravatar.cc/50",
    },
    {
      sender: "Moi",
      content: "Ça va bien, merci ! Et toi ?",
      timestamp: "2025-02-08 14:25",
      isUser: true,
      avatar: "https://i.pravatar.cc/60",
    },
    {
      sender: "John Doe",
      content: "Super ! J'ai une question pour toi.",
      timestamp: "2025-02-08 14:30",
      isUser: false,
      avatar: "https://i.pravatar.cc/100",
    },
  ]);

  const [newMessage, setNewMessage] = useState("");

  // Function to calculate the time difference
  const timeAgo = (timestamp) => {
    const now = new Date();
    const messageTime = new Date(timestamp);
    const differenceInSeconds = Math.floor((now - messageTime) / 1000);
    const differenceInMinutes = Math.floor(differenceInSeconds / 60);
    const differenceInHours = Math.floor(differenceInMinutes / 60);
    const differenceInDays = Math.floor(differenceInHours / 24);
    const differenceInMonths = Math.floor(differenceInDays / 30);
    const differenceInYears = Math.floor(differenceInDays / 365);

    if (differenceInYears > 0) {
      return `Il y a ${differenceInYears} an${differenceInYears > 1 ? 's' : ''}`;
    } else if (differenceInMonths > 0) {
      return `Il y a ${differenceInMonths} mois`;
    } else if (differenceInDays > 0) {
      return `Il y a ${differenceInDays} jour${differenceInDays > 1 ? 's' : ''}`;
    } else if (differenceInHours > 0) {
      return `Il y a ${differenceInHours} heure${differenceInHours > 1 ? 's' : ''}`;
    } else if (differenceInMinutes > 0) {
      return `Il y a ${differenceInMinutes} minute${differenceInMinutes > 1 ? 's' : ''}`;
    } else {
      return `Il y a quelques secondes`;
    }
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const newMessageObj = {
        sender: "Moi",
        content: newMessage,
        timestamp: new Date().toLocaleString(),
        isUser: true,
        avatar: "https://via.placeholder.com/40", // Votre avatar ici
      };
      setMessages([...messages, newMessageObj]);
      setNewMessage(""); // Clear the input field
    }
  };

  return (
    <div className="mt-4">
      <div className="h-[calc(100vh-150px)] overflow-y-auto overflow-x-hidden scrollbar-thin">
        {/* Affichage des messages */}
        {messages.map((message, index) => (
          <div key={index} className="px-2 flex flex-col items-start space-y-2">
            {/* Entête du message */}
            <div className="flex items-center space-x-3 mt-6">
              {/* Image de profil */}
              <img
                src={message.avatar}
                alt={`${message.sender}'s avatar`}
                className="w-10 h-10 rounded-full"
              />
              <div className="flex justify-between w-full">
                <div className="flex flex-col">
                  <p className="font-semibold">{message.sender}</p>
                  <p className="text-xs text-gray-500">{timeAgo(message.timestamp)}</p>
                </div>
              </div>
            </div>

            {/* Contenu du message */}
            <div
              className={`max-w-xs ml-6 mr-2 p-3 rounded-lg ${
                message.isUser ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-700"
              }`}
              style={{
                wordWrap: "break-word",
                overflowWrap: "break-word",
                whiteSpace: "pre-wrap",
              }}
            >
              <p>{message.content}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="m-4 text-size14 flex items-center">
        <input
          type="text"
          placeholder="Informer votre equipe..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="w-full p-2 border-1 border-gray-200 focus:ring-1 focus:ring-gray-300 focus:outline-none rounded"
        />
        {/* Remplacer le bouton par une icône d'envoi */}
        <button
          onClick={handleSendMessage}
          className="ml-2 bg-blue-500 hover:cursor-pointer text-white p-2 rounded flex items-center justify-center"
        >
          <AiOutlineSend size={16} />
        </button>
      </div>
    </div>
  );
};

export default Messaging;
