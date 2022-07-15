const express = require('express')
const mysql = require('mysql')
var uuidv4 = require('uuid/v4')



const router = express.Router()

const pool = mysql.createPool({
    connectionLimit: 10,
    host: "localhost",
    user: "root",
    database: "myNode"
})

function getConnection(){
    return pool
}



//--------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------


//GET
//get all user 
router.get("/showAll", (req, res) => {
    pool.query("SELECT * FROM personne", (err, user_rows, fields) => {
        res.status(200)
        res.json(user_rows)
    })
})

//GET 
//get user by mail
router.get("/showByMail/:mailUser", (req, res) => {
    pool.query("SELECT * FROM personne WHERE MAIL_USER = ?",
    [req.params.mailUser]
    , (err, user_rows, fields) => {
        res.status(200)
        res.json(user_rows)
    })
})



//--------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------

//POST
//Create User
router.post("/add", (req, res) => {

    pool.query("INSERT INTO personne (`name`, `email`, `password`, `date`, `genre`, `XP`, `hobbies`) VALUES (?, ?, ?, ?, ?, ?, ?)", [
        
        req.body.name,
        req.body.email,
        req.body.password,
        req.body.date,
        req.body.genre,
        req.body.XP,
        req.body.hobbies

     ], (err, rows, fields) => {
            console.log(err);
            res.status(200);
            res.json(rows);
        })
})

//Post 
//SignIn
router.post("/Login", (req, res) => {
    pool.query("SELECT * FROM personne where mail = ? and password = ? ",
    [   req.body.email,
        req.body.password], (err, user_rows, fields) => {
        res.status(200)
        console.log(user_rows)
        res.json(user_rows[0])
    })
})



    
module.exports = router;