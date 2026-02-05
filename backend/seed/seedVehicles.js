const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Vehicle = require('../models/Vehicle');
const connectDB = require('../config/db');

dotenv.config({ path: '../.env' }); // Adjust path to .env

const seedVehicles = async () => {
    try {
        await connectDB();

        // Check if any vehicles exist or just append? Usually seed clears or adds if missing.
        // User snippet just showed insertMany. I'll just insert.
        // However, I need an ownerId. I'll need to fetch a user or create one.
        // For simplicity, let's assume the user runs this after creating a user, or I'll create a dummy user.
        // I'll skip creating a dummy user and ask the user to provide an ID or just handle it gracefully.
        // Actually better to just provide a CLI arg or find the first user?
        // Let's Find the first user.

        const User = require('../models/User');
        const user = await User.findOne();

        if (!user) {
            console.log("No users found. Please register a user first.");
            process.exit(1);
        }

        await Vehicle.insertMany([
            {
                ownerId: user._id,
                carName: "Hyundai i20",
                registrationNumber: "TN09AB1234",
                fuelType: "Petrol",
                approved: true
            }
        ]);

        console.log("Vehicles Seeded");
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

seedVehicles();
