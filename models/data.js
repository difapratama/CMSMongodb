const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let dataSchema = new Schema({

    letter: {
        type: String,
        required: true
    },
    frequency: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('Data', dataSchema);