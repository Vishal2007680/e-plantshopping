import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  const calculateTotalAmount = () => {
    return cart.reduce((total, item) => {
      const costNum = parseFloat(item.cost.replace('$', ''));
      return total + costNum * item.quantity;
    }, 0).toFixed(2);
  };

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem({ name: item.name }));
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem({ name: item.name }));
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h2>Shopping Cart</h2>
      <h3>Total Amount: ${calculateTotalAmount()}</h3>
      {cart.map(item => (
        <div key={item.name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #ddd', padding: '10px 0' }}>
          <img src={item.image} alt={item.name} style={{ width: '80px', height: '80px', objectFit: 'cover' }} />
          <div>
            <h4>{item.name}</h4>
            <p>Unit Price: {item.cost}</p>
          </div>
          <div>
            <button onClick={() => handleDecrement(item)}>-</button>
            <span style={{ margin: '0 10px' }}>{item.quantity}</span>
            <button onClick={() => handleIncrement(item)}>+</button>
          </div>
          <button onClick={() => handleRemove(item)} style={{ backgroundColor: '#ff4d4d', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '4px' }}>
            Delete
          </button>
        </div>
      ))}
      <div style={{ marginTop: '20px', display: 'flex', gap: '15px' }}>
        <button onClick={onContinueShopping} style={{ padding: '10px 20px', backgroundColor: '#4CAF50', color: 'white', border: 'none' }}>Continue Shopping</button>
        <button onClick={() => alert('Checkout functionality coming soon!')} style={{ padding: '10px 20px', backgroundColor: '#2196F3', color: 'white', border: 'none' }}>Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;