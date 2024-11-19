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

;

mongoose.connect("mongodb+srv://guvib46:guviB46@cluster0.ebhseuj.mongodb.net/?retryWrites=true&w=majority", {useNewURlParser: true});

const con = mongoose.connection();
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