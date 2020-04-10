const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
// <-- ROUTES
const postRoutes = require('./routes/postRoutes');
const userRoutes = require('./routes/userRoutes');
// --> ROUTES

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server is live on port ${port}`));

mongoose.connect(
  process.env.DB_CONNECTION_STRING,
  // add .env file with DB_CONNECTION_STRING
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log('connected to DB');
  },
);

app.get('/', (req, res) => {
  res.send('App is on');
});

// MIDDLEWARES
app.use(bodyParser.json());
app.use(cors());
// POSTS
app.use('/posts', postRoutes);
// USERS
app.use('/users', userRoutes);
