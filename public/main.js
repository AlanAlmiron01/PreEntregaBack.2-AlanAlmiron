document.getElementById('inicio').addEventListener('click', () => {
    alert('Bienvenido a Bicis Trek');
  });
  
  document.getElementById('carrito').addEventListener('click', () => {
    alert('Carrito en desarrollo 🚴‍♂️');
  });
  
  async function cargarProductos() {
    const response = await fetch('/api/products');
    const data = await response.json();
    const productos = data.response;
  
    const productosContainer = document.getElementById('productos');
    productosContainer.innerHTML = productos.map(producto => `
      <div class="producto">
        <img src="${producto.thumbnails[0]}" alt="${producto.title}">
        <h2>${producto.title}</h2>
        <p>Precio: $${producto.price}</p>
        <p>Stock: ${producto.stock}</p>
      </div>
    `).join('');
  }
  
  cargarProductos();
  