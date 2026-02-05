import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';
import Navbar from '../components/Navbar';

const VehicleDetails = () => {
    const { id } = useParams();
    const [vehicle, setVehicle] = useState(null);
    const [documents, setDocuments] = useState([]);
    const [file, setFile] = useState(null);
    const [docType, setDocType] = useState('RC');

    useEffect(() => {
        // Fetch vehicle details (needs endpoint in vehicleController to get one, assuming basic fetch for now or adding endpoint)
        // Actually our vehicleRoutes only has create, my, all. We need ONE.
        // I'll add a 'getOne' if needed, or just filter from 'my'. But 'my' returns array.
        // For now, let's assume we can fetch it or I'll implement getOne.
        // Actually, I'll filter 'my' on frontend for simplicity if I don't want to change backend, 
        // BUT best practice is `GET /api/vehicles/:id`.
        // Let's implement that route quickly in the next turn or just use a placeholder.
        // I'll update backend to include `getVehicleById`.

        // Placeholder fetching
        fetchVehicle();
        fetchDocuments();
    }, [id]);

    const fetchVehicle = async () => {
        try {
            // Temporary: fetching all and filtering (efficient enough for small scale)
            const res = await api.get('/vehicles/my');
            const found = res.data.find(v => v._id === id);
            setVehicle(found);
        } catch (err) { console.error(err); }
    };

    const fetchDocuments = async () => {
        try {
            const res = await api.get(`/documents/${id}`);
            setDocuments(res.data);
        } catch (err) { console.error(err); }
    };

    const handleUpload = async (e) => {
        e.preventDefault();
        if (!file) return alert("Select file");

        const formData = new FormData();
        formData.append('file', file);
        formData.append('vehicleId', id);
        formData.append('type', docType);

        try {
            await api.post('/documents/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            alert('Uploaded!');
            fetchDocuments();
        } catch (err) {
            alert('Upload failed');
        }
    };

    if (!vehicle) return <p>Loading...</p>;

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />
            <div className="container mx-auto p-6">
                <h1 className="text-3xl font-bold mb-4">{vehicle.carName} <span className="text-lg text-gray-500">#{vehicle.registrationNumber}</span></h1>

                <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-white p-6 rounded-xl shadow">
                        <h2 className="text-xl font-bold mb-4">Upload Document</h2>
                        <form onSubmit={handleUpload} className="space-y-4">
                            <select className="input" value={docType} onChange={e => setDocType(e.target.value)}>
                                <option value="RC">RC Book</option>
                                <option value="INSURANCE">Insurance Policy</option>
                                <option value="PUC">PUC Certificate</option>
                            </select>
                            <input type="file" onChange={e => setFile(e.target.files[0])} className="input" />
                            <button className="btn-primary">Upload to Vault</button>
                        </form>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow">
                        <h2 className="text-xl font-bold mb-4">Vault Documents</h2>
                        <div className="space-y-3">
                            {documents.map(doc => (
                                <div key={doc._id} className="flex justify-between items-center bg-gray-50 p-3 rounded">
                                    <span className="font-medium">{doc.type}</span>
                                    <a href={doc.fileUrl} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">View</a>
                                </div>
                            ))}
                            {documents.length === 0 && <p className="text-gray-400">No documents yet.</p>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VehicleDetails;
