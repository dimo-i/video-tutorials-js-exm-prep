const mongoose = require('mongoose');

const bcrypt = require('bcrypt');

const { SALT_ROUNDS } = require('../config/env')


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required!'],
        minlength: [5, 'Username should be at least 5 chars long!']
        // unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: [5, 'Password should be at least 5 chars long!']
    },
    
    coursesEnrolled: [{
        type: mongoose.Types.ObjectId,
        ref: 'Course',
    }],



});

userSchema.pre('save', function(next) {
    bcrypt.hash(this.password, SALT_ROUNDS)
    .then(hashedPassword => {
        this.password = hashedPassword
        next()
    });
});

const User = mongoose.model('User', userSchema);

module.exports = User;