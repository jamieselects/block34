const pg = require('pg')
const uuid = require('uuid')
const client = new pg.Client(process.env.DATABASE_URL || 'postgres://localhost/acme_reservation_planner')

const createTables = async() => {
  const SQL = /*SQL*/ `
    DROP TABLE IF EXISTS reservations;
    DROP TABLE IF EXISTS customers;
    DROP TABLE IF EXISTS restaurants;
    CREATE TABLE customers(
        id UUID PRIMARY KEY,
        name VARCHAR(50)
    );
    CREATE TABLE restaurants(
        id UUID PRIMARY KEY,
        name VARCHAR(50)
    );
    CREATE TABLE reservations(
        id UUID PRIMARY KEY,
        date DATE NOT NULL,
        party_count INTEGER NOT NULL,
        restaurant_id UUID REFERENCES restaurants(id) NOT NULL,
        customer_id UUID REFERENCES customers(id) NOT NULL
    );
  `
await client.query(SQL);
}

const createCustomer = async({ name }) => {
  const SQL = /*SQL*/ `
    INSERT INTO customers(id, name) VALUES($1, $2) RETURNING *;
  `
  const response = await client.query(SQL, [uuid.v4(), name])
  return response.rows[0]
}

const createRestaurant = async({ name })=> {
  const SQL = /*SQL*/ `
    INSERT INTO restaurants(id, name) VALUES($1, $2) RETURNING *;
  `
  const response = await client.query(SQL, [uuid.v4(), name]);
  return response.rows[0];
};

const fetchCustomers = async() => {
  const SQL = /*SQL*/ `
  SELECT * from customers;
`
const response = await client.query(SQL)
return response.rows;
}

const fetchRestaurants = async() => {
  const SQL = /*SQL*/ `
  SELECT * from restaurants;
`
const response = await client.query(SQL)
return response.rows
}

const createReservation = async({ customer_id, restaurant_id, date, party_count }) => {
  const SQL = /*SQL*/ `
    INSERT INTO reservations(id, customer_id, restaurant_id, date, party_count)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *;
  `
  const response = await client.query(SQL, [uuid.v4(), customer_id, restaurant_id, date, party_count])
  return response.rows[0]
}

const destroyReservation = async(id) => {
  const SQL = /*SQL*/ `
    DELETE FROM reservations 
    WHERE id = $1 AND customer_id = $2
    RETURNING *;
  `
  const response = await client.query(SQL, [id, customer_id])
  return response.rows[0];
}

const fetchReservations = async() => {
  const SQL = /*SQL*/ `
  SELECT * from reservations;
`;
const response = await client.query(SQL)
return response.rows
}

const fetchReservationByCustomer = async() => {
  const SQL = /*SQL*/ `
  SELECT * from reservations
  WEHRE custoemr_id = $1;
`;
const response = await client.query(SQL, [customer_id])
return response.rows
}

module.exports = {
  client,
  createTables,
  createCustomer,
  createRestaurant,
  fetchCustomers,
  fetchRestaurants,
  createReservation,
  destroyReservation,
  fetchReservations,
}