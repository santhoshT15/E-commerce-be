const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config();

const app = express();

const port = process.env.PORT || 3001;
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
}));

const dbUrl = process.env.DB_URL;

mongoose.connect(dbUrl, {useNewURlParser: true});

const con = mongoose.connection;
con.on('error', (error) => {
    console.log("Error connecting to the database: " + error);
});
con.on('open', () => {
    console.log('db connected');
});
app.use(express.json());
app.use(express.urlencoded({extended:false}));

const productRouter = require('./routes/product');
const adminRouter = require('./routes/admin');
const userRouter = require('./routes/user');

app.use('/product', productRouter);
app.use('/admin', adminRouter);
app.use('/user', userRouter);

app.listen(port, () => {
    console.log('Server is running at', port);
})