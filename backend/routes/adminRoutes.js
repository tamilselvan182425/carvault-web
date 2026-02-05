const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

router.put('/vehicle/:id/approve', authMiddleware, roleMiddleware('admin'), adminController.approveVehicle);
router.get('/users', authMiddleware, roleMiddleware('admin'), adminController.getUsers);
router.get('/pending-vehicles', authMiddleware, roleMiddleware('admin'), adminController.getPendingVehicles);

module.exports = router;
