const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
// ROUTES
const postRoutes = require('./routes/postRoutes');
const userRoutes = require('./routes/userRoutes');
//

require('dotenv').config();

const app = express();
const port = 3000;

app.listen(process.env.PORT || port, () =>
  console.log(`Server is live on port ${process.env.PORT || port}`),
);

mongoose.connect(
  process.env.DB_CONNECTION_STRING,
  //add .env file with DB_CONNECTION_STRING
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log('connected to DB');
  },
);

// MIDDLEWARES
app.use(bodyParser.json());
app.use(cors());
// POSTS
app.use('/posts', postRoutes);
// USER
app.use('/user', userRoutes);
