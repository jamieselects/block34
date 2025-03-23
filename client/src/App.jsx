// src/App.jsx
import React from 'react';
import CustomerForm from './components/CustomerForm';
import RestaurantForm from './components/RestaurantForm';
import ReservationForm from './components/ReservationForm';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Acme Reservations</h1>
      </header>
      <main className="app-main">
        <section className="form-section">
          <h2>Add Customer</h2>
          <CustomerForm />
        </section>
        <section className="form-section">
          <h2>Add Restaurant</h2>
          <RestaurantForm />
        </section>
        <section className="form-section">
          <h2>Create Reservation</h2>
          <ReservationForm />
        </section>
      </main>
    </div>
  );
}

export default App;
