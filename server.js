const express = require('express');
const app = express();
const UserRoute = require('./app/routes/User');

// Use built-in middleware for parsing JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use the UserRoute middleware
app.use('/user', UserRoute);

const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Database Connected Successfully!!");
}).catch(err => {
    console.log('Could not connect to the database', err);
    process.exit();
});

app.get('/', (req, res) => {
    res.json({ "message": "Hello Crud Node Express" });
});

app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});
