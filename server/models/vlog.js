const mongoose = require('mongoose');

const vlogSchema = new mongoose.Schema(
    {
        query : {
            type:String,
            required : true,
            unique:true
        },
        senderEmail:{
            type:String
        },
        description : {
            type:Array,
        },
        authorName : {
            type:Array,
        },
        authorEmail : {
            type:Array,
        }
    },
    {
        timestamps:true
    }
);

const UserSchema = new mongoose.Schema(
    {
        username : {
            type:String,
            required : true,
        },
        email : {
            type:String,
            required : true,
            unique:true
        },
        password : {
            type:String,
            required : true
        }
    },
    {
        timestamps:true
    }
)

const VlogModel = mongoose.model('Blog-App', vlogSchema);
const UserModel = mongoose.model('Users', UserSchema);

module.exports = {
    VlogModel,
    UserModel
}