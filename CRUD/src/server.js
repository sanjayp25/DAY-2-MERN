const express=require("express")
const Portfolio=require("./mongo")
const app=express()
const path=require("path")
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

const PORT = process.env.PORT || 3000
app.listen(PORT,()=>{
    console.log(`Portfolio server listening on port ${PORT}`)
})
