import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/axiosConfig';
import { useAuth } from '../context/AuthContext';
import LottieAnimation from '../components/LottieAnimation';

const EventDetails = () => {
    const { id } = useParams();
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [registered, setRegistered] = useState(false);
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const response = await api.get(`/events/${id}`);
                setEvent(response.data);
            } catch (error) {
                console.error('Error fetching event:', error);
            } finally {
                setLoading(false);
            }
        };

        const checkRegistration = async () => {
            if (user) {
                try {
                    const response = await api.get('/registrations/my-events');
                    const isRegistered = response.data.some(reg => reg.event.id === id);
                    setRegistered(isRegistered);
                } catch (error) {
                    console.error('Error checking registration:', error);
                }
            }
        };

        fetchEvent();
        checkRegistration();
    }, [id, user]);

    const handleRegister = async () => {
        if (!user) {
            navigate('/login');
            return;
        }
        try {
            await api.post('/registrations', { eventId: id });
            setRegistered(true);
            alert('Registered successfully!');
        } catch (error) {
            alert(error.response?.data || 'Registration failed');
        }
    };

    const handleUnregister = async () => {
        if (!confirm('Are you sure you want to unregister?')) return;
        try {
            await api.delete(`/registrations/${id}`);
            setRegistered(false);
            alert('Unregistered successfully!');
        } catch (error) {
            alert('Unregistration failed');
        }
    };

    if (loading) return <div className="text-center mt-10">Loading...</div>;
    if (!event) return <div className="text-center mt-10">Event not found</div>;

    return (
        <div className="container mx-auto p-4 max-w-2xl relative">
            {registered && (
                <div className="absolute inset-0 pointer-events-none flex justify-center items-start z-50">
                    <LottieAnimation
                        url="https://assets10.lottiefiles.com/packages/lf20_u4yrau.json"
                        className="w-full max-w-lg"
                    />
                </div>
            )}

            <button onClick={() => navigate('/')} className="mb-4 text-blue-600 hover:underline">&larr; Back to Events</button>
            <div className="bg-white p-8 rounded-2xl shadow-xl overflow-hidden">
                <div className="bg-blue-600 h-32 -mx-8 -mt-8 mb-6 flex items-center justify-center">
                    <h1 className="text-4xl font-bold text-white">{event.name}</h1>
                </div>

                <div className="space-y-4 text-gray-700">
                    <p className="flex items-center"><span className="font-bold w-24">Date:</span> {event.date}</p>
                    <p className="flex items-center"><span className="font-bold w-24">Location:</span> {event.location}</p>
                    <div className="border-t pt-4">
                        <h3 className="font-bold mb-2 text-lg">Description</h3>
                        <p className="leading-relaxed">{event.description}</p>
                    </div>
                </div>

                <div className="mt-8">
                    {event.capacity && (
                        <div className="mb-4 text-center">
                            <span className={`text-lg font-bold px-4 py-2 rounded-full ${event.registrationCount >= event.capacity ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
                                {event.registrationCount >= event.capacity ? 'Sold Out' : `${event.capacity - event.registrationCount} spots left`}
                            </span>
                        </div>
                    )}

                    {registered ? (
                        <div className="text-center">
                            <div className="bg-green-100 text-green-800 p-4 rounded-lg mb-4 font-bold text-lg">
                                You are registered!
                            </div>
                            <button onClick={handleUnregister} className="w-full bg-red-500 text-white py-3 rounded-lg font-bold hover:bg-red-600 transition">
                                Unregister
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={handleRegister}
                            disabled={event.capacity && event.registrationCount >= event.capacity}
                            className={`w-full text-white py-3 rounded-lg font-bold transition shadow-lg transform hover:scale-105 ${event.capacity && event.registrationCount >= event.capacity ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
                        >
                            {event.capacity && event.registrationCount >= event.capacity ? 'Sold Out' : 'Register Now'}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default EventDetails;
