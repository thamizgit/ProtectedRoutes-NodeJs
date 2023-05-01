const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    roles: {
        User: {
            type: Number,
            default: 4012
        },
        Editor: Number,
        Admin: Number
    },
    refreshToken: String
});

module.exports = mongoose.model('User', UserSchema);