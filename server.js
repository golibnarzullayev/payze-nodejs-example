const express = require('express');

const { PORT } = require('./config/environments');

const indexRoute = require('./routes');

const errorHandler = require('./middlewares/error-handler.middleware');
const { connectDB } = require('./config/db');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// route
app.use('/v1', indexRoute);

// error handler
app.use(errorHandler);

connectDB().then();

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))