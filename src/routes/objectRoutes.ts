import { Hono } from 'hono'; 
import * as ObjectController from '../controllers/objectController.js'; 

const objectRouter = new Hono(); 


objectRouter.get('/', ObjectController.getAllObjects); 
objectRouter.get('/:id', ObjectController.getObjectById); 
objectRouter.post('/', ObjectController.createObject); 
objectRouter.put('/:id', ObjectController.updateObject); 
objectRouter.delete('/:id', ObjectController.deleteObject); 

export default objectRouter;
