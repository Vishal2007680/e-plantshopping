import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';
import CartItem from './CartItem';

const plantsArray = [
  {
    category: "Air Purifying Plants",
    plants: [
      { name: "Snake Plant", image: "https://cdn.pixabay.com/photo/2021/01/22/06/04/snake-plant-5939187_1280.jpg", description: "Produces oxygen at night.", cost: "$15" },
      { name: "Spider Plant", image: "https://cdn.pixabay.com/photo/2018/07/11/06/47/chlorophytum-3530413_1280.jpg", description: "Easy to care for and purifies air.", cost: "$12" }
    ]
  },
  {
    category: "Aromatic Plants",
    plants: [
      { name: "Lavender", image: "https://images.unsplash.com/photo-1611909023032-2d6b3134ecba?w=500", description: "Calming scent for relaxation.", cost: "$20" },
      { name: "Jasmine", image: "https://images.unsplash.com/photo-1592729645009-b96d1e63d14b?w=500", description: "Sweet, soothing fragrance.", cost: "$18" }
    ]
  }
];

function ProductList() {
  const [showCart, setShowCart] = useState(false);
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);

  const calculateTotalCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
  };

  return (
    <div>
      <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '15px 30px', backgroundColor: '#4CAF50', color: 'white' }}>
        <h2>Paradise Nursery</h2>
        <button style={{ fontSize: '1rem', cursor: 'pointer' }} onClick={() => setShowCart(!showCart)}>
          🛒 Cart ({calculateTotalCount()})
        </button>
      </nav>

      {showCart ? (
        <CartItem onContinueShopping={() => setShowCart(false)} />
      ) : (
        <div style={{ padding: '20px' }}>
          {plantsArray.map((categoryObj, index) => (
            <div key={index}>
              <h2>{categoryObj.category}</h2>
              <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                {categoryObj.plants.map((plant, pIndex) => (
                  <div key={pIndex} style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '8px', width: '200px' }}>
                    <img src={plant.image} alt={plant.name} style={{ width: '100%', height: '150px', objectFit: 'cover' }} />
                    <h3>{plant.name}</h3>
                    <p>{plant.description}</p>
                    <p><strong>{plant.cost}</strong></p>
                    <button onClick={() => handleAddToCart(plant)} style={{ padding: '8px 12px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                      Add to Cart
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductList;