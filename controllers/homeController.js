const router = require('express').Router();


//////CHANGE PUBLICATION WITH "SECOND ITEM" + File names

const courseService = require('../services/courseService')
const userService = require('../services/userService')



router.get('/', async(req, res) => {
    const courseResult = await courseService.getAll().lean();
    const courses = courseResult.map(x => ({...x, usersEnrolled: x.usersEnrolled.length})) //



    res.render('home', {courses});
})



router.get('/me-profile', async (req, res) => {
    const user = await userService.getOne(req.user._id).populate('coursesEnrolled').lean();

    const courses = user.coursesEnrolled.map(x => x.title).join(', ');


    
    res.render('home/profile', {...user, courses});
})


module.exports = router;


