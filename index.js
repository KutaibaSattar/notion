const express = require("express");
const app = express();
app.use(express.static("dist"));
const bodyParser = require("body-parser");
const cors = require("cors");

// We are using our packages here
app.use(bodyParser.json()); // to support JSON-encoded bodies

app.use(
  bodyParser.urlencoded({
    // to support URL-encoded bodies
    extended: true,
  })
);
app.use(cors());

const moduleToFetch = require("./notiondatabase");
// const getDataBase = moduleToFetch.getDatabase();

// app.get("/users", async (req, res) => {
//   const users = await getDataBase;
// });
app.get("/", (req, res) => {
  res.send("Welcome to your server");
});

const newEntryToDatabase = moduleToFetch.newEntryToDatabase;

app.listen(8080, console.log(`Server started on ${8080}`));

app.post("/submit-form", async (req, res) => {
  const name = req.body.name;
  const phone = req.body.phone;
  const comment = req.body.comment;
  const location = req.body.location;

  // console.log("I am submit");
  await newEntryToDatabase(name, phone, comment, location);
  res.redirect("https://seraime.com");
  res.end();
});
