const socket = io();

socket.on('newProduct', (product) => {
  const productsList = document.getElementById('productsList');
  const div = document.createElement('div');
  div.className = 'product-card';
  div.innerHTML = `
    <img src="${product.thumbnails[0]}" alt="${product.title}">
    <h3><a href="/products/${product._id}">${product.title}</a></h3>
    <p>Price: $${product.price}</p>
    <p>Stock: ${product.stock}</p>
  `;
  productsList.appendChild(div);
});

document.getElementById('productForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const productData = {
    title: formData.get('title'),
    category: formData.get('category'),
    thumbnails: [formData.get('thumbnail')],
    price: parseFloat(formData.get('price')),
    stock: parseInt(formData.get('stock')),
    description: formData.get('description')
  };
  const res = await fetch('/api/products', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(productData)
  });
  if (res.ok) {
    e.target.reset();
  } else {
    const errorData = await res.json();
    alert('Error: ' + errorData.error);
  }
});
