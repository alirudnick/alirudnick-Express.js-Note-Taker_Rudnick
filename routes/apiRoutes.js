const note = require('../db/db.json');

module.exports = function(app) {
    app.get('/api/notes/', function(req, res) {
        res.json(note);
    });

    app.post('/api/notes/', function(req, res){
        note.push(req.body);
        res.json(true);
    })
    
    app.delete('/api/notes', function(req, res){
        note.length=0;
        res.json({ok:true});
    })
};