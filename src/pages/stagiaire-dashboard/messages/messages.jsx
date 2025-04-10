import { useState, useEffect, useRef, useCallback } from "react";
import { AiOutlineSend, AiOutlineComment } from "react-icons/ai";
import { UserCircle2 } from "lucide-react";
import { FiAlertCircle } from "react-icons/fi";
import Skeleton from "react-loading-skeleton";
import GetImageFromURL from "../../../utils/getImageFromURL";
import { getUsernameFromToken } from "../../../utils/getUsernameFromToken";
import axiosInstance from "../../../utils/axiosInstance";
import { addCommentaire, fetchCommentaires } from "../../../stores/commentaires_slices/commentaireSlice";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";

const Messaging = () => {
  const messagesContainerRef = useRef(null);
  const isScrolledToBottomRef = useRef(true);
  const prevCommentairesLength = useRef(0);
  const dispatch = useDispatch();
  const { items: commentaires, status } = useSelector(
    (state) => state.commentaires
  );

  const [newMessage, setNewMessage] = useState("");
  const username = getUsernameFromToken();
  const stageId = localStorage.getItem("stageId");

  // Chargement initial des commentaires
  useEffect(() => {
    if (stageId) {
      dispatch(fetchCommentaires(stageId));
    }
  }, [dispatch, stageId]);

  // Gestion du scroll
  const checkScrollPosition = useCallback(() => {
    if (!messagesContainerRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = messagesContainerRef.current;
    const isAtBottom = scrollHeight - (scrollTop + clientHeight) < 50;
    isScrolledToBottomRef.current = isAtBottom;
  }, []);

  const scrollToBottom = useCallback((behavior = "smooth") => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTo({
        top: messagesContainerRef.current.scrollHeight,
        behavior,
      });
    }
  }, []);

  useEffect(() => {
    const container = messagesContainerRef.current;
    if (!container) return;

    container.addEventListener("scroll", checkScrollPosition);
    return () => container.removeEventListener("scroll", checkScrollPosition);
  }, [checkScrollPosition]);

  useEffect(() => {
    const isNewMessageAdded = commentaires.length > prevCommentairesLength.current;
    if (isNewMessageAdded || prevCommentairesLength.current === 0) {
      if (isScrolledToBottomRef.current) {
        scrollToBottom();
      }
    }
    prevCommentairesLength.current = commentaires.length;
  }, [commentaires.length, scrollToBottom]);

  // Affichage du temps écoulé
  const timeAgo = (timestamp) => {
    if (!timestamp) return "Maintenant";
    const now = new Date();
    const messageTime = new Date(timestamp);
    const differenceInSeconds = Math.floor((now - messageTime) / 1000);
    const differenceInMinutes = Math.floor(differenceInSeconds / 60);
    const differenceInHours = Math.floor(differenceInMinutes / 60);
    const differenceInDays = Math.floor(differenceInHours / 24);
    const differenceInMonths = Math.floor(differenceInDays / 30);
    const differenceInYears = Math.floor(differenceInDays / 365);

    if (differenceInYears > 0) {
      return `Il y a ${differenceInYears} an${differenceInYears > 1 ? "s" : ""}`;
    } else if (differenceInMonths > 0) {
      return `Il y a ${differenceInMonths} mois`;
    } else if (differenceInDays > 0) {
      return `Il y a ${differenceInDays} jour${differenceInDays > 1 ? "s" : ""}`;
    } else if (differenceInHours > 0) {
      return `Il y a ${differenceInHours} heure${differenceInHours > 1 ? "s" : ""}`;
    } else if (differenceInMinutes > 0) {
      return `Il y a ${differenceInMinutes} minute${differenceInMinutes > 1 ? "s" : ""}`;
    } else {
      return `Maintenant`;
    }
  };

  // Envoi d'un nouveau message
  const handleSendMessage = async () => {
    if (newMessage.trim() && stageId) {
      try {
        await dispatch(
          addCommentaire({
            stageId,
            commentaire: newMessage,
          })
        ).unwrap();
        setNewMessage("");
      } catch (err) {
        toast.error("Échec de l'envoi du commentaire");
        console.error("Erreur lors de l'ajout du commentaire:", err);
      }
    }
  };

  // État de chargement
  if (status === "loading") {
    return (
      <div className="mt-4">
        <div className="h-[calc(100vh-150px)] overflow-y-auto overflow-x-hidden scrollbar-thin">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="px-2 flex flex-col items-start space-y-2 mb-6">
              <div className="flex items-center space-x-3 mt-6">
                <Skeleton circle width={40} height={40} />
                <div className="flex flex-col">
                  <Skeleton width={150} height={15} />
                  <Skeleton width={80} height={12} className="mt-1" />
                </div>
              </div>
              <div className="ml-12">
                <Skeleton width={250} height={60} />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // État d'erreur
  if (status === "failed") {
    return (
      <div className="ml-8 flex flex-col items-center justify-center h-[calc(100vh-150px)]">
        <FiAlertCircle className="text-red-500 text-5xl mb-4" />
        <p className="text-lg font-medium text-gray-700">Erreur de chargement</p>
        <p className="text-sm text-gray-500 mt-2">
          Impossible de charger les commentaires
        </p>
        <button
          onClick={() => stageId && dispatch(fetchCommentaires(stageId))}
          className="mt-4 px-4 py-2 text-xs bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Réessayer
        </button>
      </div>
    );
  }

  // État vide
  if (commentaires.length === 0) {
    return (
      <div className="ml-10 flex flex-col items-center justify-center h-[calc(100vh-150px)]">
        <AiOutlineComment className="text-gray-400 text-6xl mb-4" />
        <p className="text-lg font-medium text-gray-700">Aucun commentaire</p>
        <p className="text-sm text-gray-500 mt-2">
          Soyez le premier à commenter
        </p>
      </div>
    );
  }

  // État normal avec commentaires
  return (
    <div className="mt-4">
      <div
        ref={messagesContainerRef}
        className="h-[calc(100vh-150px)] overflow-y-auto overflow-x-hidden scrollbar-thin"
      >
        {commentaires.map((commentaire, index) => {
          const isUser = commentaire.stagiaireUsername === username;
          return (
            <div key={index} className="px-2 flex flex-col items-start space-y-2">
              <div className="flex items-center space-x-3 mt-6">
                {commentaire.stagiairePhoto ? (
                  <GetImageFromURL
                    logoUrl={`${axiosInstance.defaults.baseURL.replace(
                      "/api",
                      ""
                    )}/photos/${commentaire.stagiairePhoto.replace("photos/", "")}`}
                    alt="photo"
                    className="h-10 w-10 rounded-full border-thin object-cover"
                  />
                ) : (
                  <UserCircle2 className="h-10 w-10 text-neutral-800" />
                )}
                <div className="flex justify-between">
                  <div className="flex flex-col">
                    <p className="font-semibold text-size13">
                      {commentaire.stagiaireFullName}
                    </p>
                    <p className="text-size10 text-gray-500">
                      {timeAgo(commentaire.dateTime)}
                    </p>
                  </div>
                </div>
              </div>

              <div
                className={`max-w-xs ml-6 text-size12 mr-2 p-2 rounded-lg ${
                  isUser
                    ? "bg-blue-100 text-gray-900"
                    : "bg-gray-100 text-gray-700"
                }`}
                style={{
                  wordWrap: "break-word",
                  overflowWrap: "break-word",
                  whiteSpace: "pre-wrap",
                }}
              >
                <p>{commentaire.commentaire}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="m-4 text-size14 flex items-center">
        <input
          type="text"
          placeholder="Informer votre équipe..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
          className="w-full p-2 border-1 border-gray-200 focus:ring-1 focus:ring-gray-300 focus:outline-none rounded"
        />
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