require("dotenv").config();
const express = require("express");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
let data = require("./data/userList.json");

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
  res.render("userList", {
    users,
  });
});

server.get("/users", (req, res) => {
  let { users } = data;
  res.render("userList", {
    users: users,
  });
});

server.get("/delete/:id", (req, res) => {
  let { id } = req.params;
  let { users } = data;
  let ind = users.map((user) => user.uuid).indexOf(id);
  users.splice(ind, 1);
  let json = JSON.stringify(data);
  fs.writeFile(
    path.join(__dirname, "data", "userList.json"),
    json,
    "utf8",
    () => {
      console.log("file updated");
      res.redirect("/users");
    }
  );
  // res.redirect("/users");
});


server.get("/update/:id", (req, res) => {
  let { id } = req.params;
  let { users } = data;
  let ind = users.map((user) => user.uuid).indexOf(id);
  let userToUpdate = users[ind];
  res.render("index", {
    formTitle: `Updating ${userToUpdate.username}`,
    formType: "create",
    user: userToUpdate,
  });
});

server.post("/update/:id", (req, res) => {
  let { users } = data;
  let { name, age, username, email } = req.body;
  let { id } = req.params;
  let ind = users.map((user) => user.uuid).indexOf(id);
  currUser = { name, age, username, email, uuid: id };
  data.users[ind] = currUser;
  let json = JSON.stringify(data);

  fs.writeFileSync(
    path.join(__dirname, "data", "userList.json"),
    json,
    "utf8",
    () => {
      console.log("file updated");
    }
  );

  res.redirect("/users");
});

server.listen(PORT, () => {
  console.log(`Master has given Dobby a port ${PORT}!\nDobby is free!!!`);
});
