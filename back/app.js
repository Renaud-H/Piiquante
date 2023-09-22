const express = require("express");
const mongoose = require("mongoose");

//const Sauce = require('./models/sauces');

// Import de la route user
const userRoutes = require("./routes/user");

// Connexion à MongoDB
mongoose
  .connect(
    "mongodb+srv://db_username:db_password@cluster0.9ifi9zx.mongodb.net/piiquante?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
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


app.use('/api/auth', userRoutes)

// Export de l'appli
module.exports = app;
