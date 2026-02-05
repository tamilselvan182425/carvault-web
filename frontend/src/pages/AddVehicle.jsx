import React, { useState } from 'react';
import api from '../services/api';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';

const AddVehicle = () => {
    const [formData, setFormData] = useState({
        carName: '',
        registrationNumber: '',
        model: '',
        fuelType: 'Petrol'
    });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/vehicles', formData);
            alert('Vehicle added successfully!');
            navigate('/dashboard');
        } catch (err) {
            alert('Error adding vehicle: ' + (err.response?.data || err.message));
        }
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />
            <div className="container mx-auto p-6 flex justify-center">
                <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-lg">
                    <h2 className="text-2xl font-bold mb-6">Add New Vehicle</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Car Name</label>
                            <input className="input" placeholder="e.g. Hyundai i20" required
                                value={formData.carName} onChange={(e) => setFormData({ ...formData, carName: e.target.value })} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Registration Number</label>
                            <input className="input" placeholder="e.g. TN09AB1234" required
                                value={formData.registrationNumber} onChange={(e) => setFormData({ ...formData, registrationNumber: e.target.value })} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Model</label>
                            <input className="input" placeholder="Year / Variant"
                                value={formData.model} onChange={(e) => setFormData({ ...formData, model: e.target.value })} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Fuel Type</label>
                            <select className="input" value={formData.fuelType} onChange={(e) => setFormData({ ...formData, fuelType: e.target.value })}>
                                <option value="Petrol">Petrol</option>
                                <option value="Diesel">Diesel</option>
                                <option value="Electric">Electric</option>
                                <option value="Hybrid">Hybrid</option>
                            </select>
                        </div>
                        <button className="btn-primary">Submit Vehicle</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddVehicle;
