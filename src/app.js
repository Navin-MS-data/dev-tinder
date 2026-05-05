import bcrypt from 'bcrypt';
import cookieParser from 'cookie-parser';
import express from 'express';
import jwt from 'jsonwebtoken';
import { connectDB } from './config/database.js';
import { User } from './models/user.js';
import { validateSignUpData } from './utils/validation.js';
import { userAuth } from './middlewares/auth.js';

const app = express();

app.use(express.json());
app.use(cookieParser());

app.post('/signup', async (req, res) => {
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

app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            throw new Error('Invalid credentials');
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (isPasswordValid) {
            //create a JWT token
            const token = await jwt.sign({ _id: user._id }, 'DEV@Tinder$790');
            console.log(token);
            //Add the token to the cookie and send the response back to the user
            res.cookie('token', token);
            res.send('Login successful');
        } else {
            throw new Error('Invalid credentials');
        }
    } catch (err) {
        res.status(400).send('Error: ' + err.message);
    }
});

app.get('/profile', userAuth, async (req, res) => {
    try {
        const user = req.user;

        res.send(user);
    } catch (error) {
        res.status(400).send(`Error getting profile: ${error.message}`);
    }
});

app.post('/sendConnectionRequest', userAuth, async (req, res) => {
    const user = req.user;

    console.log('Sending connection request');

    res.send(user.firstName + ' sent the connection request');
});

connectDB()
    .then(() => {
        console.log('database connection established');
        app.listen(3000, () => {
            console.log('Server is running on PORT 3000');
        });
    })
    .catch((err) => {
        console.error('database connection failed');
    });
