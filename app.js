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



/////////////////////////////LogIn////////////////////////////
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

/////////////////////////////Users////////////////////////////
app.post('/setPermissions', (req,res)=>{
    const colname = req.body.colname;
    const userid=req.body.userid;
    const value=req.body.value;
    db.query(
        "UPDATE users SET ??= ? WHERE id=?",
        [colname,value,userid],
        (err,result)=>{
            if(err){
                res.send({err:err})
            }
        }
    )
    
});

app.get("/users",(req,res)=>{
    db.query(
        "SELECT* FROM users",
        (err,result)=>{
            if(err){
                res.send({err:err})
            }else{
                res.send(result);
            }
        }
    );

});

/////////////////userPage//////////////////////


app.post('/todolist', (req,res)=>{
    const colname = req.body.colname;
    const userid=req.body.userid;
    const value=req.body.value;
    db.query(
        "UPDATE todolist SET ??= ? WHERE id=?",
        [colname,value,userid],
        (err,result)=>{
            if(err){
                res.send({err:err})
            }
        }
    )
    
});
app.get("/userpage/:id",(req,res)=>{
    db.query("SELECT * FROM users WHERE id=?",
    [req.params.id],
    (err,result)=>{
        if(err) {
            res.send({err:err})
        }
        else{
            res.send(result)
        }
    }
    )
})

// app.post("/addTask", (req,res)=>{
//     const taskname = String(req.body.taskName)
//     const user_id = String(req.body.userid)
//     console.log(typeof taskName)
//     console.log(typeof user_id)
//     console.log(taskname + "****"+ user_id)
//     const sqlinsert = "INSERT INTO todolist (userid, taskname, check_task) VALUES ?,?,?";
//     db.query(sqlinsert,[user_id, taskname,'0'],
//     (err,result)=>{
//         if(err) {
//             console.log(err)
//             res.send({err:err})
//         }
//         else{
//             res.send(result)
//         }
//     }
//     )
// });


//todolist//
app.post('/addTask/:id', (req, res)=>{
    const task=req.body.task;
    const userid=req.params.id;
    const check_task=false; //?
    console.log(task, userid);

    const sqlInsert=
    "INSERT INTO todolist (id, task, check_task) VALUES ( ?, ? , ?)";
    db.query(sqlInsert, [userid, task, check_task],(err, result)=>{
        console.log(result);
    });

});

app.get("/userpage",(req,res)=>{
    db.query(
        "SELECT* FROM todolist",
        (err,result)=>{
            if(err){
                res.send({err:err})
            }else{
                res.send(result);
            }
        }
    );

});

//savecontacts//
app.post('/addContact', (req, res)=>{
    const name=req.body.name;
    const number=req.body.number;
    const userid=req.body.userid;

    const sqlInsert=
    "INSERT INTO savecontacts (id, name, number) VALUES ( ?, ?, ?)";
    db.query(sqlInsert, [userid, name, number],(err, result)=>{
        console.log(result);
    });

});

app.get("/userpage/savecontacts/test/:id",(req,res)=>{
    const userid=req.body.userid;
    db.query(
        "SELECT* FROM savecontacts",
        (err,result)=>{
            if(err){
                res.send({err:err})
            }else{
                res.send(result);
            }
        }
    );

});


app.delete("/delete/:id", (req, res)=>{
    const userid=req.params.id;

    db.query("DELETE FROM savecontacts WHERE id = ?", userid, (err, result) => {
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    });
});

//proscons//
app.post('/add', (req, res)=>{
    const pros=req.body.pros;
    const cons=req.body.cons;
    const userid=req.params.id;

    const sqlInsert=
    "INSERT INTO proscons (id, pros, cons) VALUES ( ?, ?, ?)";
    db.query(sqlInsert, [userid, pros, cons],(err, result)=>{
        console.log(result);
    });

});

app.get("/userpage/proscons/testt",(req,res)=>{
    db.query(
        "SELECT* FROM proscons",
        (err,result)=>{
            if(err){
                res.send({err:err})
            }else{
                res.send(result);
            }
        }
    );

});
