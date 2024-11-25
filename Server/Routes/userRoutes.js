const express=require('express')
const router = express.Router()
const usercontroller=require('../Controller/usercontroller')
router.post('/send-otp',usercontroller.sendOtp)
router.post('/signup',usercontroller.signUp)


module.exports = router;