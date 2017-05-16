var mongoose = require("mongoose");  
var Schema = mongoose.Schema;

var gearSchema = new Schema ({
     
        brand: String,
        model: String,
        imgUrl: String,
        purchaseUrl: String,
        rating: Number,
        users: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }]
    
})

module.exports = mongoose.model("Gear", gearSchema); 