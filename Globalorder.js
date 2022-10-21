const express = require("express");
const pool = require("./db");
const router = express.Router();

//create a new globalOrder
router.post("/addglobalorder", async (req, res) => {
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
router.get("/getglobalOrder/:user_id", async (req, res) => {
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
router.put("/updateglobalorder/id", async (req, res) => {
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
// total commande
router.get("/Totalcmd/:id", async (req, res) => {
  try {
    const { id } = req.params;

    let sql = `SELECT SUM(montanttotal)
          FROM globalorder
	      where user_id='${id}'`;

    const Somme = await pool.query(sql);
    res.json(Somme.rows[0].sum);
  } catch (error) {
    console.log(error.message);
  }
});

//top client
router.get("/Topclient/:id", async (req, res) => {
  try {
    const { id } = req.params;

    let sql = `

    SELECT  sum(o.montanttotal), o.client_id, o.nomclient ,c.img ,c.prenom
	FROM public.globalorder o , public.client c 
  where o.user_id ='${id}'  and  o.client_id =c.client_id
	GROUP BY o.order_id ,o.client_id  ,c.img , c.prenom 
	order by   sum(o.montanttotal) DESC
	limit 3

  
`;

    const listclient = await pool.query(sql);
    res.json(listclient.rows);
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;