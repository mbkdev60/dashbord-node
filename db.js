const Pool = require("pg").Pool;

const pool = new Pool({
  //la variable "pool" est un objet Pool du module node-postgres qui représente une connexion à la base de données.
  user: "postgres",
  password: "1111",
  host: "localhost",
  port: 5432,
  database: "users",
});


module.exports = pool;


