const express=require("express")
const {Portfolio,User}=require("./mongo")
const app=express()
const path=require("path")
const bcrypt=require("bcryptjs")
app.use(express.json())
app.use(express.urlencoded({extended:false}))
const templatePath=path.join(__dirname,"..","templates")
const publicPath=path.join(__dirname,"..","public")
app.set('view engine','hbs')
app.set("views",templatePath)
app.use(express.static(publicPath))

// Home page - Portfolio
app.get("/",(req,res)=>{
    res.render("home")
})

// About page
app.get("/about",(req,res)=>{
    res.render("about")
})

// Projects page
app.get("/projects",async(req,res)=>{
    try{
        const projects=await Portfolio.find()
        res.render("projects",{projects:projects})
    }
    catch(err){
        console.log("Error fetching projects:",err)
        res.send("Error fetching projects")
    }
})

// Contact page
app.get("/contact",(req,res)=>{
    res.render("contact")
})

// Add project page
app.get("/add-project",(req,res)=>{
    res.render("add-project")
})

// Add new project
app.post("/add-project",async(req,res)=>{
    try{
        const{title,description,technologies,link,github}=req.body
        const projectData={
            title:title,
            description:description,
            technologies:technologies,
            link:link,
            github:github,
            createdAt:new Date()
        }
        await Portfolio.create(projectData)
        res.render("add-project",{message:"Project added successfully!"})
    }
    catch(err){
        console.log("Error adding project:",err)
        res.render("add-project",{error:"Error adding project"})
    }
})

// Get single project
app.get("/project/:id",async(req,res)=>{
    try{
        const project=await Portfolio.findById(req.params.id)
        if(!project){
            return res.status(404).send("Project not found")
        }
        res.render("project-detail",{project:project})
    }
    catch(err){
        console.log("Error fetching project:",err)
        res.send("Error fetching project")
    }
})

// Delete project
app.post("/delete-project/:id",async(req,res)=>{
    try{
        await Portfolio.findByIdAndDelete(req.params.id)
        res.redirect("/projects")
    }
    catch(err){
        console.log("Error deleting project:",err)
        res.send("Error deleting project")
    }
})

// Handle contact form submission
app.post("/contact",async(req,res)=>{
    try{
        const{name,email,message}=req.body
        console.log("Contact message from:",name,"Email:",email,"Message:",message)
        res.render("contact",{success:"Thank you for your message! I will get back to you soon."})
    }
    catch(err){
        console.log("Error:",err)
        res.render("contact",{error:"Error sending message"})
    }
})

// Signup page
app.get("/signup",(req,res)=>{
    res.render("signup")
})

// Signup
app.post("/signup",async(req,res)=>{
    try{
        const{username,email,password,passwordConfirm}=req.body
        if(!username||!email||!password||!passwordConfirm){
            return res.render("signup",{message:"Please provide all values"})
        }
        if(password!==passwordConfirm){
            return res.render("signup",{message:"Passwords do not match"})
        }
        const user=await User.findOne({email:email})
        if(user){
            return res.render("signup",{message:"Email already in use"})
        }
        const hashedPassword=await bcrypt.hash(password,8)
        const newUser=await User.create({
            username:username,
            email:email,
            password:hashedPassword
        })
        res.render("signup",{message:"User registered successfully! Please login."})
    }
    catch(err){
        console.log("Error:",err)
        res.render("signup",{message:"Error registering user"})
    }
})

// Login page
app.get("/login",(req,res)=>{
    res.render("login")
})

// Login
app.post("/login",async(req,res)=>{
    try{
        const{email,password}=req.body
        if(!email||!password){
            return res.render("login",{message:"Please provide email and password"})
        }
        const user=await User.findOne({email:email})
        if(!user){
            return res.render("login",{message:"Email not found"})
        }
        const isPasswordMatch=await bcrypt.compare(password,user.password)
        if(!isPasswordMatch){
            return res.render("login",{message:"Incorrect password"})
        }
        res.render("profile",{user:user})
    }
    catch(err){
        console.log("Error:",err)
        res.render("login",{message:"Error logging in"})
    }
})

// Profile page
app.get("/profile/:id",async(req,res)=>{
    try{
        const user=await User.findById(req.params.id)
        if(!user){
            return res.status(404).send("User not found")
        }
        res.render("profile",{user:user})
    }
    catch(err){
        console.log("Error:",err)
        res.send("Error fetching profile")
    }
})

// Update profile
app.post("/profile/:id",async(req,res)=>{
    try{
        const{name,bio}=req.body
        await User.findByIdAndUpdate(req.params.id,{name:name,bio:bio})
        const user=await User.findById(req.params.id)
        res.render("profile",{user:user,message:"Profile updated successfully!"})
    }
    catch(err){
        console.log("Error:",err)
        res.render("profile",{message:"Error updating profile"})
    }
})

const PORT = process.env.PORT || 3000
app.listen(PORT,()=>{
    console.log(`Portfolio server listening on port ${PORT}`)
})
