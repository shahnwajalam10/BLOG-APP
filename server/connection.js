const mongoose=require("mongoose");

const MONGO_URI="mongodb+srv://shahnwajalam10:johnnydepp123@cluster0.qf6roaf.mongodb.net/blogs?retryWrites=true&w=majority";


const connectDb=async()=>{

    const connection=await mongoose.connect(MONGO_URI);
    if(connection) console.log("Database Connected");
    else console.log("Database connection failed");

}

module.exports={connectDb};