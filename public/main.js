document.getElementById('homeBtn').addEventListener('click', () => {
  window.location.href = '/';
});

document.getElementById('cartBtn').addEventListener('click', () => {
  window.location.href = '/cart.html';
});

async function loadProducts() {
  try {
    const res = await fetch('/api/products');
    const data = await res.json();
    const productList = document.getElementById('productList');
    if (data.response && Array.isArray(data.response)) {
      productList.innerHTML = data.response.map(product => `
        <div class="product">
          <img src="${product.thumbnails[0]}" alt="${product.title}">
          <h2>${product.title}</h2>
          <p>Price: $${product.price}</p>
          <p>Stock: ${product.stock}</p>
          <button onclick="addToCart('${product._id}', 1)">Add to Cart</button>
        </div>
      `).join('');
    } else {
      productList.innerHTML = '<p>No products available</p>';
    }
  } catch (error) {
    console.error('Error loading products:', error);
  }
}

async function addToCart(productId, quantity) {
  // Para simplicidad, usaremos un cartId almacenado en localStorage
  let cartId = localStorage.getItem('cartId');
  if (!cartId) {
    // Crea un carrito vacío con user_id 'guest'
    const res = await fetch('/api/carts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ products: [], user_id: 'guest' })
    });
    const data = await res.json();
    cartId = data.response;
    localStorage.setItem('cartId', cartId);
  }
  // Agregar producto al carrito
  const res = await fetch(`/api/carts/${cartId}/product/${productId}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ quantity })
  });
  if (res.ok) {
    alert('Product added to cart');
  } else {
    const errorData = await res.json();
    alert('Error: ' + errorData.error);
  }
}

loadProducts();
