const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new Schema ({
    student_id: {
        type: String,
        required: [true, 'Please provide your student_id'],
        unique: true,
    },
    name: {
        type: String,
        required: [true, 'Please provide your name'],
        trim: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        minlength: 8,
        select: false,
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
      },
});


// Virtual Populate to show all the votes from a User
userSchema.set('toObject', { virtuals: true });
userSchema.set('toJSON', { virtuals: true });

userSchema.virtual('myVotes', {
  ref: 'Vote',
  foreignField: 'owner',
  localField: '_id',
});

/* MIDDLEWARES
 *
 */
// Encrypt Password using Document Middleware
// It will run before the data is persisted in the database
userSchema.pre('save', async function (next) {
    //"isModified" Method in all documents to check if that field was modified
    if (!this.isModified('password')) return next();
  
    //Hash the password with cost of 12 (the higher, the longer it takes)
    this.password = await bcrypt.hash(this.password, 12);
  
    next();
  });

module.exports = model('user', userSchema);