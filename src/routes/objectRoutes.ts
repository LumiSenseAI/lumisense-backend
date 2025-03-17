import { Hono } from 'hono'; 
import * as ObjectController from '../controllers/objectController.js'; 
import { authenticate } from '../middlewares/authMiddleware.js';

const objectRouter = new Hono(); 


objectRouter.get('/', authenticate, ObjectController.getAllObjects); 
objectRouter.get('/:id', authenticate, ObjectController.getObjectById); 
objectRouter.post('/', authenticate, ObjectController.createObject); 
objectRouter.put('/:id', authenticate, ObjectController.updateObject); 
objectRouter.delete('/:id', authenticate, ObjectController.deleteObject); 

export default objectRouter;
