var express = require("express");
var outingRouter = express.Router();
var Outing = require("../models/outing");

outingRouter.route("/")

    .get(function (req, res) {
        
        Outing.find({
            user: req.user._id
        })
    
            .populate("gear")
            .exec(function (err, outings) {
                if (err) return res.status(500).send(err);
                
                return res.send(outings)
            });
    })
    .post(function (req, res) {
        var outing = new Outing(req.body);


        outing.user = req.user;
        outing.save(function (err, newOuting) {
            if (err) res.status(500).send(err);
            res.status(201).send(newOuting);
        });
    });

outingRouter.route("/:outingId")
    .get(function (req, res) {

        Outing.find({
            user: req.query
        }, function (err, outing) {
            if (err) res.status(500).send(err);
            if (!outing) res.status(404).send("No outing found.");
            else res.send(outing);
        });
    })
    .put(function (req, res) {

        Outing.findOneAndUpdate({
            _id: req.params.outingId,
            user: req.user._id
        }, req.body, {
            new: true
        }, function (err, outing) {
            if (err) res.status(500).send(err);
            res.send(outing);
        });
    })
    .delete(function (req, res) {

        Outing.findOneAndRemove({
            _id: req.params.outingId,
            user: req.user._id
        }, function (err, outing) {
            if (err) res.status(500).send(err);
            res.send(outing);
        });
    });

module.exports = outingRouter;
