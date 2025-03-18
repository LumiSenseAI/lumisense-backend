import { Hono } from 'hono';
import { serve } from '@hono/node-server';
import { connectDB } from './config/database.js';
import { cors } from 'hono/cors'
import { initializeUsers } from './config/initIUsers.js';
import objectRouter from './routes/objectRoutes.js'
import authRouter from './routes/authRoutes.js';
import userRouter from './routes/userRoutes.js';
import audioRouter from './routes/audioRoutes.js';
import mqttRouter from './routes/mqttRoutes.js';

const app = new Hono();

app.use(
  '*',
  cors({
    origin: 'http://localhost:5173',  
    credentials: true, 
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE'], 
    allowHeaders: ['Content-Type', 'Authorization']
  })
)

await connectDB();
await initializeUsers();

app.route('/api/object', objectRouter);
app.route('/api/auth', authRouter);
app.route('/api/audio', audioRouter);
app.route('/api/user', userRouter);
app.route('/api/mqtt', mqttRouter);

serve({
  fetch: app.fetch,
});

console.log(`Server running on http://localhost:3000`);
