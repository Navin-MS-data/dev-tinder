import jwt from 'jsonwebtoken';
import { User } from '../models/user.js';

const userAuth = async (req, res, next) => {
    try {
        //read the token from the req cookies
        const { token } = req.cookies;
        if (!token) {
            throw new Error('Token not found');
        }

        const decodedObj = await jwt.verify(token, 'DEV@Tinder$790');

        const { _id } = decodedObj;

        const user = await User.findById(_id);

        if (!user) {
            throw new Error('User not found');
        }

        req.user = user;
        next();
    } catch (err) {
        res.status(400).json('ERROR: ' + err.message);
    }
};

export { userAuth };
