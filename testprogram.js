const sqlite = require("sqlite3").verbose()
const fs = require('fs')

const path = "./users.db"

var db;

function initializeDatabase() {
  db = new sqlite.Database('./users.db', sqlite.OPEN_CREATE | sqlite.OPEN_READWRITE, (err) => {
    if (err)
        console.error(err);
  });
  
  var sql = `CREATE TABLE IF NOT EXISTS users(username PRIMARY KEY, password, level TEXT ONLY)`;
  db.run(sql);
}

function addUser(name, password, level) {
  var sql = `SELECT * FROM users WHERE username = '${name}'`;
  
  db.get(sql, [name], (err) => {
    if (err) {
        sql = `INSERT INTO users VALUES(?,?,?)`;
        db.run(sql, [name, password, level]);
    } else {
      console.log(`User already exists`);
    }
    return;
  });
}

initializeDatabase();

addUser("Joey", "Nuts", "Level 3")