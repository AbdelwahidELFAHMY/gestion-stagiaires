// hooks/useToastConfirm.js
import { toast } from 'react-toastify';

export const useToastConfirm = () => {
  const confirm = (message, onConfirm) => {
    toast.info(
      <div>
        <p>{message}</p>
        <div className="flex justify-end gap-2 mt-2">
          <button
            onClick={() => {
              toast.dismiss();
              onConfirm();
            }}
            className="px-3 py-1 bg-red-500 text-white rounded text-sm"
          >
            Confirmer
          </button>
          <button
            onClick={() => toast.dismiss()}
            className="px-3 py-1 bg-gray-300 rounded text-sm"
          >
            Annuler
          </button>
        </div>
      </div>,
      {
        position: "top-center",
        autoClose: false,
        closeOnClick: false,
        draggable: false,
        closeButton: false,
      }
    );
  };

  return { confirm };
};