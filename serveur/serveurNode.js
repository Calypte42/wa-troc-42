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
var ObjectId = require('mongodb').ObjectID;


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


// Renvoi tous les membres
    app.get('/membres', (req, res) => {
        res.setHeader('Content-type', 'application/json; charset=UTF-8');
        res.setHeader('access-control-allow-origin','*');
        db.collection("Membres").find().toArray((err, documents) => {
            let liste = [];
            for (let document of documents) {
                liste.push(document);
            }
            let json = JSON.stringify(liste);
            res.end(json);
        });
    });


// renvoi le membre correspondant à l email
    app.get('/membres/:email', (req, res) => {
        res.setHeader('Content-type', 'application/json; charset=UTF-8');
        res.setHeader('access-control-allow-origin','*');
        db.collection("Membres").find({'email':req.params.email}).toArray((err, documents) => {
            let liste = [];
            for (let document of documents) {
                liste.push(document);
            }
            let json = JSON.stringify(liste);
            res.end(json);
        });
    });

    // renvoi les membres correspondant au mot cle
        app.get('/membres/recherche/:motCle', (req, res) => {
            res.setHeader('Content-type', 'application/json; charset=UTF-8');
            res.setHeader('access-control-allow-origin','*');
            let motCle = new RegExp(req.params.motCle);
            db.collection("Membres").find({$or:[{'email':motCle},{'prenom':motCle},{'nom':motCle}]}).toArray((err, documents) => {
                let liste = [];
                for (let document of documents) {
                    liste.push(document);
                }
                let json = JSON.stringify(liste);
                res.end(json);
            });
        });



    // renvoi les membres correspondant a l email
        app.get('/membres/recherche/email/:email', (req, res) => {
            res.setHeader('Content-type', 'application/json; charset=UTF-8');
            res.setHeader('access-control-allow-origin','*');
            db.collection("Membres").find({'email':new RegExp(req.params.email)}).toArray((err, documents) => {
                let liste = [];
                for (let document of documents) {
                    liste.push(document);
                }
                let json = JSON.stringify(liste);
                res.end(json);
            });
        });
    // renvoi les membres correspondant au prenom
        app.get('/membres/recherche/prenom/:prenom', (req, res) => {
            res.setHeader('Content-type', 'application/json; charset=UTF-8');
            res.setHeader('access-control-allow-origin','*');
            db.collection("Membres").find({'prenom':new RegExp(req.params.prenom)}).toArray((err, documents) => {
                let liste = [];
                for (let document of documents) {
                    liste.push(document);
                }
                let json = JSON.stringify(liste);
                res.end(json);
            });
        });

        // renvoi les membres correspondant au nom
            app.get('/membres/recherche/nom/:nom', (req, res) => {
                res.setHeader('Content-type', 'application/json; charset=UTF-8');
                res.setHeader('access-control-allow-origin','*');
                db.collection("Membres").find({'nom':new RegExp(req.params.nom)}).toArray((err, documents) => {
                    let liste = [];
                    for (let document of documents) {
                        liste.push(document);
                    }
                    let json = JSON.stringify(liste);
                    res.end(json);
                });
            });



// renvoi les membres dont le role correspond
    app.get('/membres/role/:role', (req, res) => {
        res.setHeader('Content-type', 'application/json; charset=UTF-8');
        res.setHeader('access-control-allow-origin','*');
        db.collection("Membres").find({'role':req.params.role}).toArray((err, documents) => {
            let liste = [];
            for (let document of documents) {
                liste.push(document);
            }
            let json = JSON.stringify(liste);
            res.end(json);
        });
    });

// renvoi les membres d une ville
    app.get('/membres/ville/:ville', (req, res) => {
        res.setHeader('Content-type', 'application/json; charset=UTF-8');
        res.setHeader('access-control-allow-origin','*');
        db.collection("Membres").find({'ville':req.params.ville}).toArray((err, documents) => {
            let liste = [];
            for (let document of documents) {
                liste.push(document);
            }
            let json = JSON.stringify(liste);
            res.end(json);
        });
    });

// Renvoi les informations des membres qui propose des compétences
// dont le descriptif est passé en parametre.

    app.get('/membres/competence/:competence', (req, res) => {

        res.setHeader('Content-type', 'application/json; charset=UTF-8');
        res.setHeader('access-control-allow-origin','*');
        // On recupere tout d'abord les competences qui correspondent
        db.collection("Competences").aggregate([
            {
                $match: {"descriptif":new RegExp(req.params.competence)}
            },
            {
                $lookup: // On realise ensuite la jointure
                {
                    from: 'Membres', // en prenant la collection membres comme table de jointure
                    localField: 'email', // le champs de tri sur competences est email
                    foreignField: 'email', // le champs de tri sur membres est email
                    as: 'listeMembres' // On nomme le resultat de la jointure pour utilisation
                }
            }
        ]).toArray(function(err, documents) {
            let liste = [];
            for (let document of documents) {
                liste.push(document.listeMembres);
            }
            let json = JSON.stringify(liste);
            res.end(json);
        })
    });


/* -------------------------- REST Biens ---------------------------------*/
    app.get('/biens', (req, res) => {
        res.setHeader('Content-type', 'application/json; charset=UTF-8');
        res.setHeader('access-control-allow-origin','*');
        db.collection("Biens").find().toArray((err, documents) => {
            let liste = [];
            for (let document of documents) {
                liste.push(document);
            }
            let json = JSON.stringify(liste);
            res.end(json);
        });
    });

    app.get('/biens/type/:type', (req, res) => {
        res.setHeader('Content-type', 'application/json; charset=UTF-8');
        res.setHeader('access-control-allow-origin','*');
        db.collection("Biens").find({'type': new RegExp(req.params.type)}).toArray((err, documents) => {
            let liste = [];
            for (let document of documents) {
                liste.push(document);
            }
            let json = JSON.stringify(liste);
            res.end(json);
        });
    });


    app.get('/biens/type/:type/ville/:ville', (req, res) => {

        res.setHeader('Content-type', 'application/json; charset=UTF-8');
        res.setHeader('access-control-allow-origin','*');
        // On recupere tout d'abord les membres qui correspondent
        db.collection("Membres").aggregate([
            {
                $match: {"ville":req.params.ville}
            },
            {
                $lookup: // On realise ensuite la jointure
                {
                    from: 'Biens', // en prenant la collection biens comme table de jointure
                    localField: 'email', // le champs de tri sur competences est email
                    foreignField: 'email', // le champs de tri sur membres est email
                    as: 'listeBiens' // On nomme le resultat de la jointure pour utilisation
                }
            }
        ]).toArray(function(err, documents) {
            let liste = [];
            for (let document of documents) {
                for (let bien of document.listeBiens){
                    if (bien.type== req.params.type){
                      liste.push(bien);
                    }
                }
            }
            let json = JSON.stringify(liste);
            res.end(json);
        })
    });

    app.get('/biens/proprietaire/:personne', (req, res) => {

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


/*------------------- REST Competences ------------------------------------*/

    app.get('/competences', (req, res) => {
        res.setHeader('Content-type', 'application/json; charset=UTF-8');
        res.setHeader('access-control-allow-origin','*');
        db.collection("Competences").find().toArray((err, documents) => {
            let liste = [];
            for (let document of documents) {
                liste.push(document);
            }
            let json = JSON.stringify(liste);
            res.end(json);
        });
    });

    app.get('/competences/membre/:email', (req, res) => {
        let email = req.params.email;

        res.setHeader('Content-type', 'application/json; charset=UTF-8');
        res.setHeader('access-control-allow-origin','*');
        db.collection("Competences").find({"email":email}).toArray((err, documents) => {
            let liste = [];
            for (let document of documents) {
                liste.push(document);
            }
            let json = JSON.stringify(liste);
            res.end(json);
        });
    });

    app.get('/competences/id/:id', (req, res) => {
        let id = req.params.id;

        res.setHeader('Content-type', 'application/json; charset=UTF-8');
        res.setHeader('access-control-allow-origin','*');
        db.collection("Competences").find({"_id":new ObjectId(id)}).toArray((err, documents) => {
            let liste = [];
            for (let document of documents) {
                liste.push(document);
            }
            let json = JSON.stringify(liste);
            res.end(json);
        });
    });

/* ------------------- REST Utilisation -----------------------------------*/

    app.get('/utilisations', (req, res) => {
        res.setHeader('Content-type', 'application/json; charset=UTF-8');
        res.setHeader('access-control-allow-origin','*');
        db.collection("Utilisations").find().toArray((err, documents) => {
            let liste = [];
            for (let document of documents) {
                liste.push(document);
            }
            let json = JSON.stringify(liste);
            res.end(json);
        });
    });

    app.get('/utilisations/membre/preteur/biens/:email', (req, res) => {
        let email = req.params.email;
        res.setHeader('Content-type', 'application/json; charset=UTF-8');
        res.setHeader('access-control-allow-origin','*');
        db.collection("Biens").aggregate([
            {
                $match: {"email":email}
            },
            {
                $lookup: 
                {
                    from: 'Utilisations', 
                    localField: '_id',
                    foreignField: 'ID_comp_bien',
                    as: 'listeBiensUtilisations'
                }
            }
        ]).toArray(function(err, documents) {
            let liste = [];
            for (let document of documents) {
                for (let bienUtilisation of document.listeBiensUtilisations){
                    liste.push(bienUtilisation);
                }
            }
            let json = JSON.stringify(liste);
            res.end(json);
        })
    });

    app.get('/utilisations/membre/preteur/competences/:email', (req, res) => {
        let email = req.params.email;
        res.setHeader('Content-type', 'application/json; charset=UTF-8');
        res.setHeader('access-control-allow-origin','*');
        db.collection("Competences").aggregate([
            {
                $match: {"email":email}
            },
            {
                $lookup: 
                {
                    from: 'Utilisations', 
                    localField: '_id',
                    foreignField: 'ID_comp_bien',
                    as: 'listeCompetencesUtilisations'
                }
            }
        ]).toArray(function(err, documents) {
            let liste = [];
            for (let document of documents) {
                for (let competenceUtilisation of document.listeCompetencesUtilisations){
                    liste.push(competenceUtilisation);
                }
            }
            let json = JSON.stringify(liste);
            res.end(json);
        })
    });

    app.get('/utilisations/membre/utilisateur/:email', (req, res) => {
            let email = req.params.email;

            res.setHeader('Content-type', 'application/json; charset=UTF-8');
            res.setHeader('access-control-allow-origin','*');
            db.collection("Utilisations").find({"email":email}).toArray((err, documents) => {
                let liste = [];
                for (let document of documents) {
                    liste.push(document);
                }
                let json = JSON.stringify(liste);
                res.end(json);
            });
        });

    app.get('/utilisation/id/:id', (req, res) => {
        let id = req.params.id;

        res.setHeader('Content-type', 'application/json; charset=UTF-8');
        res.setHeader('access-control-allow-origin','*');
        db.collection("Utilisations").find({"_id":new ObjectId(id)}).toArray((err, documents) => {
            let liste = [];
            for (let document of documents) {
                liste.push(document);
            }
            let json = JSON.stringify(liste);
            res.end(json);
        });
    });

});

app.listen(8888);
