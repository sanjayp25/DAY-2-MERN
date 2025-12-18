const mongoose=require('mongoose')
mongoose.connect("mongodb://localhost:27017/PortfolioDB")
.then(()=>{
    console.log("Connected to MongoDB")
})
.catch((err)=>{
    console.log("Error connecting to MongoDB:",err)
})
const schema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    technologies:{
        type:String,
        required:true
    },
    link:{
        type:String,
        default:""
    },
    github:{
        type:String,
        default:""
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})
const collection=new mongoose.model("Portfolio",schema)
module.exports=collection

