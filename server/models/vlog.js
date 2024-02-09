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
        },
        otp:{
            required : false,
            type : Number
        }
    },
    {
        timestamps:true
    }
)
const FeedbackSchema = new mongoose.Schema(
    {
        
        email : {
            type:String,
            required : true,
            unique:true
        },
        message : {
            type:String,
            required : true
        }
    },
    {
        timestamps:true
    }
)
const ContactSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required : true,
        },
        email : {
            type:String,
            required : true,
            unique:true
        },
        issue : {
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
const FeedbackModel = mongoose.model('Blog-App-Feedback', FeedbackSchema);
const ContactModel = mongoose.model('Blog-App-Contact', ContactSchema);

module.exports = {
    VlogModel,
    UserModel,
    FeedbackModel,
    ContactModel
}
