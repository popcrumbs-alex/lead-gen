const mongoose = require('mongoose');


const AdminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    restrictions: {
        tier: {
            type: Number,
            required: true
        },
    },
    role: {
        type: String,
        required: true
    }
})

module.exports = Admin = mongoose.model('Admin', AdminSchema)