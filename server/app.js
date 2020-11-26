const express = require('express');
const app = express(); 
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken');
const cors = require("cors");
const mongoose = require("mongoose")
const port =  process.env.PORT || 4000;
const auth = require('./utils/auth');

const whitelist = ['https://askme--client.herokuapp.com', 'http://localhost:3000']
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true
}

 

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors( corsOptions ));

app.use(cookieParser());

const userModel = require('./models/user');
const questionModel = require('./models/question'); 
const followModel = require('./models/follow');

const authRouter = require('./routes/auth');
const profilesRouter = require('./routes/profiles');
const followRouter = require('./routes/follow');
const questionsRouter = require('./routes/questions');
const likeRouter = require('./routes/like');
 
app.use('/profiles' , profilesRouter);
app.use('/follow', followRouter );
app.use('/questions', questionsRouter);
app.use('/like', likeRouter);
app.use('/' , authRouter);



app.listen(process.env.PORT);
