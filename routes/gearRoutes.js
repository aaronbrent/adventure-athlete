var express = require("express");
var productRoutes = express.Router();
var request = require('request');
var Gear = require("../models/gear");
var User = require("../models/user");

productRoutes.route("/")
    
//    .get(function (req, res) {
//        request('http://api.sierratradingpost.com/api/1.0/products/?api_key=ab09e780bdc9de50dafea0ca4603e7fe', function (error, response, body) {
//            res.send(body);
//    //        console.log('error:', error); // Print the error if one occurred
//    //        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
//    //        console.log('body:', body); // Print the HTML for the Google homepage.
//        });
//    })
    
//    .get(function (req, res) {
//
//        Outing.find({
//            user: req.user._id
//        }, function (err, outings) {
//            if (err) res.status(500).send(err);
//            res.send(outings);
//        });
//    })
    
    .post(function (req, res) {
        var gear = new Gear(req.body);
        
        gear.users.push(req.user._id)
        
        gear.save(function (err, newGear) {
            if (err) res.status(500).send(err);
            res.status(201).send(newGear);
            
           
        User.findById(req.user._id, function (err, user) {
            
            user.gear.push(newGear._id);
            
            user.save(function (err, user) {
                
                console.log(user)
               
                });
            });
        })
                 
});





module.exports = productRoutes;
