const router = require('express').Router();
const fs = require('fs');
const path = require('path');
const uuid = require('./helpers/uuid');
const util = require('../helpers/fsUtils');

//to get note data
router.get('/notes', (req, res) => {
  util.readFromFile(path.join(__dirname, '../db/db.json')).then((data) => {
    const jsonData = JSON.parse(data);
    res.json(jsonData);
  })
});

//to add new note
router.post('/notes', (req, res) => {
  const {
    title,
    text
  } = req.body;
  if (title && text) {
    const newNote = {
      title,
      text,
      id: uuid(),
    };


    util.readAndAppend(newNote, 'db/db.json');

    const response = {
      status: 'Success!',
      body: newNote,
    };

    res.json(response);
  } else {
    res.status(500).json('Error in adding note');
  }
 });

//to delete notes
router.delete('/notes/:id', (req, res) => {
  console.log(req.params.id);
  util.readFromFile(path.join(__dirname, '../db/db.json')).then((data) => {
    let db = JSON.parse(data);
    let deleteNote = db.filter(item => item.id !== req.params.id);
    util.writeToFile('db/db.json', deleteNote);
    res.json(deleteNote);
  });
});

module.exports = router;