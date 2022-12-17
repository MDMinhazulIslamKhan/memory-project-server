import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';


import postRoutes from './routes/posts.js'
import userRoutes from './routes/users.js'
dotenv.config();


const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use('/posts', postRoutes)
app.use('/user', userRoutes)

const CONNECTION_URL = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.8xz2190.mongodb.net/?retryWrites=true&w=majority`;
const port = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(port, () => console.log(`Server is running on port: ${port}`)))
    .catch((error) => console.log());
