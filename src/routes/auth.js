import express from 'express';
import { User } from '../models/user.js';
import bcrypt from 'bcrypt';
import { validateSignUpData } from '../utils/validation.js';

const authRouter = express.Router();

authRouter.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            throw new Error('Invalid credentials');
        }
        const isPasswordValid = await user.validatePassword(password);

        if (isPasswordValid) {
            const token = await user.getJWT();
            console.log(token);

            res.cookie('token', token);
            res.send('Login successful');
        } else {
            throw new Error('Invalid credentials');
        }
    } catch (err) {
        res.status(400).send('Error: ' + err.message);
    }
});

authRouter.post('/signup', async (req, res) => {
    //validation of the data is required
    validateSignUpData(req);
    //encrypt the pasword
    const { password, firstName, lastName, email } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);
    console.log(passwordHash);

    //creating a new instance of User model
    const user = new User({
        firstName,
        lastName,
        email,
        password: passwordHash,
    });
    try {
        await user.save();
        res.send('User added successfully');
    } catch (err) {
        res.status(400).send(`ERROR: ${err.message}`);
    }
});

authRouter.post('/logout', async (req, res) => {
    res.cookie('token', null, {
        expires: new Date(Date.now()),
    });
    res.send('Logout successful');
});

export default authRouter;
