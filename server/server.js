const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;
const api = require('./routes/api');

app.use(cors());
app.use(express.static(path.join(__dirname, 'dist')));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/api', api);

app.get('/', (req, res) => {
    res.status(200).json('Welcome to te PG API');
});

// Running expres server
app.listen(port, () => {
    console.log('Express servere is running');
});