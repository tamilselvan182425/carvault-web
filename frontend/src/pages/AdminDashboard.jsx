import React, { useEffect, useState } from 'react';
import api from '../services/api';
import Navbar from '../components/Navbar';
import StatsCard from '../components/StatsCard';

const AdminDashboard = () => {
    const [users, setUsers] = useState([]);
    const [pendingVehicles, setPendingVehicles] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        api.get('/admin/users').then(res => setUsers(res.data));
        api.get('/admin/pending-vehicles').then(res => setPendingVehicles(res.data));
    };

    const handleApprove = async (id) => {
        try {
            await api.put(`/admin/vehicle/${id}/approve`);
            fetchData(); // Refresh
            alert('Vehicle Approved');
        } catch (err) {
            alert('Error approving: ' + err.message);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />
            <div className="container mx-auto p-6">
                <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

                <div className="grid md:grid-cols-2 gap-6 mb-8">
                    <StatsCard title="Total Users" value={users.length} color="border-blue-500" />
                    <StatsCard title="Pending Approvals" value={pendingVehicles.length} color="border-yellow-500" />
                </div>

                <div className="bg-white rounded-xl shadow p-6 mb-6">
                    <h2 className="text-xl font-bold mb-4">Pending Vehicle Approvals</h2>
                    {pendingVehicles.length === 0 ? (
                        <p>No pending vehicles.</p>
                    ) : (
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b">
                                    <th className="p-2">Owner</th>
                                    <th className="p-2">Car</th>
                                    <th className="p-2">Reg No.</th>
                                    <th className="p-2">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {pendingVehicles.map(v => (
                                    <tr key={v._id} className="border-b hover:bg-gray-50">
                                        <td className="p-2">{v.ownerId?.email}</td>
                                        <td className="p-2">{v.carName}</td>
                                        <td className="p-2">{v.registrationNumber}</td>
                                        <td className="p-2">
                                            <button onClick={() => handleApprove(v._id)} className="bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600">
                                                Approve
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
