import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
// import jwt from 'jsonwebtoken';

import postRoutes from './routes/posts.js'
// require('dotenv').config();


const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
// app.use(express.json());

app.use('/posts', postRoutes)

const CONNECTION_URL = `mongodb+srv://minhaz:b4uuIRC5ag1sUyQ8@cluster0.8xz2190.mongodb.net/?retryWrites=true&w=majority`;
const port = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(port, () => console.log(`Server is running on port: ${port}`)))
    .catch((error) => console.log());
