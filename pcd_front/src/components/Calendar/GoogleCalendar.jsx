import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import ik from "../../assets/calendar.jpg"
import Footer from '../footer/footer';
import ChatBot from "../ChatBot/ChatBot";


const CLIENT_ID = '672081373696-i47g5vd5uks8r2c4sf0qclkd5l9tvqhj.apps.googleusercontent.com';
const SCOPES = [
  'https://www.googleapis.com/auth/calendar.events',
  'https://www.googleapis.com/auth/calendar.settings.readonly'
].join(' ');

const GoogleCalendar = () => {
    const [user, setUser] = useState(null);
    const [accessToken, setAccessToken] = useState(null);
    const [eventData, setEventData] = useState({
        summary: '',
        location: '',
        description: '',
        startDateTime: '',
        endDateTime: '',
        attendees: [],
    });
    const [newAttendee, setNewAttendee] = useState('');
    const [editNewAttendee, setEditNewAttendee] = useState('');
    const [events, setEvents] = useState([]);
    const [activeTab, setActiveTab] = useState('create');
    const [eventToEdit, setEventToEdit] = useState(null);
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        if (!window.google) {
            console.error('Google API not loaded.');
            return;
        }

        window.google.accounts.id.initialize({
            client_id: CLIENT_ID,
            callback: handleCallbackResponse,
        });

        window.google.accounts.id.renderButton(
            document.getElementById('signInDiv'),
            { theme: 'outline', size: 'large' }
        );
    }, []);

    function handleCallbackResponse(response) {
        const userObject = jwtDecode(response.credential);
        setUser(userObject);
        document.getElementById('signInDiv').hidden = true;
    }

    function handleSignOut() {
        setUser(null);
        setAccessToken(null);
        setEvents([]);
        document.getElementById('signInDiv').hidden = false;
    }

    function requestAccessToken() {
        const tokenClient = window.google.accounts.oauth2.initTokenClient({
            client_id: CLIENT_ID,
            scope: SCOPES,
            callback: (tokenResponse) => {
                if (tokenResponse && tokenResponse.access_token) {
                    setAccessToken(tokenResponse.access_token);
                }
            },
        });
        tokenClient.requestAccessToken();
    }

    function fetchEvents() {
        if (!accessToken) {
            requestAccessToken();
            return;
        }

        setLoading(true);
        fetch('https://www.googleapis.com/calendar/v3/calendars/primary/events', {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        })
            .then((response) => response.json())
            .then((data) => {
                setEvents(data.items || []);
            })
            .finally(() => setLoading(false));
    }

    function addAttendee() {
        if (!newAttendee.includes('@')) {
            alert('Please enter a valid email address');
            return;
        }
        setEventData({
            ...eventData,
            attendees: [...eventData.attendees, { email: newAttendee, responseStatus: 'needsAction' }]
        });
        setNewAttendee('');
    }

    function addEditAttendee() {
        if (!editNewAttendee.includes('@')) {
            alert('Please enter a valid email address');
            return;
        }
        setEventData({
            ...eventData,
            attendees: [...eventData.attendees, { email: editNewAttendee, responseStatus: 'needsAction' }]
        });
        setEditNewAttendee('');
    }

    function removeAttendee(email) {
        setEventData({
            ...eventData,
            attendees: eventData.attendees.filter(a => a.email !== email)
        });
    }

    async function createGoogleCalendarEvent() {
        if (!eventData.summary || !eventData.startDateTime || !eventData.endDateTime) {
            alert('All required fields must be filled!');
            return;
        }

        if (!accessToken) {
            requestAccessToken();
            return;
        }

        const event = {
            summary: eventData.summary,
            location: eventData.location,
            description: eventData.description,
            start: {
                dateTime: new Date(eventData.startDateTime).toISOString(),
                timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            },
            end: {
                dateTime: new Date(eventData.endDateTime).toISOString(),
                timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            },
            attendees: eventData.attendees,
            sendUpdates: 'all',
            conferenceData: {
                createRequest: {
                    requestId: crypto.randomUUID(),
                    conferenceSolutionKey: {
                        type: "hangoutsMeet"
                    }
                }
            },
            conferenceDataVersion: 1
        };

        const params = new URLSearchParams({
            conferenceDataVersion: '1',
            sendUpdates: 'all'
        });

        try {
            const response = await fetch(`https://www.googleapis.com/calendar/v3/calendars/primary/events?${params}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(event)
            });

            const data = await response.json();

            if (data.error) {
                throw new Error(data.error.message);
            }

            setSuccessMessage(`Event created successfully!${data.hangoutLink ? ` Meeting link: ${data.hangoutLink}` : ''}`);
            
            setEventData({
                summary: '',
                location: '',
                description: '',
                startDateTime: '',
                endDateTime: '',
                attendees: [],
            });

            fetchEvents();
        } catch (error) {
            console.error("Error creating event:", error);
            alert(`Error: ${error.message}`);
        }
    }

    function deleteEvent(eventId) {
        if (window.confirm('Are you sure you want to delete this event?')) {
            fetch(`https://www.googleapis.com/calendar/v3/calendars/primary/events/${eventId}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            })
                .then(() => {
                    setSuccessMessage('Event deleted successfully!');
                    fetchEvents();
                })
                .catch(error => {
                    console.error('Error deleting event:', error);
                    alert('Error deleting event');
                });
        }
    }

    function handleEditEvent(event) {
        setEventToEdit(event.id);
        setEventData({
            summary: event.summary,
            location: event.location || '',
            description: event.description || '',
            startDateTime: event.start.dateTime ? event.start.dateTime.slice(0, 16) : '',
            endDateTime: event.end.dateTime ? event.end.dateTime.slice(0, 16) : '',
            attendees: event.attendees ? event.attendees.filter(a => a.email !== user.email) : [],
        });
        setEditNewAttendee('');
    }

    async function updateEvent() {
        const updatedEvent = {
            summary: eventData.summary,
            location: eventData.location,
            description: eventData.description,
            start: {
                dateTime: new Date(eventData.startDateTime).toISOString(),
                timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            },
            end: {
                dateTime: new Date(eventData.endDateTime).toISOString(),
                timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            },
            attendees: eventData.attendees,
            sendUpdates: 'all'
        };

        const params = new URLSearchParams({
            sendUpdates: 'all'
        });

        try {
            const response = await fetch(`https://www.googleapis.com/calendar/v3/calendars/primary/events/${eventToEdit}?${params}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedEvent)
            });

            const data = await response.json();

            if (data.error) {
                throw new Error(data.error.message);
            }

            setSuccessMessage('Event updated successfully! Participants have been notified.');
            setEventToEdit(null);
            fetchEvents();
        } catch (error) {
            console.error("Error updating event:", error);
            alert(`Error: ${error.message}`);
        }
    }

    useEffect(() => {
        if (activeTab === 'manage' && accessToken) {
            fetchEvents();
        }
    }, [activeTab, accessToken]);

    useEffect(() => {
        if (successMessage) {
            const timer = setTimeout(() => setSuccessMessage(''), 5000);
            return () => clearTimeout(timer);
        }
    }, [successMessage]);

    return (
        <div className="relative flex flex-col items-center justify-center min-h-screen p-4 pt-20">
      <img 
        src={ik} 
        alt="" 
        aria-hidden="true"
        className="absolute top-0 left-0 w-full h-full object-cover z-[-1] " 
    />
            {!user ? (
                <div className="text-center">
                    <div id="signInDiv" className="inline-block"></div>
                </div>
            ) : (
                <div>
                    <div className="flex justify-between items-center mb-6 pt -20">
                        <h1 className="text-2xl font-bold text-gray-800">Organisateur de Google Calendar</h1>
                        <button 
                            onClick={handleSignOut}
                            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                        >
                            Se déconnecter
                        </button>
                    </div>

                    {successMessage && (
                        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                            {successMessage}
                        </div>
                    )}
                    <br></br>
                    <br></br>

                    <div className="flex space-x-4 mb-6 pt-20">
                        <button
                            onClick={() => setActiveTab('create')}
                            className={`px-4 py-2 rounded ${activeTab === 'create' ? 'bg-green-600 text-white' : 'bg-green-500 text-white hover:bg-green-600'} transition`}
                        >
                            Créer un événement
                        </button>
                        <button
                            onClick={() => setActiveTab('manage')}
                            className={`px-4 py-2 rounded ${activeTab === 'manage' ? 'bg-green-600 text-white' : 'bg-green-500 text-white hover:bg-green-600'} transition`}
                        >
                            Mes événements
                        </button>
                    </div>

                    {activeTab === 'create' && (
                        <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                                Créer un nouvel événement
                            </h2>
                            
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-gray-700 text-sm font-medium mb-2">
                                    Titre de l'événement *
                                    </label>
                                    <input
                                        type="text"
                                        value={eventData.summary}
                                        onChange={(e) => setEventData({...eventData, summary: e.target.value})}
                                        className="w-full px-3 py-2 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-gray-700 text-sm font-medium mb-2">
                                        Localisation (Facultatif)
                                    </label>
                                    <input
                                        type="text"
                                        value={eventData.location}
                                        onChange={(e) => setEventData({...eventData, location: e.target.value})}
                                        className="w-full px-3 py-2 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200"
                                    />
                                </div>

                                <div>
                                    <label className="block text-gray-700 text-sm font-medium mb-2">
                                        Description (Facultatif)
                                    </label>
                                    <textarea
                                        value={eventData.description}
                                        onChange={(e) => setEventData({...eventData, description: e.target.value})}
                                        className="w-full px-3 py-2 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200"
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-gray-700 text-sm font-medium mb-2">
                                        Start Date & Time*
                                        </label>
                                        <input
                                            type="datetime-local"
                                            value={eventData.startDateTime}
                                            onChange={(e) => setEventData({...eventData, startDateTime: e.target.value})}
                                            className="w-full px-3 py-2 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-gray-700 text-sm font-medium mb-2">
                                        Date et heure de fin
                                        </label>
                                        <input
                                            type="datetime-local"
                                            value={eventData.endDateTime}
                                            onChange={(e) => setEventData({...eventData, endDateTime: e.target.value})}
                                            className="w-full px-3 py-2 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="border border-gray-200 p-4 rounded-md">
                                    <h3 className="font-semibold text-gray-700 mb-2">Participant(Facultatif)</h3>
                                    <div className="flex mb-2">
                                        <input
                                            type="email"
                                            placeholder="Add attendee by email"
                                            value={newAttendee}
                                            onChange={(e) => setNewAttendee(e.target.value)}
                                            className="flex-1 px-3 py-2 text-gray-700 border border-gray-300 rounded-l-md focus:outline-none focus:border-green-500"
                                        />
                                        <button
                                            onClick={addAttendee}
                                            className="bg-green-500 text-white px-4 rounded-r-md hover:bg-green-600 transition"
                                        >
                                            Ajouter 
                                        </button>
                                    </div>
                                    <div className="space-y-2">
                                        {eventData.attendees.map((attendee) => (
                                            <div key={attendee.email} className="flex justify-between items-center bg-gray-100 p-2 rounded">
                                                <span className="text-gray-700">{attendee.email}</span>
                                                <button
                                                    onClick={() => removeAttendee(attendee.email)}
                                                    className="text-red-500 hover:text-red-700"
                                                >
                                                    ×
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <button
                                    onClick={createGoogleCalendarEvent}
                                    className="w-full bg-green-500 text-white py-3 px-4 rounded-md hover:bg-green-600 transition duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 disabled:bg-gray-400"
                                    disabled={!eventData.summary || !eventData.startDateTime || !eventData.endDateTime}
                                >
                                    Créer un événement
                                </button>
                            </div>
                        </div>
                    )}

                    {activeTab === 'manage' && (
                        <div className="bg-white shadow-md rounded-lg p-6">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6">Gérez vos événements</h2>
                            <button
                                onClick={fetchEvents}
                                className="bg-green-500 text-white px-4 py-2 rounded mb-4 hover:bg-green-600 transition disabled:bg-gray-400"
                                disabled={loading}
                            >
                                {loading ? 'Loading...' : 'Refresh List'}
                            </button>

                            {eventToEdit ? (
                                <div className="max-w-md mx-auto space-y-4">
                                    <h3 className="text-lg font-semibold text-gray-800">Modifier l'événement</h3>
                                    
                                    <div>
                                        <label className="block text-gray-700 text-sm font-medium mb-2">
                                        Titre de l'événement
                                        </label>
                                        <input
                                            type="text"
                                            value={eventData.summary}
                                            onChange={(e) => setEventData({...eventData, summary: e.target.value})}
                                            className="w-full px-3 py-2 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200"
                                        />
                                    </div>
                                    
                                    <div>
                                        <label className="block text-gray-700 text-sm font-medium mb-2">
                                            Localisation
                                        </label>
                                        <input
                                            type="text"
                                            value={eventData.location}
                                            onChange={(e) => setEventData({...eventData, location: e.target.value})}
                                            className="w-full px-3 py-2 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200"
                                        />
                                    </div>
                                    
                                    <div>
                                        <label className="block text-gray-700 text-sm font-medium mb-2">
                                            Description
                                        </label>
                                        <textarea
                                            value={eventData.description}
                                            onChange={(e) => setEventData({...eventData, description: e.target.value})}
                                            className="w-full px-3 py-2 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200"
                                        />
                                    </div>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-gray-700 text-sm font-medium mb-2">
                                            Nouvelle date et heure de début
                                            </label>
                                            <input
                                                type="datetime-local"
                                                value={eventData.startDateTime}
                                                onChange={(e) => setEventData({...eventData, startDateTime: e.target.value})}
                                                className="w-full px-3 py-2 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-gray-700 text-sm font-medium mb-2">
                                            Nouvelle date et heure de fin
                                            </label>
                                            <input
                                                type="datetime-local"
                                                value={eventData.endDateTime}
                                                onChange={(e) => setEventData({...eventData, endDateTime: e.target.value})}
                                                className="w-full px-3 py-2 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200"
                                            />
                                        </div>
                                    </div>
                                    
                                    <div className="border border-gray-200 p-4 rounded-md">
                                        <h3 className="font-semibold text-gray-700 mb-2">Participants</h3>
                                        <div className="flex mb-2">
                                            <input
                                                type="email"
                                                placeholder="Add new attendee"
                                                value={editNewAttendee}
                                                onChange={(e) => setEditNewAttendee(e.target.value)}
                                                className="flex-1 px-3 py-2 text-gray-700 border border-gray-300 rounded-l-md focus:outline-none focus:border-green-500"
                                            />
                                            <button
                                                onClick={addEditAttendee}
                                                className="bg-blue-500 text-white px-4 rounded-r-md hover:bg-blue-600 transition"
                                            >
                                                Ajouter 
                                            </button>
                                        </div>
                                        <div className="space-y-2">
                                            {eventData.attendees.map((attendee) => (
                                                <div key={attendee.email} className="flex justify-between items-center bg-gray-100 p-2 rounded">
                                                    <span className="text-gray-700">{attendee.email}</span>
                                                    <button
                                                        onClick={() => removeAttendee(attendee.email)}
                                                        className="text-red-500 hover:text-red-700"
                                                    >
                                                        ×
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    
                                    <div className="flex space-x-4">
                                        <button
                                            onClick={updateEvent}
                                            className="flex-1 bg-green-500 text-white py-2 rounded hover:bg-green-600 transition"
                                        >
                                            Enregistrer les modifications 
                                        </button>
                                        <button
                                            onClick={() => setEventToEdit(null)}
                                            className="flex-1 bg-gray-500 text-white py-2 rounded hover:bg-gray-600 transition"
                                        >
                                            Fermer 
                                        </button>
                                    </div>
                                </div>
                            ) : loading ? (
                                <p className="text-center text-gray-600">evenements en cours</p>
                            ) : events.length === 0 ? (
                                <p className="text-center text-gray-600">Pas d'évenements trouvés</p>
                            ) : (
                                <div className="space-y-4">
                                    {events.map((event) => (
                                        <div key={event.id} className="border border-gray-200 p-4 rounded hover:shadow-md transition">
                                            <h3 className="font-bold text-lg text-gray-800">{event.summary}</h3>
                                            <p className="text-sm text-gray-600">
                                                {new Date(event.start.dateTime).toLocaleString()} - {new Date(event.end.dateTime).toLocaleString()}
                                            </p>
                                            {event.location && (
                                                <p className="text-sm text-gray-600 mt-1">
                                                    <span className="font-medium">Localisation:</span> {event.location}
                                                </p>
                                            )}
                                            {event.description && (
                                                <p className="text-sm text-gray-600 mt-1">
                                                    <span className="font-medium">Description:</span> {event.description}
                                                </p>
                                            )}
                                            {event.conferenceData?.entryPoints?.length > 0 && (
                                                <p className="text-sm mt-1">
                                                    <a 
                                                        href={event.conferenceData.entryPoints[0].uri} 
                                                        target="_blank" 
                                                        rel="noopener noreferrer"
                                                        className="text-blue-600 hover:underline"
                                                    >
                                                        Rejoindre Google Meet
                                                    </a>
                                                </p>
                                            )}
                                            {event.attendees && event.attendees.length > 0 && (
                                                <div className="text-sm text-gray-500 mt-1">
                                                    <span className="font-medium">Attendees:</span>
                                                    <ul className="list-disc list-inside">
                                                        {event.attendees.map(attendee => (
                                                            <li key={attendee.email}>
                                                                {attendee.email} ({attendee.responseStatus || 'no response'})
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}
                                            <div className="flex space-x-2 mt-3">
                                                <button
                                                    onClick={() => handleEditEvent(event)}
                                                    className="bg-yellow-500 text-white px-3 py-1 rounded text-sm hover:bg-yellow-600 transition"
                                                >
                                                    Modifier
                                                </button>
                                                <button
                                                    onClick={() => deleteEvent(event.id)}
                                                    className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 transition"
                                                >
                                                    Supprimer 
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            )}
            
        </div>
        
        
    );
    
};

export default GoogleCalendar;