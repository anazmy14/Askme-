const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const questionModel = require('../models/question'); 
const auth = require('../utils/auth');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));


router.post('/:id', auth, async (req,res) => {
    await questionModel.findByIdAndUpdate( req.params.id , {$addToSet : {likes : req.user} });  
    res.send();
});

router.delete('/:id', auth, async (req,res) => {
    await questionModel.findByIdAndUpdate( req.params.id , {$pull: { likes: req.user}});  
    res.send("ok");
});




module.exports = router; 