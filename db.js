const mongoose = require('mongoose');

require('dotenv').config();

  //const mongoURL='mongodb://127.0.0.1:27017';
//const mongoURL ='mongodb+srv://hotel:sashi>@cluster0.syigq9w.mongodb.net/';

const mongoURL=process.env.MONGODB_URL;

//set up MongoDB connectionn
mongoose.connect(mongoURL);

// mongoose.connect(mongoURL,{
//     useNewUrlParser:true,
//     useUnifiedTopology:true
// })

const db = mongoose.connection;

db.on('connected', () => {
    console.log('Connected to MongoDB server');
});

db.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});

db.on('disconnected', () => {
    console.log('MongoDB disconnected');
});