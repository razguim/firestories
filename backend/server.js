import path from 'path'
import express from 'express'
import dotenv from 'dotenv'
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
dotenv.config();
import dbconnect from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import storyRoutes from './routes/storyRoutes.js';
import reportRoutes from './routes/reportRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import { notFound,errorHandler } from './middleware/errorMiddleware.js';
const port = process.env.PORT || 3000
dbconnect()
const app = express()
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ extended: true }))
app.use(cookieParser())
app.use('/api/users',userRoutes)
app.use('/api/stories',storyRoutes)
app.use('/api/reports',reportRoutes)
app.use('/api/upload',uploadRoutes)
const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));
app.get('/',(req,res)=>res.send ('Server is ready'))
app.use(notFound)
app.use(errorHandler)
app.listen (port ,()=> console.log(`Server started on ${port}`))