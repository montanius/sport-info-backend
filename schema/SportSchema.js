const mongoose = require('mongoose');

const sportSchema = new mongoose.Schema({
    name : { type :String, required : true, unique : true},
    status : {type : String, required : true},
    type : {type : String, required : true},
    discipline : {type : [String]},
    category : {type : [String]},
    isDeleted : {type:Boolean, default: false}
});

const sportModel = mongoose.model('sport', sportSchema);
module.exports = sportModel;