const express = require('express');
// morgan shows requests in the BE console
const morgan = require('morgan');
// mongoose connects to db
const mongoose = require('mongoose');
// Cross Origin Resource Sharing or CORS
// allows FE data from port FE PORT to enter BE PORT
const cors = require('cors');
// dbURI is the link to my mongodb
const dbURI = 'mongodb+srv://joshua:iEatEggs@mern.h59zq.mongodb.net/MERN?retryWrites=true&w=majority';
// routes
const user = require('./routes/userRoutes');
// authentication stuffs
const session = require('express-session');
const cookieParser = require('cookie-parser');
const oneDay = 1000 * 60 * 60 * 24;

const app = express();

// middleware
app.use(morgan('dev'));
app.use(cors());
app.use(session({
  secret: 'ieateggs',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: oneDay },
}))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(user);

app.listen(8080, () => {
  mongoose.connect(dbURI, { 
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  console.log('Server is running on port: 8080');
});