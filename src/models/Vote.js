const { Schema, model } = require('mongoose');

const userSchema = new Schema ({
    poll: {
        type: Schema.Types.ObjectId,
        ref: 'Poll',
    },
    subject: {
        type: Schema.Types.ObjectId,
        ref: 'Subject',
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
});

module.exports = model('vote', userSchema);