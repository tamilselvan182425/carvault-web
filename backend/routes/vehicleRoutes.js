const express = require('express');
const router = express.Router();
const vehicleController = require('../controllers/vehicleController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, vehicleController.createVehicle);
router.get('/my', authMiddleware, vehicleController.getMyVehicles);
router.get('/all', authMiddleware, vehicleController.getAllVehicles);

module.exports = router;
