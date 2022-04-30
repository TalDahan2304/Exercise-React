const dotenv=require('dotenv').config();
const express= require('express');
const mysql=require("mysql");
const cors=require("cors");

const app= express();

app.use(express.json());
app.use(cors());

const db=mysql.createConnection({
    user:"root",
    host:"localhost",
    password:"mysqlpassword",
    database:"pieratedb",
});

const port = process.env.PORT;

const indexRouter= require('./routes/index');
app.use('/',indexRouter);

app.listen(port, ()=>{
    console.log('server is running on port ' + port);
});



/////AdminLogIn///////
app.post('/LogIn', (req,res)=>{
    const username=req.body.username;
    const password=req.body.password;

    db.query(
        "SELECT * FROM adminlogin WHERE username = ? AND password = ?",
        [username,password],
        (err,result)=>{
            if(err){
                res.send({err:err})
            }
            if(result.length>0){
                console.log(result)
                res.send(result);
            }else{
                res.send({message: "Wrong username/Password combination!"})
            } 
        }
    );
});



/////Users/////
