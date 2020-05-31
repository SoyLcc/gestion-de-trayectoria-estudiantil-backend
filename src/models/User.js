const { Schema, model } = require('mongoose');

const userSchema = new Schema ({
    student_id: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
});

module.exports = model('user', userSchema);