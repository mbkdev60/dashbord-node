const express = require("express");
const app = express();
const port = 5003;
const cors = require("cors");
const pool = require("./db");
const path = require("path");

app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })
);

const multer = require("multer");
const { Console } = require("console");

const imageUpload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "images/");
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  }),
});

app.post(
  `/uploadImage`,
  imageUpload.array("imgCollection"),
  function (req, res) {
    const { originalname } = req.files[0];
    return res.status(200).json("http://192.168.2.83:5003/" + originalname);
  }
);

app.use(express.json());

app.use("/", express.static(path.join("images")));

//***USER***//

//create a new user
app.post("/adduser", async (req, res) => {
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
app.get("/users", async (req, res) => {
  try {
    const sql = `SELECT * FROM "user" `;
    const allusers = await pool.query(sql);
    res.json(allusers.rows);
  } catch (error) {
    console.log(error.message);
  }
});

//get a user
app.post("/getuser", async (req, res) => {
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
app.put("/updateuser", async (req, res) => {
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
app.delete("/deleteuser", async (req, res) => {
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

//***CLIENT***//

//create a new client
app.post("/addclient", async (req, res) => {
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
app.get("/clients/:user_id", async (req, res) => {
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
app.get("/getclient/:client_id", async (req, res) => {
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
http: app.put("/updateclient/:id", async (req, res) => {
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
app.delete("/deleteclient/:client_id", async (req, res) => {
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

//***PRODUCT***//

//create a new product
app.post("/addproduct", async (req, res) => {
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
app.get("/products/:user_id", async (req, res) => {
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
app.get("/getproduct/:product_id", async (req, res) => {
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
app.put("/updateproduct/:id", async (req, res) => {
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
app.delete("/deleteproduct/:product_id", async (req, res) => {
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

//***detailOrder***//

//create a new detailOrder
app.post("/adddetailorder", async (req, res) => {
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
app.get("/getdetailorder/:order_id", async (req, res) => {
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
app.put("/updatedetailorder/:id", async (req, res) => {
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
app.delete("/deletedetailorder/:detailorder_id", async (req, res) => {
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
//***globalOrder***//

//create a new globalOrder
app.post("/addglobalorder", async (req, res) => {
  try {
    const { user_id, client_id, dateorder, montanttotal, nomclient } = req.body;

    let sql = `INSERT INTO globalorder (user_id, nomclient, client_id, dateorder, montanttotal) VALUES($1, $2, $3, $4, $5) RETURNING *`;
    //console.log(sql);
    const newGlobalOrder = await pool.query(sql, [
      user_id,
      nomclient,
      client_id,
      dateorder,
      montanttotal,
    ]);
    res.json(newGlobalOrder.rows[0]);
  } catch (error) {
    console.log(error.message);
  }
});

//get allOrders
app.get("/getglobalOrder/:user_id", async (req, res) => {
  const { user_id } = req.params;
  try {
    let sql = `SELECT  order_id, user_id , nomclient, client_id, montanttotal ,  TO_CHAR(dateorder, 'YYYY-MM-DD')  as dateorder  FROM globalorder
		
		where user_id='${user_id}'
		`;
    const newGlobalorder = await pool.query(sql);

    res.json(newGlobalorder.rows);
  } catch (error) {
    console.log(error.message);
  }
});

//update a globalOrder
app.put("/updateglobalorder/id", async (req, res) => {
  try {
    const { id } = req.params;
    const globalOrderUpdate = req.body;
    let sql = `UPDATE globalorder
    	SET user_id = '${globalOrderUpdate.user_id}', nomclient = '${globalOrderUpdate.nomclient}, client_id='${globalOrderUpdate.client_id}', dateorder ='${globalOrderUpdate.dateorder}', montanttotal='${globalOrderUpdate.montanttotal}'
		WHERE order_id='${id}'`;

    const updateGlobalOrder = await pool.query(sql);
    res.json("Order was updated");
  } catch (error) {
    console.log(error.message);
  }
});

//***SOCIETE DETAILS ***///
//create a new sctedetails
app.post("/addsctedetails", async (req, res) => {
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
app.get("/getsctedetails/:user_id", async (req, res) => {
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
app.put("/updatesctedetails/:user_id", async (req, res) => {
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
app.delete("/deletesctedetails/:user_id", async (req, res) => {
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

app.listen(port, () => {
  console.log(`Server has started on port ${port}.`);
});
