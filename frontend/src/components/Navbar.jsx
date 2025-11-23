import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="bg-blue-600 p-4 text-white shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-2xl font-bold">EventSys</Link>
                <div className="space-x-4">
                    <Link to="/" className="hover:text-blue-200">Home</Link>
                    {user ? (
                        <>
                            <Link to="/my-events" className="hover:text-blue-200">My Events</Link>
                            {user.role === 'ROLE_ADMIN' && (
                                <Link to="/admin" className="hover:text-blue-200">Admin</Link>
                            )}
                            <button onClick={handleLogout} className="hover:text-blue-200">Logout</button>
                            <span className="font-semibold">({user.name})</span>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="hover:text-blue-200">Login</Link>
                            <Link to="/register" className="hover:text-blue-200">Register</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
