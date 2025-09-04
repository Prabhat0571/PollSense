import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { connectDB } from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import pollRoutes from './routes/pollRoutes.js';
import { handleSockets } from './sockets/pollSocket.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// CORS configuration for production
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://prabhat-assignment.onrender.com'] // Replace with your frontend URL
    : '*',
  methods: ['GET', 'POST'],
  credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());

connectDB();

app.use('/api/auth', authRoutes);
app.use('/api/polls', pollRoutes);
app.get('/', (req, res) => res.send('🎯 PollSense API'));

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: corsOptions,
});

handleSockets(io);

httpServer.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
