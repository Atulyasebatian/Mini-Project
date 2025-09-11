import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; // You can add some basic styling here

function App() {
  const [items, setItems] = useState([]);
  const [newItemName, setNewItemName] = useState('');
  const [newItemDescription, setNewItemDescription] = useState('');

  const API_URL = 'http://localhost:5000/api/items'; // Backend API URL

  // Fetch items from the backend
  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axios.get(API_URL);
      setItems(response.data);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  const handleAddItem = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(API_URL, {
        name: newItemName,
        description: newItemDescription,
      });
      setItems([...items, response.data]);
      setNewItemName('');
      setNewItemDescription('');
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>MERN Stack App</h1>
        <p>A simple list of items from MongoDB</p>
      </header>

      <div className="item-form">
        <h2>Add New Item</h2>
        <form onSubmit={handleAddItem}>
          <input
            type="text"
            placeholder="Item Name"
            value={newItemName}
            onChange={(e) => setNewItemName(e.target.value)}
            required
          />
          <textarea
            placeholder="Item Description (Optional)"
            value={newItemDescription}
            onChange={(e) => setNewItemDescription(e.target.value)}
          ></textarea>
          <button type="submit">Add Item</button>
        </form>
      </div>

      <div className="item-list">
        <h2>Items</h2>
        {items.length === 0 ? (
          <p>No items found. Add one above!</p>
        ) : (
          <ul>
            {items.map((item) => (
              <li key={item._id}>
                <strong>{item.name}</strong>: {item.description} (Added: {new Date(item.date).toLocaleDateString()})
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;