require('dotenv').config()
const express = require('express');
const connectDb = require('./config/db');
const register = require('./routes/register');
const login = require('./routes/login');
const usersRoutes = require('./routes/users');
const provjeriToken = require('./middleware/authMiddleWare');

const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use('/api', register);
app.use('/api', login);
app.use('/api/users', provjeriToken, usersRoutes);


const port = process.env.PORT;
app.listen(port, () => {
  console.log(`sport-info-backend app listening on port ${port}`)
})