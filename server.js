'use strict';

const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');
dotenv.config();
const { PORT, connectToMongoDb, errorHandler } = require('./config/app.config');
const routes = require('./routes/index.routes')

// app
const app = express();

//middleware
app.use(cors());
app.use(express.json());

// routes
app.use("/", routes);

// testing
app.get('/', (req, res) => {
  return res.send('App is Running!!!');
});

// connection to db
connectToMongoDb();

// error handlers
app.use(errorHandler);

//listening port 8000;
app.listen(PORT, () => console.log(`App Listening ${PORT}`));
