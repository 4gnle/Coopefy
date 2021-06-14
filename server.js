const express = require('express');
const connectDB = require ('./config/db')

const app = express();

//Connect Database
connectDB();

app.get('/', (req, res) => res.send('API Running'))

//Init Middleware
app.use(express.json({ extended: false}));

//Define Routes
app.use('/api/users', require('./server/routes/api/users'));
app.use('/api/profile', require('./server/routes/api/profile'));
app.use('/api/projects', require('./server/routes/api/projects'));
app.use('/api/auth', require('./server/routes/api/auth'));


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server Started on Port ${PORT}`));
