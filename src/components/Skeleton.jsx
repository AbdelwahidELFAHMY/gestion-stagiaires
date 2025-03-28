import { useEffect, useState } from "react";

export default function Skeleton() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    setIsDarkMode(document.documentElement.classList.contains("dark"));
  }, []);

  return (
    <div className="animate-pulse flex flex-col space-y-4 h-full">
      {/* Titre */}
      <div className="h-6 w-1/2 mx-auto rounded-md bg-gray-300 dark:bg-gray-700"></div>
      
      {/* Contenu */}
      <div className="flex-grow w-full rounded-md bg-gray-300 dark:bg-gray-700"></div>
    </div>
  );
}
