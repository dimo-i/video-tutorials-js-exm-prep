const router = require('express').Router();

const homeController = require('./controllers/homeController');
const authController = require('./controllers/authController');

//////CHANGE PUBLICATION WITH "SECOND ITEM" + File names


const courseController = require('./controllers/courseController');

router.use(homeController);
router.use('/auth', authController);
router.use('/courses', courseController);

module.exports = router;