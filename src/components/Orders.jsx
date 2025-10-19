import React from 'react';
import { useOrders } from '../context/OrdersContext.jsx';

function Orders() {

  const {orders} = useOrders();

  var ordersToShow = orders.slice(0, 5);

  return (
    <div>
      <h3 className="text-lg font-bold mb-4">Twoje zamówienia</h3>
      {ordersToShow.length === 0 && <p>Brak zamówień.</p>}
      {ordersToShow.map((order) => (
        <div key={order.id} className="border p-4 mb-4 rounded-lg shadow">
          <p>{order.delivery_address_id}</p>
          <p>{order.status}</p>
          {order.items.map((item) => (
            <div key={item.id}>
              <p>{item.name_snapshot}</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Orders;
