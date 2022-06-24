const mongoose = require('mongoose');


const URL_PATERN = /^https?:\/\/(.+)/;

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required']
    },
    description: {
        type: String,
        required: [true, 'Description is required']
    },
    imageUrl: {
        type: String,
        required: [true, 'Image is required'],
        validate: {
            validator: function (value) {
                return URL_PATERN.test(value);
            },
            message: "Image must be a valid URL"
        },
    },
    isPublic: {
        type: Boolean,
        default: false,
    },
    dateCreated: {
        type: String,
        required: [true, 'Date is required!']
    },
    author: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },

    usersEnrolled: [{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }]


});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;