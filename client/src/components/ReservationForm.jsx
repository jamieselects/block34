// src/components/ReservationForm.jsx
import React, { useState } from 'react';
import { createReservation } from '../api';

const ReservationForm = () => {
  const [customerId, setCustomerId] = useState('');
  const [restaurantId, setRestaurantId] = useState('');
  const [date, setDate] = useState('');
  const [partyCount, setPartyCount] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!customerId || !restaurantId || !date || !partyCount) return;
    try {
      await createReservation({
        customer_id: customerId,
        restaurant_id: restaurantId,
        date,
        party_count: partyCount,
      });
      alert('Reservation created!');
      setCustomerId('');
      setRestaurantId('');
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
        placeholder="Customer ID"
        value={customerId}
        onChange={(e) => setCustomerId(e.target.value)}
        className="input-field"
      />
      <input
        type="text"
        placeholder="Restaurant Id"
        value={restaurantId}
        onChange={(e) => setRestaurantId(e.target.value)}
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