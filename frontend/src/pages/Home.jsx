import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center text-center p-6">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to CarVault</h1>
            <p className="text-lg text-gray-600 mb-8">Manage your vehicles and documents securely.</p>
            <div className="space-x-4">
                <Link to="/login" className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700">Get Started</Link>
                <Link to="/dashboard" className="px-6 py-3 bg-white text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50">Go to Dashboard</Link>
            </div>
        </div>
    );
};

export default Home;
