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

router.get("/details/:id", (req, res) => {
  const queryText = `SELECT "movies".title, "movies".description, "genres".name
  FROM "movies" JOIN "movies_genres" ON "movies".id = "movies_genres".movies_id 
          JOIN "genres" ON "movies_genres".genres_id = "genres".id 
          WHERE "movies".id = $1;`;
  pool
    .query(queryText, [req.params.id])

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

// route for updating movie data
router.put("/details/:id", (req, res) => {
  const itemId = req.params.id;

  const newMovieData = req.body;
  const queryText = `UPDATE "movies"
      SET "title"=$1, "poster"=$2, "description"=$3, 
      WHERE "id" = $4;`;

  pool
    .query(queryText, [
      newMovieData.title,
      newMovieData.poster,
      newMovieData.description,
      itemId,
    ])
    .then((responseDB) => {
      res.sendStatus(200);
      console.log("changed something in the database", responseDB);
    })
    .catch((err) => {
      console.log("Error updating movie:", err);
      res.sendStatus(500);
    });
});

module.exports = router;
