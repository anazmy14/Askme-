const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const questionModel = require('../models/question'); 
const followModel = require('../models/follow');
const auth = require('../utils/auth');
const { Query } = require('mongoose');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));
const query = {}

const setQueries = async (req) => {
    query.answer = req.query.answer == "0"? { $eq : null} : {$ne : null}  ; 
    if( req.query.answer == '0') {
        query.to = req.user;
        return ;
    }
    if(req.query.to != "all") {
      query.to = req.query.to;
      return ;
    }
    

    let following = await followModel.find( {from : req.user});
    following = following.map(x => x.to);
    query.to = {$in : following};   

}   

router.get('/',auth, async (req,res) => {
    try {
      await setQueries(req);
      const questions = await questionModel.find({
        to : query.to,
        answer : query.answer         
      }).sort({date:-1});
      
      questions.forEach(q => q.time = q.date.toDateString() )  ;
      console.log(questions);
      res.send({questions})
    }catch(err){
      console.log(err);
    }    

})

router.post('/', auth ,async (req , res) => {
  console.log(req.body);
  const question = {
    from : req.user, 
    to : req.body.username,
    question : req.body.question,
    anonymous : req.body.anonymous,
    date : Date.now()
 }
 
  try {
    await questionModel.create(question);
    res.status(200).send();
  }catch{
    res.status(500).send();
  }
})



router.delete('/:id', auth, async(req,res) =>{
  try{
    await questionModel.findByIdAndDelete(req.params.id); 
    console.log("deleted");           
  }catch(err){
    console.log(err);
  }
});

router.put('/:id', auth, async(req,res) =>{
  console.log(req.body);
  try {
     await questionModel.findByIdAndUpdate( req.params.id , {
       answer : req.body.answer,
       date : Date.now()
    });
     console.log("updated");
  }catch(err){
    console.log(err);
  }

})




module.exports = router;
