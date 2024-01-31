const mongoose = require('mongoose');

const vlogSchema = new mongoose.Schema(
    {
        title : {
            type:String,
            required : true
        },
        description : {
            type:String,
            required : true
        }
    },
    {
        timestamps:true
    }
);

const VlogModel = mongoose.model('Blog-App', vlogSchema);

module.exports = VlogModel;