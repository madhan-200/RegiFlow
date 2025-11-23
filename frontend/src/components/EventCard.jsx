import React from 'react';
import { Link } from 'react-router-dom';

const EventCard = ({ event }) => {
    return (
        <div className="bg-white rounded shadow-md p-4 hover:shadow-lg transition">
            <h3 className="text-xl font-bold mb-2">{event.name}</h3>
            <p className="text-gray-600 mb-1">Date: {event.date}</p>
            <p className="text-gray-600 mb-2">Location: {event.location}</p>
            <p className="text-gray-700 mb-4 truncate">{event.description}</p>

            <div className="flex justify-between items-center mt-4">
                {event.capacity && (
                    <span className={`text-sm font-bold px-2 py-1 rounded ${event.registrationCount >= event.capacity ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
                        {event.registrationCount >= event.capacity ? 'Sold Out' : `${event.capacity - event.registrationCount} spots left`}
                    </span>
                )}
                <Link to={`/events/${event.id}`} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 inline-block">
                    View Details
                </Link>
            </div>
        </div>
    );
};

export default EventCard;
