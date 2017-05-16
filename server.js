// server.js
var express = require("express");  
var app = express();  
var path = require("path");  
var morgan = require("morgan");  
var mongoose = require("mongoose");  
var bodyParser = require("body-parser");
var config = require("./config");
var expressJwt = require("express-jwt");

var port = process.env.PORT || 5000;

app.use(morgan("dev"));  
app.use(bodyParser.json());
app.use("/outing", require("./routes/outingRoutes"));
app.use("/api", expressJwt({secret: config.secret}))


app.use(express.static(path.join(__dirname, "public")));
app.use("/api/outing", require("./routes/outingRoutes"));

mongoose.connect(config.database, function (err) {  
    if (err) throw err;
    console.log("Successfully connected to the database");
});

app.use("/auth/change-password", expressJwt({secret: config.secret}));


app.use("/auth", require("./routes/authRoutes")); 
app.use("/api/gear", require("./routes/gearRoutes"));  
app.use("/api/user", require("./routes/userRoutes")); 
app.use("/athletes", require("./routes/homeRoutes")); 

app.listen(port, function () {  
    console.log(`Server listening on port ${port}`);
});

