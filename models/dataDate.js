const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let dateSchema = new Schema({
    letter: {
        type: Date,
        required: true
    },
    frequency: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('Date', dateSchema);