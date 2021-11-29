const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config({ path: './config.env'});
const port = process.env.API_PORT || 5000;
const DB = process.env.MONGO_URI;
const user = require('./routes/userRoutes');
const post = require('./routes/postsRoutes');
const morgan = require('morgan')
const app = express();

app.use(morgan('dev'))
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(user);
app.use(post)

app.listen(port, () => {
  mongoose.connect(DB, { 
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  console.log(`Server is running on port: ${port}`);
});
