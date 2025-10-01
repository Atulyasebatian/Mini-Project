import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import '../../styles/payment.css';

// Reusable Header Component
const PassengerHeader = () => {
  return (
    <header className="passenger-header">
      <div className="brand">
        <span className="material-icons">directions_bus</span>
        <h1>TransitGo</h1>
      </div>
      <div className="header-actions">
        <span className="material-icons">notifications</span>
        <img src="https://i.pravatar.cc/150?img=1" alt="User" className="profile-pic" />
      </div>
    </header>
  );
};

// Reusable Bottom Navigation Component (with fixes)
const PassengerBottomNav = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="passenger-bottom-nav">
      <Link to="/home" className={`nav-item ${isActive('/home') ? 'active' : ''}`}>
        <span className="material-icons">home</span><span className="nav-label">Home</span>
      </Link>
      <Link to="/timings" className={`nav-item ${isActive('/timings') ? 'active' : ''}`}>
        <span className="material-icons">schedule</span><span className="nav-label">Timing</span>
      </Link>
      <Link to="/payment" className={`nav-item ${isActive('/payment') ? 'active' : ''}`}>
        <span className="material-icons">payment</span><span className="nav-label">Payment</span>
      </Link>
      <Link to="#" className="nav-item">
        <span className="material-icons">history</span><span className="nav-label">History</span>
      </Link>
      <Link to="#" className="nav-item">
        <span className="material-icons">feedback</span><span className="nav-label">Feedback</span>
      </Link>
    </nav>
  );
};

function PaymentPage() {
  // --- LOGIC RESTORED: All state and functions are back ---
  const [paymentMethods, setPaymentMethods] = useState([
    { id: 1, type: 'Credit Card', details: 'Visa .... 4567' },
    { id: 2, type: 'Debit Card', details: 'Mastercard .... 8901' },
  ]);
  const [pendingTransaction, setPendingTransaction] = useState({
    id: '#FN20240721',
    reason: 'Travel without a valid ticket',
    dueDate: '2024-08-01',
    amount: 50.00,
  });
  const [showAddCardModal, setShowAddCardModal] = useState(false);

  const handleDeleteCard = (cardId) => {
    if (window.confirm("Are you sure you want to delete this card?")) {
      setPaymentMethods(paymentMethods.filter(card => card.id !== cardId));
    }
  };
  
  const handleAddCard = () => {
    const newCard = {
      id: Date.now(),
      type: 'Credit Card',
      details: `Visa .... ${Math.floor(1000 + Math.random() * 9000)}`
    };
    setPaymentMethods([...paymentMethods, newCard]);
    setShowAddCardModal(false);
  };
  
  const handlePayNow = () => {
    alert(`Payment of ₹${pendingTransaction.amount.toFixed(2)} successful!`);
    setPendingTransaction(null);
  };

  return (
    <div className="payment-page">
      <PassengerHeader />
      {/* --- RENDER LOGIC RESTORED --- */}
      <main className="payment-main">
        <h2>Payment Methods</h2>
        
        <section className="payment-section">
          <h3>UPI</h3>
          <div className="payment-card">
            <div className="card-icon upi-icon"><span className="material-icons">account_balance</span></div>
            <div className="card-details">
              <h4>Pay with UPI</h4>
              <p>Pay directly from your bank account</p>
            </div>
            <button className="add-btn">Add</button>
          </div>
        </section>

        <section className="payment-section">
          <h3>Cards</h3>
          {paymentMethods.map(card => (
            <div key={card.id} className="payment-card saved-card">
              <div className="card-icon card-type-icon"><span className="material-icons">credit_card</span></div>
              <div className="card-details">
                <h4>{card.type}</h4>
                <p>{card.details}</p>
              </div>
              <button className="delete-btn" onClick={() => handleDeleteCard(card.id)}>
                <span className="material-icons">delete</span>
              </button>
            </div>
          ))}
          <div className="payment-card add-card-prompt" onClick={() => setShowAddCardModal(true)}>
            <div className="card-icon add-card-icon"><span className="material-icons">add_card</span></div>
            <div className="card-details">
              <h4>Add a Card</h4>
              <p>Add a new card for quick payments</p>
            </div>
            <button className="add-btn">Add</button>
          </div>
        </section>

        {pendingTransaction && (
          <section className="payment-section">
            <div className="transaction-header">
              <h3>Transaction</h3>
              <span>Payment Pending: <strong>₹{pendingTransaction.amount.toFixed(2)}</strong></span>
            </div>
            <div className="transaction-card">
              <div className="transaction-info">
                <p className="transaction-id">Transaction ID: {pendingTransaction.id}</p>
                <h4>{pendingTransaction.reason}</h4>
                <p className="due-date">Due: {pendingTransaction.dueDate}</p>
              </div>
              <div className="transaction-amount">₹{pendingTransaction.amount.toFixed(2)}</div>
              <div className="transaction-actions">
                <button className="btn-details">View Details</button>
                <button className="btn-pay" onClick={handlePayNow}>Pay Now</button>
              </div>
            </div>
          </section>
        )}
      </main>
      <PassengerBottomNav />

      <Modal show={showAddCardModal} onHide={() => setShowAddCardModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add New Card</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>This is a simulation. In a real application, a secure form would be here.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddCardModal(false)}>Close</Button>
          <Button variant="primary" onClick={handleAddCard}>Add Card</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default PaymentPage;

