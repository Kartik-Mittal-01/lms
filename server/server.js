import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './configs/mongodb.js';
import { clerkWebhooks } from './controllers/webhooks.js';

// initialise express
const app = express();

// connect db 
await connectDB();

// middlewares 
app.use(cors());

// routers
app.get('/', (req , res) => {
    res.send("api working");
})

app.post('/clerk' , express.json() , clerkWebhooks )

// port 
const PORT = process.env.PORT || 5000;
app.listen(PORT , () => {
    console.log(`listening on port ${PORT}`);
})