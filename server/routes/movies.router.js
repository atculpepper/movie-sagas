const express = require("express");
const router = express.Router();
const pool = require("../modules/pool");

// ------MOVIES ROUTES ----------//

// GET route to get all the movies from the database
router.get("/", (req, res) => {
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

// route for updating movie data
router.put("/edit/:id", (req, res) => {
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

//not sure if I will need this -- it is to get details with id as param
router.get("/details/:id", (req, res) => {
  const queryText = `SELECT "movies".id, "movies".title, "movies".description, "movies".poster, 
  array_agg(genres.name) as agg_genres_as_objects from movies JOIN 
  movies_genres on movies.id = movies_genres.movies_id JOIN genres on genres.id = movies_genres.genres_id 
  GROUP BY movies.id ORDER BY movies.id ASC;`;
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
      console.log(`Error making database query ${queryText1}`, error);
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

//______GENRES ROUTES___________//
//genres GET route
router.get("/", (req, res) => {
  const queryText = `SELECT * FROM "genres" ORDER BY "id" ASC;`;

  pool
    .query(queryText)
    .then((response) => {
      res.send(response.rows);
    })
    .catch((err) => {
      res.sendStatus(500);
    });
});

module.exports = router;
