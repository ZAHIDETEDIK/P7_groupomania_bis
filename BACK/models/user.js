
const express = require('express');
const mysql = require ('mysql');
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});
// Constructeur
const User = function(user) {
    this.pseudo = user.pseudo,
    this.email = user.email,
    this.imageProfile= user.imageProfile,
    this.password = user.password, 
    this.username = user.username, 
    this.isAdmin= 0
};

//Création d'un utilisateur 
User.create = (newUser, result) => {
    let sql = `INSERT INTO groupomania.user (email,password, pseudo,isAdmin) Values('${newUser.email}','${newUser.password}','${newUser.pseudo}','${newUser.isAdmin}');`;
    console.log(sql);
   var query= db.query (
        sql
     ,function
        (err, res){ 
            console.log(query);
            if (err) {
                console.log('perdu' + err);
            
                
            }
            else{ 
            console.log('gagné');
            result(null, {id: res.id, ...newUser});
        }
    })
        
    }




//Supprimer un utilisateur (user ou admin) 
User.deleteOne =(userId,result) => {
    let sql = `DELETE FROM groupomania.user WHERE id=${userId};`
    console.log(sql);
    var query =  db.query( sql,
      function
      (err, res){ 
          if (err) {
              console.log(query); 
          }
          else{ 
            console.log(query);
          result(null,res[0]);
      }; 
      
        });
    }

        
         

//Trouver un user par son id (rôle admmin) 
User.findById =  (userId,result) => {
    
    let sql = `SELECT * FROM groupomania.user WHERE id=${userId};`
    console.log(sql);
    var query =  db.query( sql,
      function
      (err, res){ 
          if (err) {
              console.log(query);
          
              
          }
          else{ 
          console.log('gagné');
          result(null,res[0]);
      }; 
      
        })
    }

//Trouver un utilisateur (login) 
User.findOne = (email,result) =>{
  let sql = `SELECT * FROM groupomania.user WHERE email='${email}';`
  console.log(sql);
  var query =  db.query( sql,
    function
    (err, res){ 
        if (err) {
            console.log(query);
        
            
        }
        else{ 
        console.log('gagné');
        result(null,res[0]);
    };
})
}


//Trouver tous les utilisateurs (admin) 
User.findAll = function getAllUsers (userId,user) {
    let sql = `SELECT * FROM groupomania.user pseudo="${user.pseudo}", email="${user.email}", imageProfile="${user.imageProfile}", isAdmin="${user.isAdmin}" WHERE id=${userId};`
        var query =  db.query (sql,
            function(err,res){ 

        if (err) {
            result(err, null);
            console.log(query);
        } else {
            result(null, res);
            console.log(query);
        }
    });
}


//Mettre a jour les données d'un utilisateur
User.updateOne = (userId, user) => {
    return new Promise((resolve, reject) => {
        
        let sql=`UPDATE groupomania.user pseudo="${user.pseudo}", email="${user.email}", imageProfile="${user.imageProfile}", isAdmin="${user.isAdmin}" WHERE id=${userId};`
        var query =  db.query (sql,  
        function
             (error, result) {
                if (error) {
                    reject (error);
                    console.log(query);
                } else {
                    resolve (result);
                    console.log("Utilisateur " + {id: userId } + " modifié avec succès !");
                }
            }
        )
    })
};

module.exports = User;