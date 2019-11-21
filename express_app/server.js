/*===========================
        DEPENDENCIES
=============================*/
const express = require("express");
const app = express();
const port = 3003;
const mongoose = require("mongoose");
const cors = require("cors");
/*===========================
          CONTROLLERS 
=============================*/
const bookmarksController = require("./controllers/bookmark.js");
/*===========================
           WHITELIST 
=============================*/
const whitelist = ["http://localhost:3000"];

const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  }
};

/*===========================
         MIDDLEWARE
=============================*/
app.use(express.json());
app.use(cors(corsOptions));

//controller is always listed last on middleware
app.use("/bookmarks", bookmarksController);
/*=========================== 
          MONGOOSE
=============================*/
mongoose.connection.on("error", err =>
  console.log(err.message + " is Mongod not running?")
);

mongoose.connection.on("disconnected", () => console.log("mongo disconnected"));

mongoose.connect("mongodb://localhost:27017/bookmark", {
  useNewUrlParser: true
});
mongoose.connection.once("open", () => {
  console.log("connected to mongoose...");
});

/*===========================
           LISTEN
=============================*/
app.listen(port, () => {
  console.log("listening");
});

// curl -d '{"title":"Alice Test" , "url":"https://www.tutorialspoint.com/mongodb/mongodb_insert_document.htm"}' -H "Content-Type: application/json" -X POST http://localhost:3003/bookmarks

// curl -d '{"title":"Alice Test" , "url":"https://www.tutorialspoint.com/mongodb/mongodb_insert_document.htm"}' -H "Content-Type: application/json" -X POST http://localhost:3003/bookmarks

// curl -X DELETE http://localhost:3003/bookmarks/
