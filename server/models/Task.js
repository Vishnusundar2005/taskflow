const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({

    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },

    title:{
        type:String,
        required:true,
        maxlength:120
    },

    desc:{
        type:String,
        default:''
    },

    priority:{
        type:String,
        enum:['low','medium','high'],
        default:'medium'
    },

    completed:{
        type:Boolean,
        default:false
    },

    dueDate:{
        type:Date,
        default:null
    },

    createdAt:{
        type:Date,
        default:Date.now
    }

    
});

taskSchema.set('toJSON',{
    transform:(doc,ret)=>{
        delete ret.__v;
        return ret;
    }
});

module.exports = mongoose.model("Task",taskSchema);
