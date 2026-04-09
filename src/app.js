import express from 'express';
import { connectDB } from './config/database.js';
import { User } from './models/user.js';

const app = express();

app.post('/signup', async (req, res) => {
    //creating a new instance of User model
    const user = new User({
        firstName: 'Sachin',
        lastName: 'Tendulkar',
        email: 'sachin@example.com',
        password: 'sachin@0111',
    });
    try {
        await user.save();
        res.send('User added successfully');
    } catch (err) {
        res.status(400).send('Error adding user', err.message);
    }
});

app.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.send(users);
    } catch (err) {
        res.status(400).send('Error getting all user', err.message);
    }
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
