export async function createCustomer(data) {
  const res = await fetch('/api/customers', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return res.json();
}

export async function getCustomerByName(name) {
  const res = await fetch(`/api/customers?name=${encodeURIComponent(name)}`, {
    headers: { 'Content-Type': 'application/json' },
  });
  if (!res.ok) {
    throw new Error('Error fetching customer');
  }
  const customers = await res.json();
  // Assuming the endpoint returns an array of customers,
  // find the one that exactly matches (case-insensitive)
  return customers.find((c) => c.name.toLowerCase() === name.toLowerCase());
}

export async function createRestaurant(data) {
  const res = await fetch('/api/restaurants', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return res.json();
}

export async function createReservation(data) {
  const res = await fetch(`/api/customers/${data.customer_id}/reservations`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      restaurant_id: data.restaurant_id,
      date: data.date,
      party_count: data.party_count
    })
  });
  return res.json();
}