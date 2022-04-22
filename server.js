const express = require('express');
const app = express();
const path = require('path');
//app.use
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'Develop/public/index.html'));
});

app.get('/notes', function (req, res) {
    res.sendFile(path.join(__dirname, 'Develop/public/notes.html'));
});

app.listen(3001, () => {
    console.log(`API server now on port 3001!`);
})