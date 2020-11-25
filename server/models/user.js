const mongoose = require('mongoose');
const uri = process.env.MONGO_URI
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology : true, useCreateIndex: true });


const userSchema = new mongoose.Schema ({
    username : {
        type : String,
        unique : true
    },     
    password : { 
        type : String
    }
})

const userModel = mongoose.model('users', userSchema );
module.exports = userModel;
