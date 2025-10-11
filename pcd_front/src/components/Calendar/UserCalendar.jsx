import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { BellIcon } from '@heroicons/react/24/outline';

const UserCalendar = () => {
    const { email } = useParams();
    const navigate = useNavigate();
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const [showNotifications, setShowNotifications] = useState(false);

    // Charger les notifications depuis localStorage au montage
    useEffect(() => {
        if (email) {
            fetchEvents();
            const savedNotifications = localStorage.getItem(`notifications_${email}`);
            if (savedNotifications) {
                setNotifications(JSON.parse(savedNotifications));
            }
            
            // Simuler la réception d'invitations (à remplacer par votre logique réelle)
            const checkForNewInvitations = () => {
                const mockInvitations = [
                    {
                        id: 'invite1',
                        message: "Vous avez été invité à 'Réunion projet' par admin@example.com",
                        read: false,
                        timestamp: new Date().toISOString()
                    }
                ];
                
                // Vérifier si ces invitations sont déjà dans les notifications
                mockInvitations.forEach(invite => {
                    if (!notifications.some(n => n.id === invite.id)) {
                        addNotification(invite);
                    }
                });
            };
            
            checkForNewInvitations();
        }
    }, [email]);

    const fetchEvents = async () => {
        setLoading(true);
        try {
            // Remplacez par votre appel API réel
            const mockEvents = [
                {
                    id: 'event1',
                    summary: 'Réunion projet',
                    description: 'Discussion du nouveau projet',
                    start: { dateTime: new Date(Date.now() + 86400000).toISOString() },
                    end: { dateTime: new Date(Date.now() + 86400000 + 3600000).toISOString() },
                    organizer: { email: 'admin@example.com' }
                }
            ];
            setEvents(mockEvents);
        } catch (error) {
            console.error("Erreur:", error);
        } finally {
            setLoading(false);
        }
    };

    const addNotification = (notification) => {
        const newNotifications = [notification, ...notifications];
        setNotifications(newNotifications);
        localStorage.setItem(`notifications_${email}`, JSON.stringify(newNotifications));
        
        // Notification système
        if ('Notification' in window && Notification.permission === 'granted') {
            new Notification('Nouvelle invitation', {
                body: notification.message
            });
        }
    };

    const markAsRead = (id) => {
        const updatedNotifications = notifications.map(n => 
            n.id === id ? { ...n, read: true } : n
        );
        setNotifications(updatedNotifications);
        localStorage.setItem(`notifications_${email}`, JSON.stringify(updatedNotifications));
    };

    const clearAllNotifications = () => {
        setNotifications([]);
        localStorage.removeItem(`notifications_${email}`);
    };

    const unreadCount = notifications.filter(n => !n.read).length;

    // Demander la permission pour les notifications système
    const requestNotificationPermission = () => {
        if ('Notification' in window) {
            Notification.requestPermission().then(permission => {
                if (permission === 'granted') {
                    console.log('Permission accordée pour les notifications');
                }
            });
        }
    };

    return (
        <div className="container mx-auto p-4 max-w-4xl">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Mon Calendrier</h1>
                <div className="flex items-center space-x-4">
                    <div className="relative">
                        <button 
                            onClick={() => {
                                setShowNotifications(!showNotifications);
                                requestNotificationPermission();
                            }}
                            className="p-2 rounded-full hover:bg-gray-200 relative"
                        >
                            <BellIcon className="h-6 w-6 text-gray-600" />
                            {unreadCount > 0 && (
                                <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                    {unreadCount}
                                </span>
                            )}
                        </button>
                        
                        {showNotifications && (
                            <div className="absolute right-0 mt-2 w-72 bg-white rounded-md shadow-lg overflow-hidden z-10 border border-gray-200">
                                <div className="py-1">
                                    <div className="px-4 py-2 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
                                        <p className="font-semibold">Notifications</p>
                                        <button 
                                            onClick={clearAllNotifications}
                                            className="text-xs text-blue-500 hover:text-blue-700"
                                        >
                                            Tout effacer
                                        </button>
                                    </div>
                                    {notifications.length === 0 ? (
                                        <div className="px-4 py-3 text-sm text-gray-500">
                                            Aucune notification
                                        </div>
                                    ) : (
                                        notifications.map(notification => (
                                            <div 
                                                key={notification.id} 
                                                className={`px-4 py-3 border-b border-gray-100 hover:bg-gray-50 cursor-pointer ${!notification.read ? 'bg-blue-50' : ''}`}
                                                onClick={() => markAsRead(notification.id)}
                                            >
                                                <p className="text-sm">{notification.message}</p>
                                                <p className="text-xs text-gray-500 mt-1">
                                                    {new Date(notification.timestamp).toLocaleString()}
                                                </p>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                    
                    <button 
                        onClick={() => navigate('/organizer')}
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                    >
                        Mode Organisateur
                    </button>
                </div>
            </div>

            <div className="mb-4">
                <p className="text-lg">Événements pour: <span className="font-semibold">{email}</span></p>
            </div>

            {loading ? (
                <p>Chargement des événements...</p>
            ) : events.length === 0 ? (
                <p>Aucun événement trouvé</p>
            ) : (
                <div className="space-y-4">
                    {events.map((event) => (
                        <div key={event.id} className="border p-4 rounded-lg shadow">
                            <h3 className="font-bold text-lg">{event.summary}</h3>
                            <p className="text-gray-600">{event.description}</p>
                            <div className="grid grid-cols-2 gap-4 mt-2">
                                <div>
                                    <p className="text-sm font-semibold">Début:</p>
                                    <p>{new Date(event.start.dateTime).toLocaleString()}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-semibold">Fin:</p>
                                    <p>{new Date(event.end.dateTime).toLocaleString()}</p>
                                </div>
                            </div>
                            {event.organizer && (
                                <div className="mt-2">
                                    <p className="text-sm font-semibold">Organisé par:</p>
                                    <p>{event.organizer.email}</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default UserCalendar;