const express = require('express');
const db = require('./db.json');
const fs = require('fs');
const router = express.Router()


const validateWordInput = (req, res, next) => {
    const { word, translation } = req.body;

    db.list.map(item => {
        if (item.word === word) {
            return res.status(409).send("This word already exists");
        }
    })

    if (word === undefined && translation === undefined) {
        return res.status(422).send("word or translation is required");
    }

    if (word !== undefined && word.trim() === "") {
        return res.status(422).send("Word cannot be empty!");
    }

    if (translation !== undefined && translation.trim() === "") {
        return res.status(422).send("Translation cannot be empty!");
    }

    next();
};


// GET - words list
router.get('/', (req, res) => {
    res.send(db.list);
});

// POST - create a new word
router.post('/create', validateWordInput, (req, res) => {
    const { word, translation } = req.body;
    const data = db;
    data.list.push({
        id: Date.now(),
        word,
        translation 
    });
    try {
        fs.writeFile('./db.json', JSON.stringify(data, null, 2), (err) => {
            if (err) {
                res.status(500).send("Xeta bash verrdi")
            }
        });
        res.sendStatus(201);
    } catch (err) {
        res.status(500).send("Xəta baş verdi!");
    }
});

// PUT - update an existing word
router.put('/:id', validateWordInput, (req, res) => {
    const id = req.params.id;
    const object = db.list.find(item => item.id == id);

    if (!object) {
        return res.status(404).send("Məlumat tapılmadı!");
    }

    const { word, translation } = req.body;

    const newData = db.list.map(item => {
        if (item.id == id) {
            item.word = word || item.word;
            item.translation = translation || item.translation;
        }
        return item;
    });

    try {
        fs.writeFile('./db.json', JSON.stringify({ list: newData }, null, 2), (err) => {
            if (err) {
                console.error(err);
                return res.status(500).send("Xəta baş verdi!");
            }
            res.sendStatus(200);
        });
    } catch (err) {
        res.status(500).send("Xəta baş verdi!");
    }
});


// DELETE - delete a word by id
router.delete('/:id', (req, res) => {
    const id = req.params.id;
    const object = db.list.find(item => item.id == id);
    if (!object) return res.status(404).send("Məlumat tapılmadı!");

    const newData = db.list.filter(item => item.id != id);

    try {
        fs.writeFile('./db.json', JSON.stringify({ list: newData }, null, 2), (err) => {
            if (err) {
                console.log(err);
            }
        });
        res.sendStatus(200);
    } catch (err) {
        res.status(500).send("Xəta baş verdi!");
    }
});


// SEARCH - search for a word
router.get('/search', (req, res) => {
    const { query } = req.query;
    if (!query) {
        return res.status(400).send("Axtarış sorğusu tələb olunur");
    }

    const results = db.list.filter(item =>
        item.word.toLowerCase().includes(query.toLowerCase()) ||
        item.translation.toLowerCase().includes(query.toLowerCase())
    );

    if (results.length === 0) {
        return res.status(404).send("Axtarılan məlumat tapılmadı");
    }

    res.json(results);
});

module.exports = router
