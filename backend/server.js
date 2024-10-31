

import express from 'express';
import cors from 'cors';
import { DbConnect } from './src/db/db.js';
import rootrouter from './src/routes/root.router.js';

const app = express();

const PORT = 3000;


// middleware
app.use(cors());
app.use(express.json());



// routes 

app.use('/api/v1',rootrouter);


DbConnect().then(() => {
    app.listen(PORT, () => {
        console.log("Listening on port " + `http://localhost:${PORT}`);

    })
})







