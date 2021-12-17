import {Router} from 'express'
const router = Router();

import * as commentCtrl from '../controllers/commentController.js'
import { verifyToken } from '../middlewares/authJwt.js'
import { isAdmin } from '../middlewares/authJwt.js'


router.get('/comment', commentCtrl.getComment);

router.post('/comment', commentCtrl.createComment);

router.put('/comment/:id', verifyToken, commentCtrl.updateCommentById);

router.delete('/comment/:id', verifyToken, commentCtrl.deleteCommentById);


export default router