const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const swordSchema = new Schema({
    name: String,
    durability: Number,
    attack: Number,
    materialId: String,
    isUpgraded: Boolean,
});

module.exports = model('Sword', swordSchema);