const { response } = require("express");
const mysql = require("mysql");

// Adatbázis kapcsolódás létrehozása
const con = mysql.createConnection({
  host: "localhost",
  user: "root", // felhasználónév
  password: "", // jelszó
  database: "householddnd", // adatbázis neve
});

// Modell definiálása
const taskDAO = {
  create: (title, exp, description, tutorials) => {
    return new Promise((resolve, reject) => {
      const query = `INSERT INTO task (title, exp, description, tutorials) VALUES (?, ?, ?, ?)`;
      console.log(title);
      const tutorialsJSON = JSON.stringify(tutorials); // Átalakítjuk a tutorials adatot JSON stringgé
      con.query(
        query,
        [title, exp, description, tutorialsJSON],
        (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        }
      );
    });
  },

  findAll: () => {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM task`;
      con.query(query, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  },

  findById: (id) => {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM task WHERE id = ?`;
      con.query(query, [id], (err, result) => {
        if (err) {
          reject(err);
        } else {
          const task = result[0];
          // ha már van adat
          if (task) {
            task.tutorials = JSON.parse(task.tutorials); // Átalakítjuk a tutorials mezőt JSON-re
            resolve(task);
          } else {
            resolve(null);
          }
        }
      });
    });
  },

  findByTaskIds: (ids) => {
    return new Promise((resolve, reject) => {
      const tasks = [];
      let completed = 0; // Számláló a befejezett lekérdezések számára

      ids.forEach((i) => {
        const query = "SELECT * FROM task WHERE id = (?)";
        con.query(query, [i], function (error, result) {
          if (error) {
            reject(error);
            return;
          }
          tasks.push(result[0]);
          completed++;

          // Ellenőrizzük, hogy minden lekérdezés befejeződött-e
          if (completed === ids.length) {
            resolve(tasks); // Ha minden lekérdezés befejeződött, visszatérünk az eredménnyel
          }
        });
      });
    });
  },
  findByIdAndUpdate: (id, data) => {
    return new Promise((resolve, reject) => {
      const query = `UPDATE task SET title = ?, exp = ?, description = ?, tutorials = ? WHERE id = ?`;
      con.query(
        query,
        [
          data.title,
          data.exp,
          data.description,
          JSON.stringify(data.tutorials),
          id,
        ],
        (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        }
      );
    });
  },
};

module.exports = taskDAO;
