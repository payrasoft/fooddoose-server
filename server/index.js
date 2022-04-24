require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser');
const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: true,
    credentials: true
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.use(bodyParser());
app.all('/', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '/*');
    res.header('Access-Control-Allow-Headers', 'Content-Type,accept,access_token,X-Requested-With');
    next();
});

app.use('/user', require('./Routes/userRouter'))


const URI = process.env.MONGO_CONNECTION_STRING
mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, err => {
    if (err) throw err;
    console.log('Connected to MongoDB')
})

app.get('/', (req, res) => {
    res.send('Welcome')
})


const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log('Server is running on port', PORT)
})