const { faker } = require('@faker-js/faker');
const mysql = require("mysql2");
const express = require("express");
const app = express();
const path = require("path");
const { count } = require('console');

app.set("view engine","ejs")
app.set("views",path.join(__dirname,"/views"));

const connection =  mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'college',
    password: 'Ankit1@#$'
  });
  

app.listen("8080",()=>{
    console.log(`listening on port: 8080`);
})

app.get("/",(req,res)=>{
    let q = "select count(*) from user";
    try {
    connection.query(q ,(err,result)=>{
        if(err) throw err;
        let count = (result[0]["count(*)"]);    
        res.render("home.ejs",{ count })        
    })
    } catch (err) {
    console.log(err);
    res.send("some error ocurr");
}

connection.end();
})


app.get("/user",(req,res)=>{
    let q = "select * from user";
    try {
    connection.query(q ,(err,result)=>{
        if(err) throw err;
        // console.log(result); 
        res.render("user.ejs",{result});     
    })
    } catch (err) {
    console.log(err);
    res.send("some error ocurr");
}

// connection.end();
})


app.get("/user/:uuid/edit",(req,res)=>{
    let {uuid} = req.params;
    let q = `select * from user where uuid='${uuid}'`;
    try {
    connection.query(q ,(err,result)=>{
        if(err) throw err;
        console.log(result); 
        // res.send("ok")
        res.render("edit.ejs");
    })
    } catch (err) {
    console.log(err);
    res.send("some error ocurr");
}
});





















// let q = "INSERT INTO user (id , name ,  city) values (? ,? ,?)";
// let n= [71,"rahul" ,"delhi" ];



// try {
//     connection.query("SHOW TABLES",(err,result)=>{
//         if(err) throw err;
//         console.log(result);            
//     })
// } catch (err) {
//     console.log(err);
// }


// let q = "INSERT INTO user (uuid ,username ,  email) values ?";


// let getUser = ()=>{
//     return[
//          faker.string.uuid(),
//          faker.internet.userName(),
//          faker.internet.email(),
//     ]
// } ;

// let data=[];
// for(let i=0;i<=100;i++){
//     data.push(getUser());
// }

// try {
//     connection.query(q ,[data],(err,result)=>{
//         if(err) throw err;
//         console.log(result);            
//     })
// } catch (err) {
//     console.log(err);
// }

// connection.end();






// let getUser = ()=>{
//     return{
//         id : faker.string.uuid(),
//         username: faker.internet.userName(),
//         email: faker.internet.email(),
//         password: faker.internet.password(),
//     }
// } ;

// console.log(getUser());


