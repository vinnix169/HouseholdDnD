const mysql = require("mysql");

// Adatbázis kapcsolódás létrehozása
const con = mysql.createConnection({
  host: "localhost",
  user: "root", // felhasználónév
  password: "", // jelszó
  database: "householddnd", // adatbázis neve
});

// Modell definiálása
const userDAO = {
  create: (name, password, exp, lvl, taskToday, pfp) => {
    return new Promise((resolve, reject) => {
      const query = `INSERT INTO user (name, password, exp, lvl, taskToday, pfp) VALUES (?, ?, ?, ?, ?, ?)`;
      con.query(
        query,
        [name, password, exp, lvl, JSON.stringify(taskToday), pfp],
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
      const query = `SELECT * FROM user`;
      con.query(query, (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    });
  },

  findById: (id) => {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM user WHERE id = ?`;
      con.query(query, [id], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result[0]);
        }
      });
    });
  },

  findByName: (name) => {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM user WHERE name = ?";
      con.query(query, [name], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result[0] || null);
        }
      });
    });
  },

  findOneByName: (name) => {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM user WHERE name = ?`;
      con.query(query, [name], (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res[0]);
        }
      });
    });
  },

  updateTaskToday: (userData) => {
    return new Promise((resolve, reject) => {
      const query = `UPDATE user SET name = ?, password = ?, exp = ?, lvl = ?, taskToday = ?, pfp = ? WHERE id = ?`;

      const { name, password, exp, lvl, taskToday, pfp, id } = userData;
      const taskTodayJson = JSON.stringify(taskToday); // JSON stringgé alakítjuk a taskToday-t

      con.query(
        query,
        [name, password, exp, lvl, taskTodayJson, pfp, id], // JSON stringet adunk át a taskToday helyett
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

  updateLvl: (id, lvl) => {
    return new Promise((resolve, reject) => {
      const query = `UPDATE user SET lvl = ? WHERE id = ?`;
      con.query(query, [lvl, id], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  },

  clearTodayTask: (id) => {
    return new Promise((resolve, reject) => {
      const query = `UPDATE user SET taskToday = '[]' WHERE id = ?`;
      const userId = id;

      console.log(userId);
      con.query(query, [userId], (err, result) => {
        if (err) {
          console.error(err);
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  },
};

module.exports = userDAO;
