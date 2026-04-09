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

app.get('/user', async (req, res) => {
  const userEmail = req.body.email;
  try {
    const users = await User.findOne({ email: userEmail });
    if (users.length === 0) {
      res.status(404).send('User not found');
    }
    res.send(users);
  } catch (error) {
    res.status(400).send('Error getting user', error.message);
  }
});

//Feed API - GET /feed - get a list of users from the database
app.get('/feed', async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    res.status(500).send('Error getting feed', error.message);
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
