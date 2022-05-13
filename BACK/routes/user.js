// Permet d'importer express
const express = require("express");

// Crée un routeur
const router = express.Router();

// Permet d'importer le controller utilisateurs
const userCtrl = require("../controllers/user");

// Permet d'importer le middleware auth
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

// Création d'un utilisateur OK
router.post("/register/", userCtrl.register);

// Connection d'un utilisateur enregistré OK
router.post("/login/", userCtrl.login);

// Connection de l'utilisateur en cours de login pour vérifier la validité du token et récupérer ses données
router.get("/me", auth, userCtrl.getMyDatas);

// Déconnection de l'utilisateur
router.post("/logout", auth, userCtrl.logout);

// Trouver Un utilisateur par son id OK
router.get("/getUser/:id", userCtrl.getOneUserById);

// Modifier les données utilisateur
router.put("/:id", multer,userCtrl.updateUser);

// Effacer un utilisateur (Admin)
router.delete("/delete/:id", userCtrl.deleteUser);

module.exports = router;
