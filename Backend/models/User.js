const mongoose = require('mongoose') ;
const { Schema } = mongoose;

const UserSchema = new Schema({
    name:{
        type:String,
        require:true,
    },
    email:{
        type:String,
        require:true,
        unique : true,
    },
    phonenumber:{
        type:String,
        require:true,
    },
    password:{
        type:String,
        require:true,

    },
    files:{
        type:String,
        
    },
    

});

const User = mongoose.model("User",UserSchema)
module.exports =User;