import express from 'express';
import controller from '../controller/user.ts';


export const routes = express.Router();

routes.post('/register', controller.register);
routes.post('/login', controller.login);


routes.get('/', (req, res) => {
    res.send("What's up doc ?!");
});




// export default { router};