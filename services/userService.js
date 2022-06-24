const User = require('../models/User');



exports.getOne = (userId) => User.findById(userId);


// exports.addCourse = (userId, courseId) => {

//     return User.updateOne({_id: userId}, {$push: {coursesEnrolled: courseId}});
// }
