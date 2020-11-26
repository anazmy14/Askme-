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
      const questions = await questionModel.aggregate().match({
        to : query.to,
        answer : query.answer
      }).project( { 
        likesCount : { $size: "$likes"}, 
        isLike : { $in : [ req.user , "$likes" ] }, 
        from : 1,
        to : 1,
        date : 1,
        question : 1,
        answer : 1,
        anonymous : 1  
       }).sort({date:-1});
      questions.forEach( q  =>  q.time = q.date.toDateString() );      
      res.send({questions})
    }catch(err){
      console.log(err);
    }  

})

router.get('/try' , async(req,res) => {
   const results = await questionModel.aggregate().project( { 
     likesCount : { $size: "$likes"}, 
     isLike : { $in : [ req.user , "$likes" ] }
    });
   res.send(results);
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
 
  req.body.date =  Date.now();
  try {
     await questionModel.findByIdAndUpdate( req.params.id , req.body);
     console.log("updated");
  }catch(err){
    console.log(err);
  }

})




module.exports = router;
