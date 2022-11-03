const express = require("express"); //La première ligne référence / importe le module Express.
const app = express(); //La ligne suivante sert à instancier un serveur Express
const port = 5003;
const cors = require("cors");
const path = require("path");
const User = require("./User");

const Client = require("./Client");
const Product = require("./Product");
const DetailOrder = require("./Detailorder");
const GlobalOrder = require("./Globalorder");
const SocieteDetails = require("./societedetails");

app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })
);

const multer = require("multer");

app.use(express.json());

app.use("/", express.static(path.join("images")));

//***USER***//
app.use(User);

//***CLIENT***//
app.use(Client);

//***PRODUCT***//
app.use(Product);

//***detailOrder***//
app.use(DetailOrder);

//***globalOrder***//
app.use(GlobalOrder);

//***SOCIETE DETAILS ***///
app.use(SocieteDetails);

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
    //return res
    //.status(200)
    //.json(`${process.env.REACT_APP_API_URL}/` + originalname);
    return res.status(200).json("http://localhost:5003/" + originalname);
    //  return res.status(200).json("http://192.168.2.83:5003/" + originalname);
  }
);

app.listen(port, () => {
  console.log(`Server has started on port ${port}.`);
}); //Ce serveur est ensuite démarré et attend les requêtes arrivant sur le port. La fonction callback sert à afficher un message informatif lorsque le serveur est prêt à recevoir des requêtes.
