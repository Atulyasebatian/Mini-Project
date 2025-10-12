import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import jwtDecode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
// These imports are now the single source of truth for your header and nav components
import PassengerHeader from '../../components/PassengerHeader';
import PassengerBottomNav from '../../components/PassengerBottomNav';
import '../../styles/payment.css';

function PaymentPage() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [balance, setBalance] = useState(1250.75);
  const [paymentMethods, setPaymentMethods] = useState([
    { id: 1, type: 'Credit Card', details: 'Visa .... 4567', icon: 'credit_card', color: '#ff9800' },
  ]);
  const [pendingTransaction, setPendingTransaction] = useState({
    id: '#FN20240721',
    reason: 'Fine for ticketless travel',
    dueDate: '2024-08-01',
    amount: 50.00,
  });
  const [showAddCardModal, setShowAddCardModal] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate('/');
      return;
    }
    const decodedToken = jwtDecode(token);
    setUser({ name: decodedToken.user.fullName });

    // TODO: Fetch actual balance and payment methods from API
  }, []);

  const handleDeleteCard = (cardId) => {
    if (window.confirm("Are you sure you want to delete this card?")) {
      // Logic to update state would go here if it were not a simulation
    }
  };
  
  const handleAddCard = () => {
    setShowAddCardModal(false);
    // Logic to update state would go here
  };
  
  const handlePayNow = () => {
    alert(`Simulating payment of ₹${pendingTransaction.amount.toFixed(2)}...`);
  };

  return (
    <div className="payment-page">
      <PassengerHeader user={user} />
      <main className="payment-main">
        <section className="balance-section">
          <div className="balance-card">
            <div className="shine-effect"></div>
            <span>Your Balance</span>
            <h2>₹{balance.toLocaleString('en-IN')}</h2>
            <div className="balance-actions">
              <Button variant="light" size="sm">Add Money</Button>
              <Button variant="outline-light" size="sm">History</Button>
            </div>
          </div>
        </section>

        {pendingTransaction && (
          <section className="pending-section">
            <div className="pending-card">
              <div className="pending-header">
                <span className="material-icons">error_outline</span>
                <span>Payment Pending</span>
              </div>
              <div className="pending-details">
                <p>{pendingTransaction.reason}</p>
                <h4>₹{pendingTransaction.amount.toFixed(2)}</h4>
              </div>
              <Button variant="danger" className="w-100" onClick={handlePayNow}>Pay Now</Button>
            </div>
          </section>
        )}

        <section className="methods-section">
          <h2>Payment Methods</h2>
          {paymentMethods.map(card => (
            <div key={card.id} className="method-card">
              <div className="method-icon" style={{ backgroundColor: card.color }}>
                <span className="material-icons">{card.icon}</span>
              </div>
              <div className="method-details">
                <h4>{card.type}</h4>
                <p>{card.details}</p>
              </div>
              <button className="delete-btn" onClick={() => handleDeleteCard(card.id)}>
                <span className="material-icons">delete</span>
              </button>
            </div>
          ))}
          <div className="method-card add-method" onClick={() => setShowAddCardModal(true)}>
            <div className="add-icon"><span className="material-icons">add</span></div>
            <p>Add a new Card</p>
          </div>
        </section>
      </main>
      
      {/* This now correctly uses the imported component */}
      <PassengerBottomNav />

      <Modal show={showAddCardModal} onHide={() => setShowAddCardModal(false)} centered>
        <Modal.Header closeButton><Modal.Title>Add New Card</Modal.Title></Modal.Header>
        <Modal.Body>
          <p>This is a simulation. A secure form would be here in a real application.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddCardModal(false)}>Close</Button>
          <Button variant="primary" onClick={handleAddCard}>Add Simulated Card</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

// --- REMOVED: The duplicate definition of PassengerBottomNav is now gone ---

export default PaymentPage;