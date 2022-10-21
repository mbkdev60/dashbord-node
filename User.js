const express = require("express");
const pool = require("./db");
const router = express.Router();

router.post("/adduser", async (req, res) => {
  try {
    const { mail, mdp, nom, prenom, img } = req.body;
    let sql = `INSERT INTO "user" (mail, mdp, nom, prenom ,img) VALUES($1, $2, $3, $4,$5) RETURNING *`;
    const newUser = await pool.query(sql, [mail, mdp, nom, prenom, img]);
    res.json(newUser.rows[0]);
  } catch (error) {
    console.log(error.message);
  }
});

//get all users
router.get("/users", async (req, res) => {
  try {
    const sql = `SELECT * FROM "user" `;
    const allusers = await pool.query(sql);
    res.json(allusers.rows);
  } catch (error) {
    console.log(error.message);
  }
});

//get a user
router.post("/getuser", async (req, res) => {
  try {
    const { mail, mdp } = req.body;
    let sql = `SELECT * FROM "user" WHERE mail = '${mail}' and mdp ='${mdp}' `;
    const newUser = await pool.query(sql);
    if (newUser.rows[0]) {
      res.json(newUser.rows[0]);
    } else {
      res.json("vide");
    }
  } catch (error) {
    console.log(error.message);
  }
});

//update a user
router.put("/updateuser", async (req, res) => {
  try {
    const { mail, mdp, nom, prenom, img } = req.body;
    let sql = `UPDATE "user"
    SET mail ='${mail}', mdp ='${mdp}', nom ='${nom}', prenom ='${prenom}', img='${img}'
    WHERE mail='${mail}'`;

    const updateUser = await pool.query(sql);
    res.json("User was updated");
  } catch (error) {
    console.log(error.message);
  }
});

//delete a user
router.delete("/deleteuser", async (req, res) => {
  try {
    const { mail } = req.body;
    let sql = `DELETE FROM public.user
    WHERE mail='${mail}'`;

    const deleteUser = await pool.query(sql);
    res.json("user was deleted");
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;
