const Pool = require("pg").Pool;
// 'pg' expose une 'Pool' classe de connexion à la base de données.
const pool = new Pool({
// la variable "pool" est un objet Pool du module node-postgres qui représente une connexion à la base de données.
  user: "postgres",
  password: "1111",
  host: "localhost",
  port: 5432,
  database: "users",
});


module.exports = pool;


