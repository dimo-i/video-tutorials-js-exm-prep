const router = require('express').Router();

const { isAuth } = require('../middlewares/authMiddleware');

const courseService = require('../services/courseService');
const userService = require('../services/userService');

const { getErrorMessage } = require('../utils/errorHelpers')

const { preloadCourse, isCourseAuthor } = require('../middlewares/courseMiddleware')


router.get('/', async (req, res) => {

    const courses = await courseService.getAll().lean();

    res.render('course/gallery', { courses })
});


router.get('/:courseId/details', async (req, res) => {
    const course = await courseService.getOneDetailed(req.params.courseId).lean();
    const isAuthor = course.author._id == req.user?._id;
    //Todo check logged out user
    const isEnrolled = course.usersEnrolled.some(x => x._id == req.user?._id)


    res.render('course/details', { ...course, isAuthor, isEnrolled });


})


router.get(
    '/:courseId/edit',
    isAuth,
    preloadCourse,
    isCourseAuthor,
    (req, res) => {

        res.render('course/edit', { ...req.course })
    }
);


router.post('/:courseId/edit',
    isAuth,
    preloadCourse,
    isCourseAuthor,
    async (req, res) => {
        try {
            await courseService.updateOne(req.params.courseId, req.body);

            res.redirect(`/courses/${req.params.courseId}/details`)
        } catch (error) {
            res.render('course/edit', { ...req.body, error: getErrorMessage(error) })
        }
    }
);


router.get(
    '/:courseId/delete',
    isAuth,
    preloadCourse,
    isCourseAuthor,
    async (req, res) => {

        await courseService.delete(req.params.courseId);
        
        res.redirect('/courses');
    }
);


router.get('/create', isAuth, (req, res) => {
    res.render('course/create');
})

router.post('/create', isAuth, async (req, res) => {
    //Change the Author/owner/creator
    const courseData = { ...req.body, author: req.user._id };

    try {
        const course = await courseService.create(courseData);
        // await userService.addCourse(req.user._id, course._id);

        res.redirect('/courses');

    } catch (error) {
        res.render('course/create', { ...req.body, error: getErrorMessage(error) })
    }

});


router.get('/:courseId/enroll', isAuth, async (req, res) => {
    const course = await courseService.getOne(req.params.courseId);
    const user = await userService.getOne(req.user._id);

    course.usersEnrolled.push(req.user._id);
    user.coursesEnrolled.push(course)

    await course.save();
    await user.save();
    res.redirect(`/courses/${req.params.courseId}/details`)
})


module.exports = router;