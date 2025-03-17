import { Hono } from 'hono';
import { serve } from '@hono/node-server';
import { connectDB } from './config/database.js';
import { cors } from 'hono/cors'
import { initializeUsers } from './config/initIUsers.js';
import objectRouter from './routes/objectRoutes.js'

const app = new Hono();

app.use(cors())

await connectDB();
await initializeUsers();

app.route('/api/object', objectRouter);


serve({
  fetch: app.fetch,
});

console.log(`Server running on http://localhost:3000`);
