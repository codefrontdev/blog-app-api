const expres = require('express');
const {notFound, errorHandler} = require('./middlewares/errors')
const logger = require('./middlewares/logger');
require('dotenv').config();
const connectToDB = require('./config/db');

// Connection To Database

connectToDB();




// Init App
const app = expres();

// apply Middleware
app.use(expres.json());

app.use(logger);

// routes
app.use('/api/books', require('./routes/books'));
app.use('/api/authors', require('./routes/authors'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));


// Error Handler Middleware
app.use(notFound);
app.use(errorHandler);


// Running The Server
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`server is running in ${process.env.NODE_ENV} node on port http://localhost:${PORT}`);
})