const e = require('express');
const exp =require('express');
console.log(exp);
const port =5000;
const app = exp();
app.use(exp.json())
let employees=[{
    "id":100,
    "empname":"arul",
    "empgmail":"arul@gmail.com",
    "empsalary":25000,
    "empdepartment":"developer",
    "empjoiningdate":"01-02-2020",
    "empeducation":"B.E",
    "empexperience":"2 years"
},{
    "id":101,
    "empname":"suriya",
    "empgmail":"suriya@gmail.com",
    "empsalary":30000,
    "empdepartment":"tester",
    "empjoiningdate":"15-06-2019",
    "empeducation":"B.Tech",
    "empexperience":"3 years"
},{
    "id":102,
    "empname":"kumar",
    "empgmail":"kumar@gmail.com",
    "empsalary":28000,
    "empdepartment":"designer",
    "empjoiningdate":"20-08-2021",
    "empeducation":"B.Sc",
    "empexperience":"1.5 years"
}]
// api to get all user
app.get('/employees',(req,res)=>{
    res.status(200).json(employees);
})
//get user by id
app.get('/employees/:id',(req,res)=>{
    const url_id=Number(req.params.id);
    const filtered_user = employees.find((user)=>user.id==url_id)
    if(!filtered_user){
        res.status(404).json({message:"Employee not found"});
    }
    // else{
    // res.status(500).json({message:"check the user id  not present", url_id});
    // }
    res.status(200).json({id:filtered_user.id,empname :filtered_user.empname, empgmail:filtered_user.empgmail,empsalary:filtered_user.empsalary,
    empdepartment:filtered_user.empdepartment,
    empjoiningdate:filtered_user.empjoiningdate,
    empeducation:filtered_user.empeducation,
    empexperience:filtered_user.empexperience});
});

//api to insert new user
app.post('/addemployee',(req,res)=>{
    const newUser={
        id:req.body.id,
        empname:req.body.empname,
        empgmail:req.body.empgmail,
        empsalary:req.body.empsalary,
        empdepartment:req.body.empdepartment,
        empjoiningdate:req.body.empjoiningdate,
        empeducation:req.body.empeducation,
        empexperience:req.body.empexperience    
    }
    employees.push(newUser);
    res.status(201).json({message:"New employee added successfully"});
})
// delete user by id
app.delete('/deleteemployee/:id',(req,res)=>{
    const delete_id = Number(req.params.id);
    const find_user = employees.find((user)=>user.id==delete_id)
    employees = employees.filter((user)=>user.id!=delete_id);
    if(!find_user){
        res.status(500).json({message:"employee not found"});
    }
    res.status(200).json(employees)
})
app.listen(port,()=>{
    console.log(`Server is running on port : http://localhost:${port}`);
});