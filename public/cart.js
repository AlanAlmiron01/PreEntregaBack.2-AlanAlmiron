document.getElementById('homeBtn').addEventListener('click', () => {
    window.location.href = '/';
  });
  
  async function loadCart() {
    const cartId = localStorage.getItem('cartId');
    const cartItemsSection = document.getElementById('cartItems');
    if (!cartId) {
      cartItemsSection.innerHTML = '<p>Your cart is empty.</p>';
      return;
    }
    try {
      const res = await fetch(`/api/carts/${cartId}`);
      const data = await res.json();
      if (data.response && data.response.products.length > 0) {
        cartItemsSection.innerHTML = data.response.products.map(item => `
          <div class="product">
            <p>Product ID: ${item.productId}</p>
            <p>Quantity: ${item.quantity}</p>
            <button onclick="updateQuantity('${cartId}', '${item.productId}', ${item.quantity + 1})">+</button>
            <button onclick="updateQuantity('${cartId}', '${item.productId}', ${item.quantity - 1})">-</button>
            <button onclick="removeProduct('${cartId}', '${item.productId}')">Remove</button>
          </div>
        `).join('');
      } else {
        cartItemsSection.innerHTML = '<p>Your cart is empty.</p>';
      }
    } catch (error) {
      console.error('Error loading cart:', error);
    }
  }
  
  async function updateQuantity(cartId, productId, quantity) {
    try {
      const res = await fetch(`/api/carts/${cartId}/product/${productId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quantity })
      });
      if (!res.ok) {
        const err = await res.json();
        alert('Error: ' + err.error);
      }
      loadCart();
    } catch (error) {
      console.error(error);
    }
  }
  
  async function removeProduct(cartId, productId) {
    try {
      const res = await fetch(`/api/carts/${cartId}/product/${productId}`, {
        method: 'DELETE'
      });
      if (!res.ok) {
        const err = await res.json();
        alert('Error: ' + err.error);
      }
      loadCart();
    } catch (error) {
      console.error(error);
    }
  }
  
  loadCart();
  