import { Router } from 'express'
const router = Router();

import * as DogGrommerCtrl from '../controllers/dogGrommerController.js'
//import { verifyToken, isAdmin } from '../middlewares/authJwt.js'



router.get('/dogGrommer', DogGrommerCtrl.getDogGrommer)

router.get('/dogGrommer/:id', DogGrommerCtrl.getDogGrommerById)

router.post('/dogGrommer', DogGrommerCtrl.createDogGrommer)

router.put('/dogGrommer/:id', DogGrommerCtrl.updateDogGrommerById)

router.delete('/dogGrommer/:id', DogGrommerCtrl.deleteDogGrommerById)

router.get('/dogGrommer/search/:query', DogGrommerCtrl.searchDG)


export default router