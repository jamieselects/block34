const express = require('express');
const { fetchRestaurants, createRestaurant } = require('../db');
const restaurantRouter = express.Router();

//fetch restaurants
restaurantRouter.get('/', async(req, res, next) => {
  try {
    res.send(await fetchRestaurants())
  } catch (error) {
    next(error)
  }
})

//create restaurant
restaurantRouter.post('/', async(req, res, next) => {
  console.log("body is", req.body)
  try {
    res.send(await createRestaurant({
      name: req.body.name
    }))
  } catch (error) {
    next(error)
  }
})

module.exports = restaurantRouter