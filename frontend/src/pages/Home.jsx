import React, { useEffect, useState } from 'react';
import api from '../api/axiosConfig';
import EventCard from '../components/EventCard';
import LottieAnimation from '../components/LottieAnimation';
import { useAuth } from '../context/AuthContext';

const Home = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const { user } = useAuth();

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async (searchTerm = '') => {
        try {
            const response = await api.get(`/events${searchTerm ? `?search=${searchTerm}` : ''}`);
            setEvents(response.data);
        } catch (error) {
            console.error('Error fetching events:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        fetchEvents(search);
    };

    if (loading) return <div className="text-center mt-10">Loading...</div>;

    return (
        <div className="container mx-auto p-4">
            <div className="flex flex-col md:flex-row items-center justify-between mb-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 text-white shadow-2xl overflow-hidden relative">
                <div className="md:w-1/2 z-10">
                    <h1 className="text-5xl font-extrabold mb-6 leading-tight">
                        Discover & Join <br />
                        <span className="text-yellow-300">Amazing Events</span>
                    </h1>
                    <p className="text-xl mb-8 text-blue-100">
                        Your gateway to unforgettable experiences. Browse, register, and manage your events with ease.
                    </p>
                    {!user && (
                        <a href="/register" className="bg-white text-blue-600 px-8 py-3 rounded-full font-bold text-lg hover:bg-yellow-300 hover:text-blue-800 transition transform hover:scale-105 shadow-lg inline-block">
                            Get Started
                        </a>
                    )}
                </div>
                <div className="md:w-1/2 mt-8 md:mt-0 flex justify-center z-10">
                    <LottieAnimation
                        url="https://assets10.lottiefiles.com/packages/lf20_u4yrau.json"
                        className="w-full max-w-md h-64 md:h-96"
                    />
                </div>
                {/* Decorative Circles */}
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-white opacity-10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-60 h-60 bg-yellow-300 opacity-10 rounded-full blur-3xl"></div>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-center mb-8 border-b-4 border-blue-500 pb-4">
                <h2 className="text-3xl font-bold text-gray-800">Upcoming Events</h2>
                <form onSubmit={handleSearch} className="flex gap-2 mt-4 md:mt-0">
                    <input
                        type="text"
                        placeholder="Search events..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="border p-2 rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-blue-700 transition">
                        Search
                    </button>
                </form>
            </div>

            {events.length === 0 ? (
                <p className="text-center text-gray-500">No events found.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {events.map(event => (
                        <EventCard key={event.id} event={event} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Home;
