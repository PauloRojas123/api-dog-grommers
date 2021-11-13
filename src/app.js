import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import config from './config.js'

import { createRoles } from './libs/initialSetup.js'

import usersRoutes from './routes/usersRoutes.js'
import authRoutes from './routes/authRoutes.js'
import commentRoutes from './routes/commentRoutes.js'
import dogGrommerRoutes from './routes/dogGrommerRoutes.js'
import serviceRoutes from './routes/serviceRoutes.js'


const app = express()
createRoles();

app.set('port', config.PORT);

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(usersRoutes);
app.use(authRoutes);
app.use(commentRoutes);
app.use(dogGrommerRoutes);
app.use(serviceRoutes)

export default app;