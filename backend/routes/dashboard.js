import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import User from '../models/User.js';
import Vehicle from '../models/Vehicle.js';
import Collection from '../models/Collection.js'; 

const router = express.Router();

// @route   GET api/dashboard/stats
// @desc    Get key statistics for the admin dashboard
router.get('/stats', authMiddleware, async (req, res) => {
  try {
    const [
      totalUsers,
      totalOperators,
      totalVehicles,
      faresTodayResult,
      recentActivity,
    ] = await Promise.all([
      User.countDocuments(),
      User.countDocuments({ role: 'Operator' }),
      Vehicle.countDocuments(),
      (() => {
        const today = new Date();
        const startOfDay = new Date(today.setUTCHours(0, 0, 0, 0));
        const endOfDay = new Date(today.setUTCHours(23, 59, 59, 999));
        return Collection.aggregate([
          { $match: { collectionDate: { $gte: startOfDay, $lte: endOfDay } } },
          { $group: { _id: null, total: { $sum: '$amount' } } },
        ]);
      })(),
      // FIX 2: Sort by the 'createdAt' timestamp we added to the User model
      User.find()
        .sort({ createdAt: -1 }) 
        .limit(5)
        .select('fullName role createdAt'),
    ]);

    const stats = {
      totalUsers: totalUsers || 0,
      totalOperators: totalOperators || 0,
      totalVehicles: totalVehicles || 0,
      faresToday: faresTodayResult[0]?.total || 0,
      recentActivity: recentActivity || [],
    };

    res.json(stats);

  } catch (err) {
    console.error("Error in /api/dashboard/stats:", err.message);
    res.status(500).send('Server Error');
  }
});

export default router;