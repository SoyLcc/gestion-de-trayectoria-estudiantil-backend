const mongoose = require('mongoose');

const {
    MONGO_USERNAME,
    MONGO_PASSWORD,
    MONGO_HOSTNAME,
    MONGO_PORT,
    MONGO_DB
  } = process.env;

const URL = process.env.mode == 'production'
    ? `mongodb://${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}?authSource=admin`
    : 'mongodb://localhost/test';

mongoose.connect(URL, {
    auth: {
        user: MONGO_USERNAME,
        password: MONGO_PASSWORD
    },
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
});

const connection = mongoose.connection;

connection.once('open', () => {
    console.log('DB is connected');
})