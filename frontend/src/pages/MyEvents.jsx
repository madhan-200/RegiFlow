import React, { useEffect, useState } from 'react';
import api from '../api/axiosConfig';
import EventCard from '../components/EventCard';
import LottieAnimation from '../components/LottieAnimation';

const MyEvents = () => {
    const [registrations, setRegistrations] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMyEvents = async () => {
            try {
                const response = await api.get('/registrations/my-events');
                setRegistrations(response.data);
            } catch (error) {
                console.error('Error fetching my events:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchMyEvents();
    }, []);

    if (loading) return <div className="text-center mt-10">Loading...</div>;

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-8 text-center border-b-2 border-gray-200 pb-4">My Events</h1>
            {registrations.length === 0 ? (
                <div className="flex flex-col items-center justify-center mt-10">
                    <LottieAnimation
                        url="https://assets9.lottiefiles.com/packages/lf20_sfn2q0r5.json"
                        className="w-64 h-64"
                    />
                    <p className="text-gray-500 text-xl mt-4">You haven't registered for any events yet.</p>
                    <a href="/" className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-full font-bold hover:bg-blue-700 transition">
                        Browse Events
                    </a>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {registrations.map(reg => (
                        <EventCard key={reg.id} event={reg.event} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyEvents;
