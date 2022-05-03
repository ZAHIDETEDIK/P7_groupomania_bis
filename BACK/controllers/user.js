const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mysql = require('mysql');
require ('dotenv').config


// Importer l'utilisateur
const User = require('../models/user');

// Inscription de l'utilisateur
exports.register = (req, res) => {
    bcrypt.hash(req.body.password, 5)
    .then(hash => {
        const user = new User({
            pseudo: req.body.pseudo,
            email: req.body.email,
            imageProfile: req.body.imageProfile,
            password: hash,
            isAdmin: req.body.isAdmin,
            
        })
        User.create(user, (err, data) => {
            if (err) {
                if (err.code == 'ER_DUP_ENTRY') {
                    return res.status(401).json({ error: 'Cet utilisateur existe déjà' });
                }
            }
            res.send(data);
            console.log(data + 'Compte créé !');
        });
    })
    .catch(error => res.status(500).json( error + ' Salut les gens' ));
};
       

    // Permet à un utilisateur de se connecter
    exports.login = (req, res) => {
        User.findOne(req.body.email, (err, data) => {
            console.log(data);
           // console.log(data.email);
            console.log(req.body.password);
            if(!data){
                console.log('user pas trouvé')
                return res.status(401).json({error: 'utilisateur non trouvé'});
            }
            bcrypt.compare(req.body.password, data.password)
            .then(isValid => {
                console.log(isValid)
                if(!isValid){
                    return res.status(401).json({error: 'mot de passe incorrect'});
                
                } else{ 
                    res.status(200).json({
                        userId: data.id,
                        token: jwt.sign({ userId: 'userId' }, 
                        'RANDOM_TOKEN_SECRET', { expiresIn: 60 * 60 })
                    });     
            
                }})
        
    
    .catch(error => res.status(500).json({ error: '⚠ Oops, une erreur s\'est produite !' }))
});
 };

 //Vérification de token au login
exports.getMyDatas = (req, res) => {
let token = req.headers.authorization.split(' ')[1];
let decodedToken = jwt.verify(token, 'RAMDOM_TOKEN_SECRET');
let id = JSON.parse(decodedToken.id);
User.findById(id)
    .then(user => res.status(200).json(user))
    .catch(error => res.status(404).json({ error }));

}
exports.getUserProfile = (req, res, next) => {
    const id = req.params.id;
    User.findOne(id)
    
    .then(user => {
        if(user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ error: 'Utilisateur non trouvé' })
        }
    })
    .catch(error => res.status(404).json({ error: '⚠ Oops, une erreur s\'est produite !' }));
}

// Déconnection de l'utilisateur
exports.logout = (req, res) => {
    console.log(req.body);
    res.status(200).json({
        message: 'ok'
    });
}

// Modifications des données utilisateur
exports.updateUser = (req, res) => {
    let user = (req.body);
    let userId = req.params.userId;
    console.log(userId + " " + user);
    User.updateOne(userId, user)
    .then(() => res.status(200).json({ message: 'Utilisateur modifié !'}))
    .catch(error => res.status(404).json({ error }));
}

// Trouver Un utilisateur par son id OK
exports.getOneUserById = (req, res) => {
    User.findById(req.params.id)
    .then(user => res.status(200).json(user))
    .catch(error => res.status(404).json({ error }));
};

// Trouver tous les utilisateurs (rôle admin) OK
exports.getAllUsers = (req, res) => {
    User.findAll((err, data) => {
        if(err) {
            res.status(500).send({
                message: err.message || "des erreurs se sont produites",
            });
            console.log("Pas d'utilisateur !")
        }
        console.log('On a tout le monde');
        res.send(data);
    });
};


// Suppression d'un utilisateur (rôle admin) OK
exports.deleteUser = (req, res) => {
    let userId = req.params.userId;
    console.log(userId);
    User.deleteOne(req.params.userId)
        .then(() => res.status(200).json({ message: 'Utilisateur supprimé !'}))
        .catch(error => res.status(404).json ({ error }));

}
   
