const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    email: String,
    password: String
},{
    timestamps: true
});

// Crea un modelo User basado en userSchema
module.exports = model('User', userSchema);