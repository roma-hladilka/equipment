const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const materialSchema = new Schema({
    name: String,
    durability: Number,
    strength: Number,
});

module.exports = model('Material', materialSchema);