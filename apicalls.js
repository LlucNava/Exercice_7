import express from 'express'
import {verifyToken} from './middleware/verifytoken.js'
import {rateLimiter} from './middleware/ratelimiter.js'
// import cors from "cors";

import indexRouter from './routes/index.js'
import userRouter from './routes/user.js'
import loginRouter from './routes/login.js'
import notFoundRoute from './routes/notfound.js';

const app = express()
// app.use(cors());

app.get('/favicon.ico', (req, res) => res.status(204).end()); // tells client that there is not favicon.ico
app.use(express.json()) // Middleware is needed POST/PUT/PATCH requests with JSON.
app.use(express.urlencoded({ extended: false })); // Middleware parses URL-encoded form data: Content-Type: application/x-www-form-urlencoded).

app.use('/', indexRouter)
app.use('/login', loginRouter)
app.use('/users', verifyToken, rateLimiter, userRouter)
// app.use('/users', userRouter)
app.use(notFoundRoute);

export default app;