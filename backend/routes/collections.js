import express from 'express';
import Collection from '../models/Collection.js';
import Assignment from '../models/Assignment.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// --- GET route remains the same ---
router.get('/', authMiddleware, async (req, res) => {
  try {
    const { date } = req.query;
    let query = {};
    if (date) {
      const startOfDay = new Date(date);
      startOfDay.setUTCHours(0, 0, 0, 0);
      const endOfDay = new Date(date);
      endOfDay.setUTCHours(23, 59, 59, 999);
      query.collectionDate = { $gte: startOfDay, $lte: endOfDay };
    }
    const collections = await Collection.find(query)
      .populate('vehicle', ['vehicleId', 'model'])
      .populate('operator', 'fullName')
      .sort({ collectionDate: -1 });
    res.json(collections);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


// --- POST route is now fixed ---
router.post('/', authMiddleware, async (req, res) => {
  const { amount, collectionDate } = req.body;
  const operatorId = req.user.id;

  if (!amount || !collectionDate) {
    return res.status(400).json({ msg: 'Amount and date are required.' });
  }

  try {
    // THE FIX: Use .populate('vehicle') to get the full vehicle object
    const assignment = await Assignment.findOne({ operator: operatorId }).populate('vehicle');
    
    if (!assignment) {
      return res.status(404).json({ msg: 'You do not have an active assignment. Cannot submit collection.' });
    }

    // Date and existing collection checks remain the same
    const startOfDay = new Date(collectionDate);
    startOfDay.setUTCHours(0, 0, 0, 0);
    const endOfDay = new Date(collectionDate);
    endOfDay.setUTCHours(23, 59, 59, 999);

    const existingCollection = await Collection.findOne({
      operator: operatorId,
      collectionDate: { $gte: startOfDay, $lte: endOfDay },
    });

    if (existingCollection) {
      return res.status(400).json({ msg: 'A collection for this date has already been submitted.' });
    }

    // Now, assignment.vehicle is the full vehicle object, so we can get its _id
    const newCollection = new Collection({
      vehicle: assignment.vehicle._id, // Pass the vehicle's ID
      operator: operatorId,
      amount,
      collectionDate: startOfDay,
    });

    await newCollection.save();
    res.status(201).json({ msg: 'Collection submitted successfully.' });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

export default router;