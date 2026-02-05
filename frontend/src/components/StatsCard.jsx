import React from 'react';

const StatsCard = ({ title, value, color }) => {
    return (
        <div className={`bg-white p-6 rounded-xl shadow border-l-4 ${color}`}>
            <h3 className="text-gray-500 text-sm font-medium uppercase">{title}</h3>
            <p className="text-2xl font-bold text-gray-800 mt-2">{value}</p>
        </div>
    );
};

export default StatsCard;
