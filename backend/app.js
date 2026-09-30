const express = require('express');
const app = express();
const userRouter = require('./routes/userRouter');
const CategoryRouter = require('./routes/categoryRouter');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const errorHandler = require('./middlewares/ErrorHandlerMiddleware');
const TransactionRouter = require('./routes/transactionRouter');

// connect to mongodb
mongoose.connect(process.env.MONGO_URI).then(() => console.log('Connected to MongoDB')).catch((err) => console.log('Error connecting to MongoDB:', err));

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// cors
const corsOptions = {
    origin:['http://localhost:5173']
}

app.use(cors(corsOptions));
// routes
app.use('/', userRouter);
app.use('/', CategoryRouter);
app.use('/', TransactionRouter);
// error
app.use(errorHandler)



// start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port.. ${PORT}`);
})
// link = http://localhost:5000/api/v1/users/register