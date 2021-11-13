import express, { Router } from 'express'
const router = Router()

import * as authCtrl from '../controllers/authController.js'


router.post('/auth/signin', authCtrl.signin)
router.post('/auth/signup', authCtrl.signup)

export default router;