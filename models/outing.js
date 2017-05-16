

var mongoose = require("mongoose");  
var Schema = mongoose.Schema;

var outingSchema = new Schema({  
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    video: {
        type: String,
        
    },
    gear: [{
        type: Schema.Types.ObjectId,
        ref: "Gear"
        
    }],
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
});

module.exports = mongoose.model("Outing", outingSchema); 