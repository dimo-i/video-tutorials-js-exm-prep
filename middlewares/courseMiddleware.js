const courseService = require('../services/courseService')


exports.preloadCourse = async (req, res, next) => {
    const course = await courseService.getOne(req.params.courseId).lean();

    req.course = course
    next();
}

exports.isCourseAuthor = (req, res, next) => {
    if (req.course.author != req.user._id){
        return next({message: 'You are not authorized!', status: 401});
    }
    next();
}