import express from 'express';
import userController from '../controller/user.ts';
import commentController from '../controller/comment.ts';



export const routes = express.Router();

routes.post('/register', userController.register);
routes.post('/login', userController.login);
routes.post('/create/comment', commentController.createOne);


routes.get('/', (req, res) => {
    res.send("What's up doc ?!");
});




// export default { router};