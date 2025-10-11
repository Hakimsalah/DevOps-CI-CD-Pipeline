import React, { useState, useEffect } from 'react';
import { FaBell } from 'react-icons/fa';
import { API_BASE_URL } from '../../config';

const Notifications = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);

  const fetchNotifications = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/contact/`);
      const data = await res.json();
      const sorted = data.sort((a, b) => b.id - a.id).slice(0, 10);
      setNotifications(sorted);
    } catch (err) {
      console.error('Erreur lors de la récupération des notifications:', err);
    }
  };

  useEffect(() => {
    if (showNotifications) {
      fetchNotifications();
    }
  }, [showNotifications]);

  return (
    <div className="relative">
      <button 
        onClick={() => setShowNotifications(!showNotifications)}
        className="text-white hover:text-gray-300 focus:outline-none"
      >
        <FaBell className="text-xl" />
        {notifications.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
            {notifications.length}
          </span>
        )}
      </button>

      {showNotifications && (
        <div className="absolute right-0 mt-2 w-96 bg-white border rounded shadow-lg z-50 max-h-[400px] overflow-auto p-4 text-black">
          <h2 className="font-bold text-lg mb-2">Notifications</h2>
          {notifications.length === 0 ? (
            <p>Aucune notification</p>
          ) : (
            notifications.map((notif, index) => (
              <div key={index} className="mb-3 p-2 border-b border-gray-200">
                <p><strong>Nom:</strong> {notif.name}</p>
                <p><strong>Email:</strong> {notif.email}</p>
                <p><strong>Téléphone:</strong> {notif.phone}</p>
                <p><strong>Message:</strong> {notif.message}</p>
                <p className="text-xs text-gray-500">
                  {new Date(notif.createdAt).toLocaleString()}
                </p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Notifications;