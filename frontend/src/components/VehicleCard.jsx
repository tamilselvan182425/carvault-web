import React from 'react';
import { Link } from 'react-router-dom';

const VehicleCard = ({ vehicle }) => {
    return (
        <div className="bg-white rounded-xl shadow hover:scale-105 transition duration-300 overflow-hidden">
            <div className="h-40 bg-gray-300 flex items-center justify-center">
                <span className="text-gray-500">Image Placeholder</span>
                {/* <img src="/car.png" className="h-40 w-full object-cover" /> */}
            </div>
            <div className="p-4">
                <h2 className="text-lg font-bold text-gray-800">{vehicle.carName}</h2>
                <p className="text-sm text-gray-600 mb-2">{vehicle.registrationNumber}</p>
                <div className="flex justify-between items-center">
                    <span className={`text-xs px-2 py-1 rounded ${vehicle.approved ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                        {vehicle.approved ? 'Approved' : 'Pending'}
                    </span>
                    <Link to={`/vehicle/${vehicle._id}`} className="text-blue-600 hover:underline text-sm">Details &rarr;</Link>
                </div>
            </div>
        </div>
    );
};

export default VehicleCard;
