import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import analyzeRoute from './routes/analyze.js';

const app = express();
app.use(cors({ origin: '*'}));
app.use(express.json());

app.use('/api', analyzeRoute);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));