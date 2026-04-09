import express from 'express';
import { connectDB } from './config/database.js';
import { User } from './models/user.js';

const app = express();

app.use(express.json());

app.post('/signup', async (req, res) => {
    //creating a new instance of User model
    const user = new User(req.body);
    try {
        await user.save();
        res.send('User added successfully');
    } catch (err) {
        res.status(400).send('Error adding user', err.message);
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
