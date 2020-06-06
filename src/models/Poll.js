const { Schema, model } = require('mongoose');

const pollSchema = new Schema ({
    title: String,
    description: String,
    isActive: Boolean,
    subjects: {
        type: Array
    }
});

module.exports = model('poll', pollSchema);