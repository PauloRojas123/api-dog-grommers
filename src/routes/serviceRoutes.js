import {Router} from 'express'
const router = Router();

import * as serviceCtrl from '../controllers/serviceController.js'
import { verifyToken, isAdmin } from '../middlewares/authJwt.js'


router.get('/service', serviceCtrl.getService);

router.post('/service', verifyToken, isAdmin, serviceCtrl.createService);

router.put('/service/:id', verifyToken, isAdmin, serviceCtrl.updateServiceById);

router.delete('/service/:id', verifyToken, isAdmin, serviceCtrl.deleteServiceById);


export default router