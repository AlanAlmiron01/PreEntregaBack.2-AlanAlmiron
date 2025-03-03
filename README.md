🚴 Trek Bikes E-commerce
Este es un e-commerce simple para vender bicicletas Trek. Permite a los usuarios registrarse, iniciar sesión, agregar productos al carrito y realizar una orden.

🧩 Funcionalidades principales
Registro e inicio de sesión con JWT (guardado en cookies).

Listado de productos con imagen, precio y botón para agregar al carrito.

Carrito por usuario con contador, subtotal y total.

Posibilidad de eliminar productos del carrito.

Checkout con formulario de envío (dirección y teléfono).

Creación de órdenes en base al carrito y vaciado automático del carrito tras completar la compra.

⚙️ Tecnologías usadas
Node.js + Express

MongoDB + Mongoose

Passport + JWT

EJS + JavaScript + Vite (frontend básico)

Firebase (solo para confirmar checkout)

🧪 ¿Cómo probarlo?
Cloná el proyecto y corré npm install.

Configurá .env con tu Mongo URI, JWT secret, etc.

Ejecutá npm run dev.

Registrate, logueate, agregá productos y completá una orden desde el checkout.

