const path =require('path');
const baseName = path.basename('C:\Arulsuriya\MERN Fullstack\Day 2\Nodejs\sample1.txt');
console.log(baseName);
const extensionname=path.extname('C:\Arulsuriya\MERN Fullstack\Day 2\Nodejs\sample1.txt');
console.log(extensionname);
const join = path.join("folder","subfolder","sample.txt");
console.log(join);
