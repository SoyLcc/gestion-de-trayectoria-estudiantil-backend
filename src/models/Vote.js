const { Schema, model } = require('mongoose');

const userSchema = new Schema ({
    poll: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'Poll',
        },
    ],
    subject: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'Subject',
        },
    ],
    user: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'User',
        },
    ],
});

module.exports = model('vote', userSchema);