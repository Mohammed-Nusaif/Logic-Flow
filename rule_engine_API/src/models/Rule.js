const mongoose = require('mongoose');

const ruleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    ruleString: {
        type: String,
        required: true
    },
    ast: {
        type: Object,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Rule', ruleSchema);