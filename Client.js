const express = require("express");
const pool = require("./db");
const app = express();
const router = express.Router();

//create a new client
router.post("/addclient", async (req, res) => {
  try {
    const { user_id, img, nom, prenom, mail, add, tel } = req.body;
    let sql = `INSERT INTO client (user_id, img, nom, prenom, mail, add, tel) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *`;
    const newClient = await pool.query(sql, [
      user_id,
      img,
      nom,
      prenom,
      mail,
      add,
      tel,
    ]);
    res.json(newClient.rows[0]);
  } catch (error) {
    console.log(error.message);
  }
});

//get all clients
router.get("/clients/:user_id", async (req, res) => {
  try {
    const { user_id } = req.params;
    const sql = `SELECT * FROM client WHERE user_id = '${user_id}'`;
    const allclients = await pool.query(sql);

    res.json(allclients.rows);
  } catch (error) {
    console.log(error.message);
  }
});

//get a client
router.get("/getclient/:client_id", async (req, res) => {
  try {
    const { client_id } = req.params;
    let sql = `SELECT * FROM client WHERE client_id = '${client_id}'`;
    const newClient = await pool.query(sql);
    res.json(newClient.rows[0]);
  } catch (error) {
    console.log(error.message);
  }
});

//update a client
http: router.put("/updateclient/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const clientUpdate = req.body;
    let sql = `UPDATE client
    SET nom = '${clientUpdate.nom}', prenom ='${clientUpdate.prenom}', mail='${clientUpdate.mail}', add ='${clientUpdate.add}', tel = '${clientUpdate.tel}', img = '${clientUpdate.img}', user_id = '${clientUpdate.user_id}'
    WHERE client_id='${id}'`;

    const updateClient = await pool.query(sql);
    res.json("Client was updated");
  } catch (error) {
    console.log(error.message);
  }
});

//delete a client
router.delete("/deleteclient/:client_id", async (req, res) => {
  try {
    const { client_id } = req.params;
    let sql = `DELETE FROM client
    WHERE client_id='${client_id}' `;

    const deleteClient = await pool.query(sql);
    res.json("client was deleted");
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;
