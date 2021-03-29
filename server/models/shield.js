const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const shieldSchema = new Schema({
    name: String,
    durability: Number,
    protection: Number,
    materialId: String,
    isUpgraded: Boolean,
});

module.exports = model('Shield', shieldSchema);