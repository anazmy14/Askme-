const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');


router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

const auth = require('../utils/auth');  

const followModel = require('../models/follow');

router.post('/:username' , auth , async (req,res) =>{
    try{
       await followModel.create({
         from : req.user,
         to : req.params.username 
       });
    }catch(err){
      console.log(err);
    }  

  })

   
  router.delete('/:username' , auth , async (req,res) =>{
    try{
       await followModel.findOneAndDelete({
         from : req.user,
         to : req.params.username 
       });
    }catch(err){
      console.log(err);
    } 
}) 




module.exports = router;