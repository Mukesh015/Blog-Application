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

const VlogModel = mongoose.model('Blog-App', vlogSchema);

module.exports = VlogModel;