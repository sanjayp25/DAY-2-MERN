const http = require("http");
const port = 4000;


http.createServer().listen(port,()=>{
 console.log(`Server is running on port ${port}`);

});

