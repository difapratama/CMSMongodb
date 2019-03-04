const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let mapSchema = new Schema({
    title: {
        type: String
    },
    lat: {
        type: Number
    },
    lng: {
        type: Number
    }
})

module.exports = mongoose.model('Maps', mapSchema);