// src/components/RestaurantForm.jsx
import React, { useState } from 'react';
import { createRestaurant } from '../api';

const RestaurantForm = () => {
  const [name, setName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name.trim() === '') return;
    try {
      await createRestaurant({ name });
      alert('Restaurant added!');
      setName('');
    } catch (err) {
      console.error('Error adding restaurant:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-card">
      <input
        type="text"
        placeholder="Restaurant Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="input-field"
      />
      <button type="submit" className="btn">Add Restaurant</button>
    </form>
  );
};

export default RestaurantForm;