import app from './app.js';
import { createServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';

const httpServer = createServer(app);
const io = new SocketIOServer(httpServer);

io.on('connection', (socket) => {
  console.log('New client connected:', socket.id);
  // Puedes enviar datos iniciales o manejar eventos aquí
});

// Guarda la instancia de Socket.IO en la app para emitir eventos en tiempo real
app.set('socketio', io);

const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
