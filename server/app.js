const hostname = '127.0.0.1';
const port = '3000';
const database = 'file-metadata';
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
import mongoose from 'mongoose';

mongoose.connect(`mongodb://${hostname}/${database}`,
{ useMongoClient: true });
const db = mongoose.connection;
db.on('open', (ref) => {
  console.log("Connected to Mongodb successfully.");
});
db.on('error', (err) => {
  console.log("Unable to connect to Mongodb.");
});

// app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('views', 'server/views');
app.set('view engine', 'pug');

const mainRoutes = require('./routes');
app.use('/api', mainRoutes);

app.listen(port, () => {
  console.log(`Application is running on http://${hostname}:${port}...`);
});
