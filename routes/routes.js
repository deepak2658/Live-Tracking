const path = require('path')
const express = require('express')
const router = express.Router()

const staticctrl = require('../controllers/static')

// router.get('/',staticctrl.landingPage)
router.get('/user1',staticctrl.user1Page)
router.post('/user2',staticctrl.user2Page)
// router.get('/contact',staticctrl.contactPage)
// router.get('/about',staticctrl.aboutPage)
// router.get('/signup',staticctrl.signupPage)


module.exports = router