const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');


router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

const auth = require('../utils/auth');  

const userModel = require('../models/user');
const questionModel = require('../models/question'); 
const followModel = require('../models/follow');


router.get('/:username', auth ,async (req , res ) => {
    const username = req.params.username;
    try {
      const user = await userModel.findOne( { username}) ;
      const follow = await followModel.findOne({ from: req.user , to : username});
      const isFollow = follow ? 1 : 0 ; 
           
      if(!user) res.status(404).send();
      res.send({
        user : user.username,
        isFollow : isFollow   
      });
    }catch(err){
      res.status(500).send();
    }    
})



module.exports = router;