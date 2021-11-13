import { check} from 'express-validator'
import { validateResult } from '../helpers/validateHelper.js'

const validateCreate = [
    check('userName')
    .exists()
    .not()
    .isEmpty(),
    check('email')
    .exists()
    .isEmail(),
    check('password')
    .exists()
    .isStrongPassword(),
    check('firstName')
    .exists()
    .not()
    .isEmpty(),
    check('lastName')
    .exists()
    .not()
    .isEmpty(),
    (req, res, next) => {
        validateResult(req, res, next)
    }
    
]

export { validateCreate }