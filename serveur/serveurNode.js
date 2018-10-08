// pour l'installation de express et mongo db
// dans le dossier faire un npm init
// npm install express --save
// npm install mongodb --save
// ne pas oublier de lancer mongo
// sudo service mongod start



"use strict";
var assert = require('assert');
var express = require('express');
var app = express();
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017";


MongoClient.connect(url, {useNewUrlParser: true}, (err, client) => {
    let db = client.db("TROC");
    assert.equal(null, err);

    app.get('/', (req, res) => {
        res.setHeader('Content-type', 'text/html');
        research(db, (html) => {
            res.end(html);
        });
    });


/* -----------------------REST Membres ------------------------------------- */

    app.get('/Membres', (req, res) => {
        res.setHeader('Content-type', 'application/json; charset=UTF-8');
        db.collection("Membres").find().toArray((err, documents) => {
            let liste = [];
            for (let document of documents) {
                liste.push(document['email']);
            }
            let json = JSON.stringify(liste);
            res.end(json);
        });
    });


/* -------------------------- REST Biens ---------------------------------*/
    app.get('/Biens', (req, res) => {
        res.setHeader('Content-type', 'application/json; charset=UTF-8');
        db.collection("Biens").find().toArray((err, documents) => {
            let liste = [];
            for (let document of documents) {
                liste.push(document['descriptif']);
            }
            let json = JSON.stringify(liste);
            res.end(json);
        });
    });

    app.get('/Biens/proprietaire/:personne', (req, res) => {

        let personne = req.params.personne;

        res.setHeader('Content-type', 'application/json; charset=UTF-8');
        db.collection("Membres").aggregate([
            {
                $match: {"nom":personne}
            },
            {
                $lookup:
                {
                    from: 'Biens',
                    localField: 'email',
                    foreignField: 'email',
                    as: 'listeBiens'
                }
            }
        ]).toArray(function(err, documents) {
            let liste = [];
            for (let document of documents) {
                liste.push(document.listeBiens);
            }
            let json = JSON.stringify(liste);
            res.end(json);
        })
    });


/*------------------- REST Competences ------------------------------------


/* ------------------- REST Utilisation -----------------------------------
});

app.listen(8888);
