require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const cors = require("cors");
const db = require("./db");
const mongoose = require("mongoose");
const app = express();
const Router = require("./router/index");
const PORT = 4000;

const environment = process.env.NODE_ENV;
const stage = require("./config")[environment];

// const url = `mongodb+srv://beast1534:dEoXOk37HDjzhvQ6@cluster0.kellf.mongodb.net/new_project_v1?retryWrites=true&w=majority`;

// const connectionParams={
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useUnifiedTopology: true
// }
// mongoose.createConnection(url,connectionParams)
//     .then( () => {
//         console.log('Connected to database ')
//     })
//     .catch( (err) => {
//         console.error(`Error connecting to the database. \n${err}`);
//     })

// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(cors());
// app.use(bodyParser.json());


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(cors())
app.use('/', express.static(__dirname+'/public'));
app.use('/uploads', express.static(__dirname+'/public/uploads'));

db.on(
  "error",
  console.error.bind(console.error.bind(console, "MongoConnection Error:"))
);

if (environment !== "production") {
  app.use(logger("dev"));
}

app.use("/api/v1", Router);
app.get("/", (req, res) => {
  return res.status(200).json({
    Message: "Server is connected",
  });
});

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server now listening at localhost:${process.env.PORT || 5000}`);
});

module.exports = app;
