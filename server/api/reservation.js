//this is where api routes will live
const express = require('express');
const { fetchReservations, createReservation, destroyReservation, fetchReservationByCustomer } = require('../db');
const reservationRouter = express.Router();

//router

//fetch reservations
reservationRouter.get('/', async(req, res, next) => {
  try {
    res.send(await fetchReservations())
  } catch (error) {
    next(error)
  }
});

//fetch reservation by customer
reservationRouter.get('/', async(req, res, next) => {
  try {
    const { customer_id} = req.params;
    const reservations = await fetchReservationByCustomer(customer_id);
    res.send(reservations);
  } catch (error) {
    next(error)
  }
});

//create reservation
reservationRouter.post('/', async(req, res, next) => {
  console.log("body is", req.body)
  const { customer_id } = req.params;
  try {
    const reservation = await createReservation({
      customer_id,
      restaurant_id: req.body.restaurant_id,
      date: req.body.date,
      party_count: req.body.party_count
    })
    res.status(201).send(reservation);
  } catch (error) {
    next(error)
  }
});

//delete reservations
reservationRouter.delete('/:id', async(req, res, next) => {
  try {
    const { customer_id, id } = req.params;
    await destroyReservation({ id, customer_id });
    res.sendStatus(204)
  } catch (error) {
    next(error)
  }
});

module.exports = reservationRouter