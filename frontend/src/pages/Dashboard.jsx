import React, { useEffect, useState } from 'react';
import api from '../services/api';
import Navbar from '../components/Navbar';
import VehicleCard from '../components/VehicleCard';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    const [vehicles, setVehicles] = useState([]);

    useEffect(() => {
        api.get('/vehicles/my')
            .then(res => setVehicles(res.data))
            .catch(err => console.error(err));
    }, []);

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />
            <div className="container mx-auto p-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-gray-800">My Garage</h1>
                    <Link to="/add-vehicle" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition">+ Add Vehicle</Link>
                </div>

                {vehicles.length === 0 ? (
                    <p className="text-gray-500">No vehicles found. Add one to get started.</p>
                ) : (
                    <div className="grid md:grid-cols-3 gap-6">
                        {vehicles.map(v => (
                            <VehicleCard key={v._id} vehicle={v} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
