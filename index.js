const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
//import routes
const authRoute = require('./routes/auth');
const postRoute = require('./routes/post');

dotenv.config();

//connect to Db
mongoose.connect(process.env.DB_CONNECT, () => console.log('Connect to DB'));

//Middleware
app.use(express.json());

//Route middleware  
app.use('/api/user', authRoute);
app.use('/api/posts', postRoute);

app.listen(3000, () => console.log('Server Up and running')); 