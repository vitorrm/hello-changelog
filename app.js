const express = require('express');
const jobs = require('./services/jobs.js');

const app = express();
let port = 3000;

app.use(express.static('site-root'));

app.listen(port, () => {

	jobs.scheduleAll();

	console.log('Hello Changelog is Running {}')
});