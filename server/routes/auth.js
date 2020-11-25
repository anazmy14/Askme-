const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const router = express.Router(); 

const auth = require('../utils/auth');
const userModel = require('../models/user');


router.post('/register' , async (req , res ) => {
    try {
        const hashedPass = await bcrypt.hash(req.body.password, 10);
        const result = await userModel.create({
          username: req.body.username,
          password: hashedPass,
        });
        const token = jwt.sign(req.body.username , process.env.SECRET);
        res.cookie('token', token, { sameSite: 'none', secure: true });
        res.send();

       }catch (err) {
        console.log(err);  
        res.status(500).send("Internal Server error Occured");
      }
})

router.post('/login', async (req, res) => {
  try {
      const user = await userModel.findOne({ username: req.body.username });      
      if (user) {
        const cmp = await bcrypt.compare(req.body.password, user.password);
        if (cmp) {
          
          const token = jwt.sign(user.username , process.env.SECRET);
          res.cookie('token', token, { sameSite: 'none', secure: true });
          res.status(200).send();
        } else {
          res.send("Wrong username or password.");
        }
      } else {
        res.send("Wrong username or password.");
      }
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal Server error Occured");
    }
  });

  router.delete('/login', (req,res) =>{
    res.clearCookie("token", { sameSite: 'none', secure: true });
    res.status(200).send();
  })

  router.get('/', auth, (req , res) => {
    res.send({user : req.user });
  });
  

module.exports = router;  