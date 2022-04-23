const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const {v4 : uuidv4} = require('uuid');
//middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
const PORT = process.env.PORT || 3001;


//home
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

//notes
app.get('/notes', function (req, res) {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

//get the notes
app.get("/api/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "/db/db.json"));
  });

//posting the notes
app.post("/api/notes", function (req, res) {
    var newNote = req.body;
    var idofNote = uuidv4()
    newNote.id= idofNote;
    res.sendFile(path.join(__dirname, "./db/db.json"));
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) throw err;
    
        let noteInput = JSON.parse(data);
        noteInput.push(newNote);
        
        
        fs.writeFile("./db/db.json", JSON.stringify(noteInput), "utf-8", (err) => {
            if (err) throw err;
            console.log("note saved");
        });
    })
});





app.listen(PORT, () => {
    console.log('API server is ready on port ${PORT}')
});