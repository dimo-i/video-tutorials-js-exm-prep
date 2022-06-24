const Course = require('../models/Course');



exports.getAll = () => Course.find();

exports.getOne = (courseId) => Course.findById(courseId);

exports.getOneDetailed = (courseId) => Course.findById(courseId).populate('usersEnrolled');

exports.create = (courseData) => Course.create(courseData);

exports.updateOne = (courseId, courseData) => Course.updateOne({_id: courseId}, {$set: courseData}, {runValidators: true});

exports.delete = (courseId) => Course.deleteOne({_id: courseId});

