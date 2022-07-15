const express = require('express')
const mysql = require('mysql')
var uuidv4 = require('uuid/v4')



const router = express.Router()

const pool = mysql.createPool({
    connectionLimit: 10,
    host: "localhost",
    user: "root",
    database: "premia_sports"
})

function getConnection(){
    return pool
}



//--------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------

    //GET
//get all Reclamation
router.get("/showAll", (req, res) => {
    pool.query("SELECT * FROM reclamation", (err, user_rows, fields) => {
        res.status(200)
        res.json(user_rows)
    })
})





//--------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------

//POST
//Create categories
router.post("/add", (req, res) => {

    pool.query("INSERT INTO reclamation ( `sujet`, `description`, `statut`) VALUES ( ?, ?,?)", [
        
        req.body.sujet,
        req.body.description,
     
        req.body.statut,
        

     ], (err, rows, fields) => {
            console.log(err);
            res.status(200);
            res.json(rows);
        })
})


//unpdate 

router.delete("/removeReclamation/", (req, res) => {

    pool.query("Delete from reclamation where id =?", [
        req.params.id
    ], (err, rows, fields) => {
        console.log(err);
        res.status(200);
        res.json(rows);
    })
})
module.exports = router;