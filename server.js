const express = require('express');
const path =  require('path');
const fs = require('fs');
const util = require('util');


 //Helper method for generating unique ids
 //const uuid = require();

 const PORT = 3001;

 const app = express();

 //Middleware for parsing JSON and urlencoded form data
 app.use(express.json());
 app.use(express.urlencoded({ extended: true}));

 app.use(express.static('public'));

 require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

 app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
});