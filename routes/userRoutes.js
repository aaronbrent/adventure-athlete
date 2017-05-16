var express = require("express");
var userRoutes = express.Router();
var User = require("../models/user");


userRoutes.route("/")

    .get(function (req, res) {
    
        User.findById(req.user._id)
    
            .populate("gear")
            .exec(function (err, user) {
                if (err) return res.status(500).send(err);
                
                return res.send(user.gear)
            });
    })

module.exports = userRoutes;