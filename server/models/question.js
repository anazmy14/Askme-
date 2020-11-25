const mongoose = require('mongoose');
const uri =  process.env.MONGO_URI
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology : true, useCreateIndex: true });

const questionSchema = new mongoose.Schema({
    from : {
        type : String,
        required : true
    }, 
    to : {
        type : String,
        required : true
    },
    question : {
        type : String,
        required : true
    },
    answer : {
        type : String
    },
    date : {
        type : Date 
    },
    anonymous : {
        type : Boolean
    },
    time : {
    }
  
});


const questionModel = mongoose.model( 'question' , questionSchema);

module.exports = questionModel ; 