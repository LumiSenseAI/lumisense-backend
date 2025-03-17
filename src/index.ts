import { Hono } from 'hono';
import { serve } from '@hono/node-server';
import { connectDB } from './config/database.js';
import { cors } from 'hono/cors'
import { initializeUsers } from './config/initIUsers.js';
import objectRouter from './routes/objectRoutes.js'
import authRouter from './routes/authRoutes.js';


const app = new Hono();

app.use(
  '*',
  cors({
    origin: 'http://localhost:5173',  
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE'], 
    allowHeaders: ['Content-Type', 'Authorization']
  })
)

await connectDB();
await initializeUsers();

app.route('/api/object', objectRouter);
app.route('/api/auth', authRouter);


serve({
  fetch: app.fetch,
});

console.log(`Server running on http://localhost:3000`);
