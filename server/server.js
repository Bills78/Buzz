const express = require('express');
// mongoose connects to db
const mongoose = require('mongoose');
// Cross Origin Resource Sharing or CORS
// allows FE data from FE PORT to enter BE PORT
const cors = require('cors');
// config.env keeps my private things private.
//  Don't forget to add to .gitignore
require('dotenv').config({ path: './config.env'});
const port = process.env.API_PORT || 5000;
const DB = process.env.MONGO_URI;
// routes
const user = require('./routes/userRoutes');
const post = require('./routes/postsRoutes');

const morgan = require('morgan')

const app = express();

// middleware
app.use(morgan('dev'))
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(user);
app.use(post)

// Run Server and connect to mongo
app.listen(port, () => {
  mongoose.connect(DB, { 
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  console.log(`Server is running on port: ${port}`);
});
