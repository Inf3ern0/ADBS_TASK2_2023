const mongoose = require('mongoose')

const userschema = mongoose.Schema({
    first_name:{type:String, required:true},
    surname:{type:String, required:true},
    username: {type:String, required:true},
    password:{type:String, requireed:true},
    email:{type:String, required:true}
}

)

module.exports = mongoose.model('User',userschema)