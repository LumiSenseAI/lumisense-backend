import { Hono } from 'hono';
import * as MqttController from '../controllers/mqttController.js';
import { authenticate } from '../middlewares/authMiddleware.js';

const mqttRouter = new Hono();

// Route to change the state of an object via MQTT
mqttRouter.post('/change_state', authenticate, MqttController.changeState);

export default mqttRouter;