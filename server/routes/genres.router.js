const express = require("express");
const router = express.Router();
const pool = require("../modules/pool");

// Setup a GET route to get all the songs from the database
router.get("/", (req, res) => {
  // When you fetch all things in these GET routes, strongly encourage ORDER BY
  // so that things always come back in a consistent order
  const queryText = `SELECT * FROM movies ORDER BY title, ASC;`;
  pool
    .query(queryText)
    .then((result) => {
      console.log(`Got stuff back from the database`, result);
      res.send(result.rows);
    })
    .catch((error) => {
      console.log(`Error making database query ${queryText}`, error);
      res.sendStatus(500); // Good server always responds
    });
});

// POST ROUTE for saving a genre
// router.post("/", (req, res) => {
//   const dataSentFromClient = req.body;

//   const queryText = `INSERT INTO "genres" ("rank", "track", "artist", "published")
//     VALUES ($1, $2, $3, $4);`;

//   pool
//     .query(queryText, [
//       dataSentFromClient.rank,
//       dataSentFromClient.track,
//       dataSentFromClient.artist,
//       dataSentFromClient.published,
//     ])
//     .then(responseDb => {
//       console.log(responseDb);
//       res.sendStatus(201);
//     })
//     .catch(err => {
//       console.log("ERROR:", err);
//       res.sendStatus(500);
//     });
// });

// router.get("/dogs", (req, res) => {
//   res.send("Woof!");
// });

module.exports = router;
