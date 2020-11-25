const mongoose = require('mongoose');
const uri = process.env.MONGO_URI
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology : true, useCreateIndex: true });

const followSchema = new mongoose.Schema({
    from : {
        type : String,
        required : true
    },
    to : {
        type : String,
        required : true
    }
});

const followModel = mongoose.model("follow", followSchema) ;

module.exports = followModel;
