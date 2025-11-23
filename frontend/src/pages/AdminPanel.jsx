import React, { useEffect, useState } from 'react';
import api from '../api/axiosConfig';

const AdminPanel = () => {
    const [events, setEvents] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        date: '',
        location: '',
        description: '',
        capacity: ''
    });
    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            const response = await api.get('/events');
            setEvents(response.data);
        } catch (error) {
            console.error('Error fetching events:', error);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingId) {
                await api.put(`/events/${editingId}`, formData);
            } else {
                await api.post('/events', formData);
            }
            setFormData({ name: '', date: '', location: '', description: '', capacity: '' });
            setEditingId(null);
            fetchEvents();
        } catch (error) {
            alert('Error saving event');
        }
    };

    const handleEdit = (event) => {
        setFormData({
            name: event.name,
            date: event.date,
            location: event.location,
            description: event.description,
            capacity: event.capacity || ''
        });
        setEditingId(event.id);
    };

    const handleDelete = async (id) => {
        if (!confirm('Delete this event?')) return;
        try {
            await api.delete(`/events/${id}`);
            fetchEvents();
        } catch (error) {
            alert('Error deleting event');
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6 text-center">Admin Panel</h1>

            <div className="bg-white p-6 rounded shadow-md mb-8 max-w-2xl mx-auto">
                <h2 className="text-xl font-bold mb-4">{editingId ? 'Edit Event' : 'Create Event'}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block mb-1">Event Name</label>
                        <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full border p-2 rounded" required />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1">Date</label>
                        <input type="date" name="date" value={formData.date} onChange={handleChange} className="w-full border p-2 rounded" required />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1">Location</label>
                        <input type="text" name="location" value={formData.location} onChange={handleChange} className="w-full border p-2 rounded" required />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1">Description</label>
                        <textarea name="description" value={formData.description} onChange={handleChange} className="w-full border p-2 rounded" rows="3"></textarea>
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1">Capacity (Optional)</label>
                        <input type="number" name="capacity" value={formData.capacity} onChange={handleChange} className="w-full border p-2 rounded" placeholder="Leave empty for unlimited" />
                    </div>
                    <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                        {editingId ? 'Update Event' : 'Create Event'}
                    </button>
                    {editingId && (
                        <button type="button" onClick={() => { setEditingId(null); setFormData({ name: '', date: '', location: '', description: '', capacity: '' }); }} className="ml-2 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">
                            Cancel
                        </button>
                    )}
                </form>
            </div>

            <div className="bg-white rounded shadow-md overflow-hidden">
                <table className="min-w-full">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="py-2 px-4 text-left">Name</th>
                            <th className="py-2 px-4 text-left">Date</th>
                            <th className="py-2 px-4 text-left">Location</th>
                            <th className="py-2 px-4 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {events.map(event => (
                            <tr key={event.id} className="border-t">
                                <td className="py-2 px-4">{event.name}</td>
                                <td className="py-2 px-4">{event.date}</td>
                                <td className="py-2 px-4">{event.location}</td>
                                <td className="py-2 px-4">
                                    <button onClick={() => handleEdit(event)} className="text-blue-600 hover:underline mr-4">Edit</button>
                                    <button onClick={() => handleDelete(event.id)} className="text-red-600 hover:underline">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminPanel;
