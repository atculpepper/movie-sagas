const express = require("express");
const router = express.Router();
const pool = require("../modules/pool");

// // ------MOVIES ROUTES ----------//

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
      SET "title"=$1, "description"=$2
      WHERE "id" = $3;`;

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

router.get("/details/:id", (req, res) => {
  // get a single movies' data
  const queryString = `SELECT * FROM "movies" WHERE "id" = $1;`;
  const movieId = req.params.id;

  pool
    //what is happening here with [movieId] as a second argument to .query method ?
    .query(queryString, [movieId])
    .then((responseDb) => {
      res.send(responseDb.rows);
    })
    .catch((err) => {
      console.warn(err);
      res.sendStatus(500);
    });
});

router.get("/genres/:id", (req, res) => {
  // get a single movies' data
  const queryString = `SELECT "movies_genres".movies_id, "movies_genres".genres_id, "movies".title, "genres".name FROM "movies"
    JOIN "movies_genres" ON "movies".id = "movies_genres".movies_id
    JOIN "genres" ON "movies_genres".genres_id = "genres".id
    WHERE "movies".id = $1;`;
  const movieId = req.params.id;

  pool
    .query(queryString, [movieId])
    .then((responseDb) => {
      res.send(responseDb.rows);
    })
    .catch((err) => {
      console.warn(err);
      res.sendStatus(500);
    });
});

// //______GENRES ROUTES___________//
// //genres GET route
// router.get("/", (req, res) => {
//   const queryText = `SELECT * FROM "genres" ORDER BY "id" ASC;`;

//   pool
//     .query(queryText)
//     .then((response) => {
//       res.send(response.rows);
//     })
//     .catch((err) => {
//       res.sendStatus(500);
//     });
// });

// module.exports = router;
