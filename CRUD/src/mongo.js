const mongoose=require('mongoose')
mongoose.connect("mongodb://localhost:27017/PortfolioDB")
.then(()=>{
    console.log("Connected to MongoDB")
})
.catch((err)=>{
    console.log("Error connecting to MongoDB:",err)
})

// Portfolio Schema
const portfolioSchema=new mongoose.Schema({
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
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        default:null
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})

// User Schema
const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    name:{
        type:String,
        default:""
    },
    bio:{
        type:String,
        default:""
    },
    avatar:{
        type:String,
        default:"https://via.placeholder.com/150"
    },
    title:{
        type:String,
        default:"Full Stack Developer"
    },
    location:{
        type:String,
        default:""
    },
    skills:{
        type:String,
        default:""
    },
    website:{
        type:String,
        default:""
    },
    github:{
        type:String,
        default:""
    },
    linkedin:{
        type:String,
        default:""
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})

const Portfolio=mongoose.model("Portfolio",portfolioSchema)
const User=mongoose.model("User",userSchema)

module.exports={Portfolio,User}

