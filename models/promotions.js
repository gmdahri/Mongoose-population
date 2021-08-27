const mongoose = require( 'mongoose');

const Schema = mongoose.Schema;
const promotionSchema=new Schema({
    name:{
        type: String,
        required:true
    },
    image:{
        type: String,
        required: true
    },
    label:{
        type: String,
        required: true
    },
    price:{
        type:Number,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    featured:{
        type:Boolean,
        required:true
    }

});
const promotions = mongoose.model('promotions',promotionSchema);
module.exports=promotions;