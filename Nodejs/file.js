const fs = require("fs");
// fs.writeFile("sample1.txt"," Node.js", (err) => {
//     console.log(err);
//     console.log("File created successfully");
// })
fs.appendFile("sample1.txt"," Hello eveyone", (err) => {
   console.log(err);
   console.log("File appended successfully");
});

// fs.unlink("sample.txt",(err)=>{
//     if(err) throw err;
//     else console.log("File deleted successfully");
// })

fs.readFile("sample1.txt","utf-8",(err,data)=>{
    if(err) console.log(err);
    else console.log(data);
})