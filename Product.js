const express = require("express");
const pool = require("./db");
const router = express.Router();

//create a new product
router.post("/addproduct", async (req, res) => {
  try {
    const { user_id, nom, prix, image, description } = req.body;
    let sql = `INSERT INTO product (user_id, nom, prix, image, description) VALUES($1, $2, $3, $4, $5) RETURNING *`;
    const newProduct = await pool.query(sql, [
      user_id,
      nom,
      prix,
      image,
      description,
    ]);
    res.json(newProduct.rows[0]);
  } catch (error) {
    console.log(error.message);
  }
});

//get all products
router.get("/products/:user_id", async (req, res) => {
  try {
    const { user_id } = req.params;
    const sql = `SELECT * FROM product WHERE user_id = '${user_id}' `;
    const allproducts = await pool.query(sql);
    res.json(allproducts.rows);
  } catch (error) {
    console.log(error.message);
  }
});

//get a product
router.get("/getproduct/:product_id", async (req, res) => {
  try {
    const { product_id } = req.params;
    let sql = `SELECT * FROM product WHERE product_id = '${product_id}'`;
    const newProduct = await pool.query(sql);

    res.json(newProduct.rows[0]);
  } catch (error) {
    console.log(error.message);
  }
});

//update a product
router.put("/updateproduct/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const productUpdate = req.body;
    let sql = `UPDATE product
    SET  nom = '${productUpdate.nom}', prix ='${productUpdate.prix}', image='${productUpdate.image}', description='${productUpdate.description}', user_id=${productUpdate.user_id} 
    WHERE product_id='${id}'`;
    const updateProduct = await pool.query(sql);
    res.json("Product was updated");
  } catch (error) {
    console.log(error.message);
  }
});

//delete a product
router.delete("/deleteproduct/:product_id", async (req, res) => {
  try {
    const { product_id } = req.params;
    let sql = `DELETE FROM public.product
    WHERE product_id='${product_id}'`;

    const deleteProduct = await pool.query(sql);
    res.json("product was deleted");
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;
