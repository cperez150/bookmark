/*===========================
        DEPENDENCIES
=============================*/
const express = require("express");
const app = express();
const port = 3003;
const mongoose = require("mongoose");

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
