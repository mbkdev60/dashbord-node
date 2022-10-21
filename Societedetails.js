const express = require("express");
const pool = require("./db");
const router = express.Router();

//create a new sctedetails
router.post("/addsctedetails", async (req, res) => {
  try {
    const { user_id, nom, add, mail, tel, siret, logo } = req.body;
    let sql = `INSERT INTO sctedetails (user_id, nom, add, mail, tel, siret, logo) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *`;
    const newScte = await pool.query(sql, [
      user_id,
      nom,
      add,
      mail,
      tel,
      siret,
      logo,
    ]);
    res.json(newScte.rows[0]);
  } catch (error) {
    console.log(error.message);
  }
});

//get a sctedetails
router.get("/getsctedetails/:user_id", async (req, res) => {
  try {
    const { user_id } = req.params;
    let sql = `SELECT * FROM sctedetails WHERE user_id = '${user_id}'`;
    const newScte = await pool.query(sql);
    if (newScte.rows[0]) {
      res.json(newScte.rows[0]);
    } else {
      res.json("vide");
    }
  } catch (error) {
    console.log(error.message);
  }
});

//update a sctedetails
router.put("/updatesctedetails/:user_id", async (req, res) => {
  try {
    const { user_id } = req.params;
    const sctedetailsUpdate = req.body;
    // console.log("sctedetailsUpdate", sctedetailsUpdate);
    let sql = `UPDATE sctedetails
    SET nom = '${sctedetailsUpdate.nom}', add ='${sctedetailsUpdate.add}', mail='${sctedetailsUpdate.mail}', tel ='${sctedetailsUpdate.tel}', siret = '${sctedetailsUpdate.siret}', logo = '${sctedetailsUpdate.logo}', user_id = '${sctedetailsUpdate.user_id}'
    WHERE user_id='${user_id}'`;

    // console.log(sql);
    const updateSctedetails = await pool.query(sql);
    res.json("Sctedetails are updated");
  } catch (error) {
    console.log(error.message);
  }
});

//delete a sctedetails
router.delete("/deletesctedetails/:user_id", async (req, res) => {
  try {
    const { user_id } = req.params;
    let sql = `DELETE FROM sctedetails
    WHERE user_id='${user_id}' `;

    const deletesctedetails = await pool.query(sql);
    res.json("Sctedetails are deleted");
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;
