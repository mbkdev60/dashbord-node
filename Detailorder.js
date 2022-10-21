const express = require("express");
const pool = require("./db");
const router = express.Router();

//create a new detailOrder
router.post("/adddetailorder", async (req, res) => {
  try {
    const { order_id, nom, prixunitaire, image, quantite, prixtotal } =
      req.body;
    let sql = `INSERT INTO detailorder (order_id, nom, prixunitaire, image, quantite, prixtotal) VALUES($1, $2, $3, $4, $5, $6) RETURNING *`;
    // console.log(sql);
    const newDetailOrder = await pool.query(sql, [
      order_id,
      nom,
      prixunitaire,
      image,
      quantite,
      prixtotal,
    ]);
    res.json(newDetailOrder.rows[0]);
  } catch (error) {
    console.log(error.message);
  }
});

//get a detailOrder
router.get("/getdetailorder/:order_id", async (req, res) => {
  try {
    const { order_id } = req.params;
    const sql = `SELECT * FROM detailorder WHERE order_id = '${order_id}' `;
    const allDetaiOrders = await pool.query(sql);
    res.json(allDetaiOrders.rows);
  } catch (error) {
    console.log(error.message);
  }
});

//update a detailOrder
router.put("/updatedetailorder/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const detailOrderUpdate = req.body;
    let sql = `UPDATE detailorder
    SET  order_id ='${detailOrderUpdate.order_id}', nom='${detailOrderUpdate.nom}', prixunitaire=${detailOrderUpdate.prixunitaire}, image='${detailOrderUpdate.image}', quantite='${detailOrderUpdate.quantite}', prixtotal='${detailOrderUpdate.prixtotal}' 
    WHERE order_id='${id}'`;
    const updatedetailorder = await pool.query(sql);
    res.json("Detailorder was updated");
  } catch (error) {
    console.log(error.message);
  }
});

//delete a detailOrder
router.delete("/deletedetailorder/:detailorder_id", async (req, res) => {
  try {
    const { detailorder_id } = req.params;
    let sql = `DELETE FROM public.detailorder
    WHERE detailorder_id='${detailorder_id}'`;

    const deleteDetailOrder = await pool.query(sql);
    res.json("detailOrder was deleted");
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;
