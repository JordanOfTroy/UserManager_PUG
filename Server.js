require("dotenv").config();
const express = require("express");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
let data = require("./data/userList.json");
// console.log(data.users[0].uuid)

const server = express();
const PORT = 3000;

server.use(express.urlencoded({ extended: false }));

server.set("views", path.join(__dirname, "views"));
server.set("view engine", "pug");

server.get("/", (req, res) => {
  res.render("index", {
    formTitle: "Create a user",
    formType: "create",
  });
});

server.post("/", (req, res) => {
  let { name, age, username, email } = req.body;
  let { users } = data;
  let uuid = uuidv4();
  let newUserObj = { name, age, username, email, uuid };
  users.push(newUserObj);
  let json = JSON.stringify(data);
  fs.writeFile(
    path.join(__dirname, "data", "userList.json"),
    json,
    "utf8",
    () => {
      console.log("file updated");
    }
  );
  res.render('userlist', {
    users: data.users
  });
});

server.listen(PORT, () => {
  console.log(`Master has given Dobby a port ${PORT}!\nDobby is free!!!`);
});
