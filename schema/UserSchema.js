const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    ime : {type:String, required:true},
    prezime : {type:String, required:true},
    status : {type:String, required:true},
email : {type:String, required: true, unique:true},
lozinka: {type:String, required:true},
logoutTime : { type : Date, default : null}
}
);

const userModel = mongoose.model('user', userSchema);
module.exports = userModel;