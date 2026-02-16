const Task = require('../models/Task');

exports.createTask = async (req,res)=>{
    try{

        const task = await Task.create({
            userId:req.userId,
            title:req.body.title,
            desc:req.body.desc,
            priority:req.body.priority,
            dueDate:req.body.dueDate
        });

        res.status(201).json(task);

    }catch(err){
        res.status(500).json({message:err.message});
    }
};


exports.getTasks = async (req,res)=>{
    try{

        const tasks = await Task.find({
            userId:req.userId
        }).sort({createdAt:-1});

        res.json(tasks);

    }catch(err){
        res.status(500).json({message:err.message});
    }
};

exports.updateTask = async (req,res)=>{
    try{

        const task = await Task.findById(req.params.id);

        if(!task){
            return res.status(404).json({
                message:"Task not found"
            });
        }

        // 🔥 OWNERSHIP CHECK
        if(task.userId.toString() !== req.userId){
            return res.status(403).json({
                message:"Not authorized"
            });
        }

        const updatedTask = await Task.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new:true}
        );

        res.json(updatedTask);

    }catch(err){
        res.status(500).json({message:err.message});
    }
};


exports.deleteTask = async (req,res)=>{
    try{

        const task = await Task.findById(req.params.id);

        if(!task){
            return res.status(404).json({
                message:"Task not found"
            });
        }

        if(task.userId.toString() !== req.userId){
            return res.status(403).json({
                message:"Not authorized"
            });
        }

        await task.deleteOne();

        res.json({
            message:"Task deleted"
        });

    }catch(err){
        res.status(500).json({message:err.message});
    }
};
