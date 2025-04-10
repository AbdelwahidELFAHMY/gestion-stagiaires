import React from 'react'
import { AlertTriangle } from 'lucide-react'

export default function Ressources() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-4 bg-gray-50">
      <div className="bg-white rounded-xl p-8 max-w-md w-full">
        <div className="flex flex-col items-center space-y-4">
          <AlertTriangle className="text-yellow-500 w-16 h-16" />
          <h1 className="text-2xl font-semibold text-gray-800">Page non implémentée</h1>
          <p className="text-gray-600">
            La section des ressources de formation de l'entreprise est en cours de développement. 
            Merci de revenir plus tard.
          </p>
        </div>
      </div>
    </div>
  )
}
