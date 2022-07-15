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
//get all Categories
router.get("/showAll", (req, res) => {
    pool.query("SELECT * FROM categories", (err, user_rows, fields) => {
        res.status(200)
        res.json(user_rows)
    })
})





//--------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------

//POST
//Create categories
router.post("/add", (req, res) => {

    pool.query("INSERT INTO categories (`type`, `nom_cat`) VALUES ( ?, ?)", [
        
        req.body.type,
        req.body.nom_cat,
        

     ], (err, rows, fields) => {
            console.log(err);
            res.status(200);
            res.json(rows);
        })
})



router.delete("/delete/:id_Catg", (req, res) => {

    pool.query("Delete from categories where id_Catg =?", [
        req.params.id
    ], (err, rows, fields) => {
        console.log(err);
        res.status(200);
        res.json(rows);
    })
})

    
module.exports = router;