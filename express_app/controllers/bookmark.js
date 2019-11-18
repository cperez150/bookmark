/*===========================
        DEPENDENCIES
=============================*/
const express = require("express");
const bookmarks = express.Router();
const Bookmark = require("../models/bookmark.js");
/*===========================
          CONTROLLERS 
=============================*/

bookmarks.get("/", (req, res) => {
  res.send("Hello World");
});

/*===========================
            EXPORT
=============================*/
module.exports = bookmarks;
