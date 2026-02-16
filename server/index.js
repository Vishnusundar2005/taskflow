require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');

const authRoutes = require('./routes/authRoutes');
const authMiddleware = require('./middleware/authMiddleware');
const taskRoutes = require('./routes/taskRoutes');

const app = express();

const cors = require('cors');
app.use(cors());

// Middleware
app.use(express.json());


// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

app.get('/api/protected', authMiddleware, (req,res)=>{
    res.json({
        message:"Protected data 😎",
        user:req.userId
    });
});


// MongoDB
mongoose.connect(process.env.MONGODB_URI)
.then(()=> console.log("MongoDB Connected 🔥"))
.catch(err => console.log(err));



// Server LAST
app.listen(5000, ()=>{
    console.log("Server started on port 5000 🚀");
});
