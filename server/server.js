const express = require('express');
// mongoose connects to db
const mongoose = require('mongoose');
// Cross Origin Resource Sharing or CORS
// allows FE data from port FE PORT to enter BE PORT
const cors = require('cors');
// dbURI is the link to my mongodb
require('dotenv').config({ path: './config.env'});
const port = process.env.API_PORT || 5000;
const DB = process.env.MONGO_URI;
// routes
const user = require('./routes/authRoutes');
// authentication stuffs
const cookieParser = require('cookie-parser');

const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(user);

app.listen(port, () => {
  mongoose.connect(DB, { 
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  console.log(`Server is running on port: ${port}`);
});
