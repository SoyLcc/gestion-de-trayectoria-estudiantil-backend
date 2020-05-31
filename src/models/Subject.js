const { Schema, model } = require('mongoose');

const subjectSchema = new Schema ({
    key: Number,
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: String,
    credits: Number,
    hours: Number,
    father: Number
});

module.exports = model('subject', subjectSchema);