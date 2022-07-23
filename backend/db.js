const mongoose = require('mongoose'); 
const mongoURI= "mongodb+srv://sagar:sagar@cluster0.ivkjr.mongodb.net/TaskTracker?retryWrites=true&w=majority"; 

const connectToMongo = () => {
    mongoose.connect(mongoURI, () => {
        console.log("Connected to Mongo Successfully");
    })
}
module.exports = connectToMongo; 