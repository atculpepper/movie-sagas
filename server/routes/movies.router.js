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
      SET "title"=$1, "poster"=$2, "description"=$3 
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

//not sure if I will need this -- it is to get details that INCLUDE genres with id as param
router.get("/details/:id", (req, res) => {
  const detailsToGet = req.params.id;
  const queryText = `SELECT "movies".id, "movies".title, "movies".description, "movies".poster,
  array_agg("genres".name) as agg_genres_as_objects
  FROM "movies" JOIN "movies_genres" on "movies".id = "movies_genres".movies_id
  JOIN "genres" on "genres".id = "movies_genres".genres_id
  WHERE "movies".id = $1 GROUP BY "movies".id;`;
  pool
    .query(queryText, [detailsToGet])

    // .then(res => res.text())
    // .then(text =>console.log(text));
    .then((responseDB) => {
      const dbRows = responseDB.rows;
      console.table(`${detailsToGet}`, dbRows);
      res.send(dbRows);
    })
    .catch((error) => {
      console.log(`Error making database query ${queryText}`, error);
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
