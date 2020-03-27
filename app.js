const express = require('express');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = 3000;

app.listen(port, () => console.log(`Server is live on port ${port}`));

mongoose.connect(
  process.env.DB_CONNECTION_STRING,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log('connected to DB');
  },
);
