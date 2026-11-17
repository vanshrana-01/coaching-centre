const mongoose = require("mongoose")
const dns = require("dns")
dns.setServers(["8.8.8.8","1.1.1.1"])
async function connectDB() {
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDb connected")
    }
    catch(error){
        console.error("MongoDB connection error:", error.message);
        process.exit(1);

    }
    
}
module.exports = connectDB