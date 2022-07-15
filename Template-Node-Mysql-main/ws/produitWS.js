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
//get all produit
router.get("/showAll", (req, res) => {
    pool.query("SELECT * FROM produits", (err, user_rows, fields) => {
        res.status(200)
        res.json(user_rows)
    })
})


//--------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------

//POST
//Create produits
router.post("/add", (req, res) => {

    pool.query("INSERT INTO produits (`nom_prod`, `reference_prod`, `description`, `prix`,  `quantite`) VALUES (?,?,?,?,?)", [
        
        req.body.nom_prod,
        req.body.reference_prod,
        req.body.description,
        req.body.prix,
        req.body.quantite,
       

        

     ], (err, rows, fields) => {
            console.log(err);
            res.status(200);
            res.json(rows);
        })
})



router.delete("/delete/:id_prod", (req, res) => {

    pool.query("Delete from produits where id_prod =?", [
        req.params.id
    ], (err, rows, fields) => {
        console.log(err);
        res.status(200);
        res.json(rows);
    })
})


//Update reservation
router.put("/update/:id", (req, res) => {

    pool.query("UPDATE `produits` SET `nom_prod`= ?,`reference_prod`= ?  , `description` =? ,`prix`= ? ,  `quantite`=?  WHERE `id_prod`= ?", [

        req.body.nom_prod,
        req.body.reference_prod,
        req.body.description,
        req.body.prix,
        req.body.quantite,
       



    ], (err, rows, fields) => {
        console.log(err);
        res.status(200);
        res.json(rows);
    })
})


    
module.exports = router;