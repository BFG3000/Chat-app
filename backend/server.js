const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const morgan = require('morgan');
const errorMiddleware = require('./middlewares/errors');
//const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cloudinary = require('cloudinary');
const fileupload = require('express-fileupload');
const Pusher = require('pusher');
//setting up config file
// if (process.env.NODE_ENV === 'PRODUCTION')
require('dotenv').config({ path: './config/config.env' });

//routes

const users = require('./routes/user-routes');
const messages = require('./routes/chat-routes');

//------------------------------------------------------------------
//app
const app = express();
//fixed upload problem
app.use(express.json({ limit: '15mb' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
//Cloudinary Config
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
//Pusher Config
const pusher = new Pusher({
    appId: process.env.APP_ID,
    key: process.env.KEY,
    secret: process.env.SECRET,
    cluster: process.env.CLUSTER,
    useTLS: process.env.USE_TLS,
});

console.log('=====>', 'Node server');
console.log('=====>', process.version);

//------------------------------------------------------------------
//database connection
mongoose
    .connect(process.env.DATABASE, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
    })
    .then((db) => {
        console.log('DB Connected');
        //watch for changes
        const messages = db.model('Message');
        const changeStream = messages.watch();
        changeStream.on('change', (change) => {
            console.log(change)
            if (change.operationType === 'insert') {
                const messageDetails = change.fullDocument;
                pusher.trigger('messages', 'inserted', {
                    name: messageDetails.name,
                    message: messageDetails.message,
                });
            }
        });
    })
    .catch((err) => {
        console.log('DB Connection error', err);
    });

//-----------------------------------------------------------------
//middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(fileupload());
app.use('/api', users);
app.use('/api', messages);
app.use(errorMiddleware);
//----------------------------------------------------------------

if (process.env.NODE_ENV === 'PRODUCTION') {
    console.log('production !!!!!');
    app.use(express.static(path.join(__dirname, '../frontend/build')));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../frontend/build/index.html'));
    });
}

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});