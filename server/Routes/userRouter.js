const router = require('express').Router();
const userController = require('../controller/userController')

const { upload } = require('../Middlewares/singleFileUpload')
const { addUserValidators,
    addUserValidationHandler, } = require('../Middlewares/validator/userValidator');
const { updateUserValidators,
    updateUserValidationHandler, } = require('../Middlewares/validator/userUpdateValidator')
router.post('/register', upload.single('avatar'), addUserValidators, addUserValidationHandler, userCtrl.register)

const auth = require('../Middlewares/auth')
router.post('/login', userController.login)/* 
router.get('/logout', userController.logout)
router.get('/refresh_token', userController.refreshToken);
router.get('/information/:id', userController.getUser)
router.get('/all-information', userController.allUser)
router.put('/update/:id', auth, userController.statusUpdate)
router.put('/edit/:id', auth, upload.single('avatar'), updateUserValidators, updateUserValidationHandler, userCtrl.editUser) */

// router.patch('/addcart', auth, userCtrl.addCart)

// router.get('/history', auth, userCtrl.history)


module.exports = router