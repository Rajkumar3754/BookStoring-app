const express = require('express');
const connectDb = require('./config/db.connection');
const dotenv = require('dotenv').config();
const cors = require('cors');

const app = express();
const port = process.env.PORT || 2000;

app.use(express.json());
app.use(cors());

// Connect to the database
connectDb();

// Book routes
app.use('/books', require('./routes/bookroutes'));

// Start the server
app.listen(port, () => console.log(`Server running on port: ${port}`));
