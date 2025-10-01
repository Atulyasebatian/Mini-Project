import express from 'express';
import Vehicle from '../models/Vehicle.js'; // Import the Vehicle model

const router = express.Router();

// @route   POST api/vehicles
// @desc    Register a new vehicle
router.post('/', async (req, res) => {
  const { vehicleId, model, capacity } = req.body;
  try {
    let vehicle = await Vehicle.findOne({ vehicleId });
    if (vehicle) {
      return res.status(400).json({ msg: 'A vehicle with this ID already exists.' });
    }
    vehicle = new Vehicle({ vehicleId, model, capacity });
    await vehicle.save();
    res.status(201).json(vehicle);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/vehicles
// @desc    Get all registered vehicles
router.get('/', async (req, res) => {
  try {
    const vehicles = await Vehicle.find().sort({ registrationDate: -1 });
    res.json(vehicles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/vehicles/:id
// @desc    Delete a vehicle by its MongoDB ID
router.delete('/:id', async (req, res) => {
    try {
        const vehicle = await Vehicle.findById(req.params.id);
        if (!vehicle) {
            return res.status(404).json({ msg: 'Vehicle not found' });
        }
        await Vehicle.findByIdAndDelete(req.params.id);
        res.json({ msg: 'Vehicle removed successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

export default router;