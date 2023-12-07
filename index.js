
// Importing required modules
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

// Initializing the express app
const app = express()

// Middleware for handling CORS and parsing JSON data
app.use(cors())
app.use(express.json())

// Defining the port number
const PORT = process.env.PORT || 8080

// Defining the schema for the data
const schemaData = mongoose.Schema({
    name: String,
    email: String,
    mobile: Number,
    
},{
    timestamps: true
})

// Creating a model for the data
const userModel = mongoose.model("user",schemaData)

// Connecting to MongoDB
mongoose.connect("mongodb+srv://sheikhebrima050:HzpGzNKw8fO6XnL8@cluster0.t2d4x0e.mongodb.net/")
.then(() => { console.log(`connected to MongoDB`) })
.catch((err) => {console.log(err)})

// Reading data from MongoDB
app.get('/', async(req,res) => {

    const data = await userModel.find({})
    res.send({success:true, data: data})
})

// Creating new data in MongoDB
app.post('/create', async (req, res) => {
    console.log(req.body);
    const data = new userModel(req.body);
    await data.save();
    res.send({ success: true, message: "data saved successfully", data: data });
});

// Updating existing data in MongoDB
app.put("/update" , async(req,res) => {
 console.log(req.body)
 const {id,...rest} = req.body
 const data = userModel.updateOne({_id : id }, rest)
 res.send({sucess:true, message : "data update successfully" ,data: data})
})

// Deleting data from MongoDB
app.delete("/delete/:id",async (req,res)=>{
const id = req.params.id
console.log(id)
const data = await userModel.deleteOne({_id : id})
res.send({success : true, message : " data delete successfully" ,data: data})
})

// Starting the server
app.listen (PORT , () => {
    console.log("server is running")
})
//
//This code provides a basic implementation of a CRUD (Create, Read, Update, Delete) operation using MongoDB and Express.js. The comments in the code explain the purpose of each section and provide a concise overview of the code..</s>
