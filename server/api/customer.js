//this is where api routes will live
const express = require('express');
const { fetchCustomers, createCustomer } = require('../db');
const customerRouter = express.Router();
// customerRouter.use(express.json())

//router

//fetch customers
customerRouter.get('/', async(req, res, next) => {
  try {
    res.send(await fetchCustomers())
  } catch (error) {
    next(error)
  }
})

//create customer
customerRouter.post('/', async(req, res, next) => {
  console.log("body is", req.body)
  try {
    res.send(await createCustomer({
      name: req.body.name
    }))
  } catch (error) {
    next(error)
  }
})

module.exports = customerRouter