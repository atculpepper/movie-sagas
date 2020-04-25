const express = require("express");
const router = express.Router();
const pool = require("../modules/pool");

// GET route to get all the movies from the database
router.get("/movies", (req, res) => {
  const queryText = `SELECT * FROM "movies" ORDER BY title ASC;`;
  pool
    .query(queryText)

    // .then(res => res.text())
    // .then(text =>console.log(text));
    .then((responseDB) => {
      const dbRows = responseDB.rows;
      console.table(dbRows);
      res.send(dbRows);
    })
    .catch((error) => {
      console.log(`Error making database query ${queryText}`, error);
      res.sendStatus(500);
    });
});

// Setup a POST route to add a new movie to the database
router.post("/movies", (req, res) => {
  const newMovie = req.body;
  const queryText = `INSERT INTO movies (title, poster, description) VALUES 
  ($1, $2, $3)`;
  // Let sql sanitize your inputs (NO Bobby Drop Tables here!)
  // the $1, $2, etc get substituted with the values from the array below

  //newMovie expected data structure:
  //   {
  //     title: '',
  //     poster: '',
  //     description: ''
  //   }
  pool
    .query(queryText, [newMovie.title, newMovie.poster, newMovie.description])
    .then((responseDB) => {
      console.log(`Added movie to the database`, responseDB);
      res.sendStatus(201);
    })
    .catch((error) => {
      console.log(`Error making database query ${queryText}`, error);
      res.sendStatus(500);
    });
});

module.exports = router;
