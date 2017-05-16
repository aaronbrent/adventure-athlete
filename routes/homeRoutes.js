var express = require("express");
var homeRoutes = express.Router();
var User = require("../models/user");
var Gear = require("../models/gear");
var Outing = require("../models/outing");

homeRoutes.route("/")

    .get(function (req, res) {

        User.find(req.query)

            .populate("gear")
            .exec(function (err, user) {
                if (err) return res.status(500).send(err);
                console.log (user)
                return res.send(user)
            });
    })

homeRoutes.route("/:athleteId")
    .get(function (req, res) {

        Outing.find({
            user: req.params.athleteId
        })
         .populate("gear")
         .exec (function (err, outing) {
            if (err) res.status(500).send(err);
            if (!outing) res.status(404).send("No outing found.");
            else res.send(outing);
        });
    })

homeRoutes.route("/gear")

    .get(function (req, res) {
        Gear.find(req.query, function (err, gearArray) {
            return res.send(gearArray);
        })
    })

    

module.exports = homeRoutes;
