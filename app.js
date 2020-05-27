const express = require('express');
const passport = require('passport');
const cors = require('cors');
const rateLimiter = require('./middleware/rateLimit')

require('./config/passport')(passport);

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}


//dbconnection
require('./config/db');

//ROUTES
const userRouter = require('./routes/user')
const taskRouter = require('./routes/task');

const app = express()

app.use(cors());
app.use(passport.initialize());
app.use(express.json());
app.use(userRouter);
app.use(rateLimiter);
app.use(taskRouter)

module.exports = app