const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDb = require('./config/db');
const router = require('./routes/index');
const cookieParser = require('cookie-parser')
const app = express();
dotenv.config();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL, 
  credentials: true
}));

// Increase payload size limit
app.use(express.json({ limit: '10mb' }));  
app.use(express.urlencoded({ limit: '10mb', extended: true })); 

app.use(express.json());  
app.use(express.urlencoded({ extended: true }));  
app.use(cookieParser())
// Routes
app.use('/api', router);

// Port
const PORT = process.env.PORT || 8080;

// Database Connection and Server Start
connectDb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Database connection failed:', err);
  });
