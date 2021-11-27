import {Router} from 'express'
const router = Router();

import { validateCreate } from '../validator/user.js'
import * as usersCtrl from '../controllers/userController.js'
import * as validator from '../middlewares/validatorSignup.js'
import { verifyToken } from '../middlewares/authJwt.js'


router.get('/users', usersCtrl.getUsers);

router.get('/users/:id', usersCtrl.getUser);

router.post('/users', validateCreate, validator.checkRolesExisted, usersCtrl.createUser);

router.delete('/users/:id', verifyToken, usersCtrl.deleteUser);

router.put('/users/:id', verifyToken, usersCtrl.updateUser);



export default router