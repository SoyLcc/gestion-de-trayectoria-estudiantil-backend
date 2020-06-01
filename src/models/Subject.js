const { Schema, model } = require('mongoose');

const subjectSchema = new Schema ({
    key: Number,
    name: {
        type: String,
        trim: true
    },
    type: String,
    credits: Number,
    theory: Number,
    lab: Number,
    axis: String,
    minCredits: Number,
    requirements: String,
});

module.exports = model('subject', subjectSchema);