const express = require('express')
const morgan = require('morgan')
const app = express();
const customerRouter = require('./api/customer')
const restaurantRouter = require('./api/restaurant')
const reservationRouter = require('./api/reservation')


//middleware
app.use(morgan('dev'));
app.use(express.json());

app.use('/api/customers', customerRouter)
app.use('/api/restaurants', restaurantRouter)
app.use('/api/customers/:customer_id/reservations', reservationRouter)

const {
  client,
  createTables,
  createCustomer,
  createRestaurant,
  createReservation,
} = require("./db");

//middleware
app.use(morgan('dev'));
app.use(express.json());

app.use((error, req, res, next) => {
  res.status(500).send({error: error})
});

const init = async () => {
  console.log("connecting to the database");
  await client.connect();
  console.log("successfully connected");
  await createTables();
  console.log("created tables");
  const [moe, lucy, larry, ethyl, butter, salinas, auora] = await Promise.all([
    createCustomer({ name: "moe" }),
    createCustomer({ name: "lucy" }),
    createCustomer({ name: "larry" }),
    createCustomer({ name: "ethyl" }),
    createRestaurant({ name: "butter" }),
    createRestaurant({ name: "salinas" }),
    createRestaurant({ name: "auora" }),
    // createReservation({ customer_id: "068bae0c-83fe-46b1-b2ed-907beb6f9e3d", restaurant_id: "2d69ec60-9a52-4496-ae17-23d16d678d29", date:"03/25/2025", party_count: "2" }),
    // 
  ]);

  await createReservation({ customer_id: moe.id, restaurant_id: butter.id, date:"03/27/2025", party_count: "4"}),

  console.log("moe is", moe)

  const port = process.env.PORT || 3000;
  app.listen(port, ()=> {
    console.log(`listening on port ${port}`);
    console.log('some curl commands to test');
    console.log(`curl localhost:${port}/api/users`);
    console.log(`curl localhost:${port}/api/places`);
    console.log(`curl localhost:${port}/api/vacations`);
    console.log(`curl -X POST localhost:${port}/api/users/${moe.id}/vacations/ -d '{"place_id":"${butter.id}", "departure_date": "02/15/2025"}' -H "Content-Type:application/json"`);
 });
};

init();
