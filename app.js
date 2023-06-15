const express = require('express')
const cors = require('cors'); 
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
require('dotenv').config();

const productRoute = require('./routes/product');
const bannerRoute = require('./routes/banner');
const userRoute = require('./routes/user');
const orderRoute = require('./routes/order');
const cartRoute = require('./routes/cart');
const authRoute = require('./routes/auth');
const adminRoute = require('./routes/admin');
const paymentRoute = require('./routes/payment');

const { ensureAuth } = require('./middleware/auth')

const app = express()

const PORT = process.env.PORT || 3000;

app.use(cors({ credentials: true, origin: process.env.ORIGIN || "http://localhost:3001" }));

app.use('/admin',adminRoute);

app.use(bodyParser.urlencoded({ 
    extended: true 
}));

app.use(bodyParser.json())


app.use((req,res,next) => {
    res.header("Access-Control-Allow-Origin", process.env.ORIGIN || "http://localhost:3001");
    res.header('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Methods','OPTIONS,GET,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Referer');
    next();
})

// for testing
app.get('/',ensureAuth,(req,res) => {
    res.send(`<h1> Hey man you are authenticated</h1>`)
})


// routes
app.use('/product', productRoute);
app.use('/user',ensureAuth, userRoute);
app.use('/order',ensureAuth ,orderRoute);
app.use('/cart',ensureAuth,cartRoute);
app.use('/banner',bannerRoute);
app.use('/payment',paymentRoute);


app.use('/auth', authRoute);

app.listen(PORT) 


// mongodb connection
const uri = process.env.ATLAS_URI;
mongoose.connect(uri);
const connection = mongoose.connection;
connection.once('open', () => {
console.log("MongoDB database connection established successfully");
})