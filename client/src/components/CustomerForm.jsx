// src/components/CustomerForm.jsx
import React, { useState } from 'react';
import { createCustomer } from '../api';

const CustomerForm = () => {
  const [name, setName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name.trim() === '') return;
    try {
      await createCustomer({ name });
      alert('Customer added!');
      setName('');
    } catch (err) {
      console.error('Error adding customer:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-card">
      <input
        type="text"
        placeholder="Customer Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="input-field"
      />
      <button type="submit" className="btn">Add Customer</button>
    </form>
  );
};

export default CustomerForm;