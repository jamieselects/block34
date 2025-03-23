// src/components/ReservationForm.jsx
import React, { useState } from 'react';
import { createReservation } from '../api';

const ReservationForm = () => {
  const [customerName, setCustomerName] = useState('');
  const [restaurantName, setRestaurantName] = useState('');
  const [date, setDate] = useState('');
  const [partyCount, setPartyCount] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!customerName || !restaurantName || !date || !partyCount) return;
    try {
      await createReservation({
        customer_name: customerName,
        restaurant_nam: restaurantName,
        date,
        party_count: partyCount,
      });
      alert('Reservation created!');
      setCustomerName('');
      setRestaurantName('');
      setDate('');
      setPartyCount('');
    } catch (err) {
      console.error('Error creating reservation:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-card">
      <input
        type="text"
        placeholder="Customer Name"
        value={customerName}
        onChange={(e) => setCustomerName(e.target.value)}
        className="input-field"
      />
      <input
        type="text"
        placeholder="Restaurant Name"
        value={restaurantName}
        onChange={(e) => setRestaurantName(e.target.value)}
        className="input-field"
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="input-field"
      />
      <input
        type="number"
        placeholder="Party Count"
        value={partyCount}
        onChange={(e) => setPartyCount(e.target.value)}
        className="input-field"
      />
      <button type="submit" className="btn">Create Reservation</button>
    </form>
  );
};

export default ReservationForm;