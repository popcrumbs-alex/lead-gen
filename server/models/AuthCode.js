

const mongoose = require('mongoose');


const AuthCodeSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
        unique: true
    }
})

module.exports = AuthCode = mongoose.model('AuthCode', AuthCodeSchema);