import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import PaymentMethod from '../models/PaymentMethod.js';
import Transaction from '../models/Transaction.js';

const router = express.Router();

// @route   GET api/payments/methods
// @desc    Get all saved payment methods for the logged-in user
// @access  Private
router.get('/methods', authMiddleware, async (req, res) => {
  try {
    const methods = await PaymentMethod.find({ user: req.user.id });
    res.json(methods);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/payments/methods
// @desc    Add a new payment method (simulated)
// @access  Private
router.post('/methods', authMiddleware, async (req, res) => {
  const { cardType, last4 } = req.body;
  
  // In a real app, you'd get a token from a payment gateway (like Stripe.js)
  // and use their API to create a customer and save the card.
  // We will simulate this by creating our own record.
  
  if (!cardType || !last4) {
    return res.status(400).json({ msg: 'Card details are incomplete.' });
  }

  try {
    const newMethod = new PaymentMethod({
      user: req.user.id,
      gatewayId: `sim_pm_${Date.now()}`, // Simulated gateway ID
      cardType,
      last4,
    });
    
    await newMethod.save();
    res.status(201).json(newMethod);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/payments/methods/:id
// @desc    Delete a saved payment method
// @access  Private
router.delete('/methods/:id', authMiddleware, async (req, res) => {
  try {
    const method = await PaymentMethod.findById(req.params.id);
    if (!method) {
      return res.status(404).json({ msg: 'Payment method not found.' });
    }
    // Security check: ensure the user owns this payment method
    if (method.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized.' });
    }
    await PaymentMethod.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Payment method removed.' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/payments/charge
// @desc    Process a payment (simulated)
// @access  Private
router.post('/charge', authMiddleware, async (req, res) => {
  const { amount, description, paymentMethodId } = req.body;

  if (!amount || !paymentMethodId) {
    return res.status(400).json({ msg: 'Amount and payment method are required.' });
  }

  try {
    // In a real app, you would call your payment gateway's API here
    // e.g., stripe.charges.create({ amount, currency, source: paymentMethodId, ... })
    // Since this is a simulation, we'll assume the payment is always successful.

    // Record the successful transaction in our database
    const newTransaction = new Transaction({
      user: req.user.id,
      amount,
      description,
      paymentMethod: paymentMethodId,
      status: 'succeeded',
    });

    await newTransaction.save();
    res.status(200).json({ success: true, message: 'Payment successful!' });

  } catch (err) {
    console.error(err.message);
    // If the payment failed, you could record a failed transaction
    res.status(500).send('Server Error');
  }
});

// @route   GET api/payments/transactions
// @desc    Get all transactions for the logged-in user
// @access  Private
router.get('/transactions', authMiddleware, async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.user.id })
      .populate('paymentMethod', 'cardType last4') // Populate payment method details
      .sort({ createdAt: -1 }); // Sort by newest first
    res.json(transactions);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/payments/balance
// @desc    Get the current balance for the logged-in user (simulated)
// @access  Private
router.get('/balance', authMiddleware, async (req, res) => {
  try {
    // This is a simulation. In a real app, you'd fetch the user's actual balance from a database or payment service.
    const simulatedBalance = 1250.75; // Example balance
    res.json({ balance: simulatedBalance });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
export default router;