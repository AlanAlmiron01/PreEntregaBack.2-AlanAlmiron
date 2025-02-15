document.addEventListener('DOMContentLoaded', async () => {
  try {
    const res = await fetch('/api/products');
    const data = await res.json();
    const products = data.response;
    const container = document.getElementById('product-container') || document.getElementById('products');
    container.innerHTML = products.map(product => `
      <div class="product-card">
        <img src="${product.thumbnails[0]}" alt="${product.title}">
        <h3><a href="/products/${product._id}">${product.title}</a></h3>
        <p>Price: $${product.price}</p>
        <p>Stock: ${product.stock}</p>
        <button onclick="addToCart('${product._id}', 1)">Add to Cart</button>
      </div>
    `).join('');
  } catch (error) {
    console.error('Error loading products:', error);
  }
});

async function addToCart(productId, quantity) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const existing = cart.find(p => p._id === productId);
  if (existing) {
    if (existing.quantity < existing.stock) {
      existing.quantity++;
    } else {
      alert('No more stock available');
      return;
    }
  } else {
    const res = await fetch(`/api/products/${productId}`);
    const data = await res.json();
    cart.push({ ...data.response, quantity: 1 });
  }
  localStorage.setItem('cart', JSON.stringify(cart));
  alert('Product added to cart (local storage)');
}
