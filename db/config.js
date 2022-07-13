const mysql = require("mysql");
const util = require("util")

const pool = mysql.createPool({
    host: process.env.db_host,
    database: process.env.db_name,
    user: process.env.db_user
});

pool.getConnection((err) => {
    err? console.warn("No Connection", {"Error": err.message}) : console.log("Established Connection...")
});

pool.query = util.promisify(pool.query);

module.exports = pool