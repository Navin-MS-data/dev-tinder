import express from 'express';
import { userAuth } from '../middlewares/auth.js';

const requestsRouter = express.Router();

requestsRouter.post('/sendConnectionRequest', userAuth, async (req, res) => {
    const user = req.user;

    console.log('Sending connection request');

    res.send(user.firstName + ' sent the connection request');
});

export default requestsRouter;
