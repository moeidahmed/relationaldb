const express = require("express");
const app = express();
const sql = require("mysql");
const cors = require("cors");
app.use(express.json());
app.use(
  cors({
    methods: ["GET", "POST"],
  })
);

const db = sql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "voter_registeration",
});
const a = (err) => {
  if (!err) {
    console.log("DB connection succeeded");
  } else {
    console.log("ERROR: DB connection failed");
  }
};
db.connect(a);

app.get("/province/data/:d", (req, res) => {
  console.log(req.params.d);
  db.query(
    `SELECT cities.city_name, provinces.pro_name FROM cities JOIN provinces ON cities.pro_id = provinces.pro_id WHERE provinces.pro_id = ${req.params.d} ORDER BY city_name;`,
    (err, rslt) => {
      if (!err) {
        console.log("Success");
        res.send(rslt);
      } else {
        console.log(err);
      }
    }
  );
});

app.get("/dis/data/:d", (req, res) => {
  console.log(req.params.d);
  db.query(
    `SELECT cities.city_name, districts.districts_name FROM cities JOIN districts ON cities.city_name = districts.city_name WHERE districts.city_name  = '${req.params.d}';`,
    (err, rows) => {
      if (!err) {
        console.log("succed");
        res.send(rows);
      } else {
        console.log(err);
      }
    }
  );
});

app.listen(4040, () => console.log("Port is running on 4040"));
