const express = require("express");
const mongoose = require("mongoose");
const path = require('path');


// Import de la route sauce & user
const sauceRoutes = require('./routes/sauce');
const userRoutes = require("./routes/user");

// Connexion à MongoDB
mongoose
  .connect(
    "mongodb+srv://db_username:db_password@cluster0.9ifi9zx.mongodb.net/piiquante?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true } //process.env.[DB_info token]
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

// Initialisation de l'application Express
const app = express();

// Gestion des requêtes - CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
  next();
});

// Temporaire
app.use((req, res, next) => {
  console.log('Requête reçue !');
  next();
});
app.use((req, res, next) => {
  res.status(201);
  next();
});
app.use((req, res, next) => {
  res.json({ message: 'Votre requête a bien été reçue !' });
  next();
});
app.use((req, res, next) => {
  console.log('Réponse envoyée avec succès !');
});
// Fin de temporaire

// Bodyparser
app.use(express.json());

// Configuration des routes
app.use('/api/sauces', sauceRoutes);
app.use('/api/auth', userRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')));


// Export de l'appli
module.exports = app;
