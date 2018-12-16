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
var bodyParser = require('body-parser');
var ObjectId = require('mongodb').ObjectID;

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

MongoClient.connect(url, {
    useNewUrlParser: true
}, (err, client) => {



    let db = client.db("TROC");
    assert.equal(null, err);

    console.log("Serveur connecté ! ");

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
        res.setHeader('access-control-allow-origin', '*');
        db.collection("Membres").find().toArray((err, documents) => {
            let liste = [];
            for (let document of documents) {
                liste.push(document);
            }
            let json = JSON.stringify(liste);
            res.end(json);
        });
    });


    // Renvoi tous les membres bloquer ou qui peuvent l etre
    app.get('/membres/blocage', (req, res) => {
        res.setHeader('Content-type', 'application/json; charset=UTF-8');
        res.setHeader('access-control-allow-origin', '*');
        db.collection("Membres").find({
            $or: [{
                'score': {
                    $lte: -5
                }
            }, {
                'status': 'bloquer'
            }]
        }).toArray((err, documents) => {
            let liste = [];
            for (let document of documents) {
                liste.push(document);
            }
            let json = JSON.stringify(liste);
            res.end(json);
        });
    });

    app.put('/membre/debloquerMembre/:id', (req, res) => {
        let id = req.params.id;
        res.setHeader('Content-type', 'application/json; charset=UTF-8');
        res.setHeader('access-control-allow-origin', '*');
        db.collection('Membres').update({
            '_id': ObjectId(id)
        }, {
            $set: {
                'status': 'debloquer'
            }
        });
        res.status(200);
        res.end;
    })

    app.put('/membre/bloquerMembre/:id', (req, res) => {
        let id = req.params.id;
        res.setHeader('Content-type', 'application/json; charset=UTF-8');
        res.setHeader('access-control-allow-origin', '*');
        db.collection('Membres').update({
            '_id': ObjectId(id)
        }, {
            $set: {
                'status': 'bloquer'
            }
        });
        res.status(200);
        res.end;
    })

    app.put('/update/membre/:email', (req, res) => {
        let email = req.params.email;
        res.setHeader('Content-type', 'application/json; charset=UTF-8');
        res.setHeader('access-control-allow-origin', '*');
        db.collection('Membres').update({
            'email': email
        }, {
            $set: {
                "MDP": req.body["mdp"],
                "nom": req.body["nom"],
                "prenom": req.body["prenom"],
                "ville": req.body["ville"],
                "adresse": req.body["adresse"],
                "telephone": req.body["telephone"]
            }
        });
        res.status(200);
        res.end;
    })

    // renvoi le membre correspondant à l email
    app.get('/membres/email/:email', (req, res) => {
        res.setHeader('Content-type', 'application/json; charset=UTF-8');
        res.setHeader('access-control-allow-origin', '*');
        db.collection("Membres").find({
            'email': req.params.email
        }).toArray((err, documents) => {
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
        res.setHeader('access-control-allow-origin', '*');
        let motCle = new RegExp(req.params.motCle);
        db.collection("Membres").find({
            $or: [{
                'email': motCle
            }, {
                'prenom': motCle
            }, {
                'nom': motCle
            }]
        }).toArray((err, documents) => {
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
        res.setHeader('access-control-allow-origin', '*');
        db.collection("Membres").find({
            'email': new RegExp(req.params.email)
        }).toArray((err, documents) => {
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
        res.setHeader('access-control-allow-origin', '*');
        db.collection("Membres").find({
            'prenom': new RegExp(req.params.prenom)
        }).toArray((err, documents) => {
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
        res.setHeader('access-control-allow-origin', '*');
        db.collection("Membres").find({
            'nom': new RegExp(req.params.nom)
        }).toArray((err, documents) => {
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
        res.setHeader('access-control-allow-origin', '*');
        db.collection("Membres").find({
            'role': req.params.role
        }).toArray((err, documents) => {
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
        res.setHeader('access-control-allow-origin', '*');
        db.collection("Membres").find({
            'ville': req.params.ville
        }).toArray((err, documents) => {
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

    app.get('/membres/competence/:id', (req, res) => {

        res.setHeader('Content-type', 'application/json; charset=UTF-8');
        res.setHeader('access-control-allow-origin', '*');
        // On recupere tout d'abord les competences qui correspondent
        db.collection("Competences").aggregate([{
                $match: {
                    "_id": ObjectId(req.params.id)
                }
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
                liste.push(document);
            }
            let json = JSON.stringify(liste);
            res.end(json);
        })
    });

    app.get('/membres/bien/:id', (req, res) => {

        res.setHeader('Content-type', 'application/json; charset=UTF-8');
        res.setHeader('access-control-allow-origin', '*');
        // On recupere tout d'abord les competences qui correspondent
        db.collection("Biens").aggregate([{
                $match: {
                    "_id": ObjectId(req.params.id)
                }
            },
            {
                $lookup: // On realise ensuite la jointure
                {
                    from: 'Membres', // en prenant la collection membres comme table de jointure
                    localField: 'email', // le champs de tri sur biens est email
                    foreignField: 'email', // le champs de tri sur membres est email
                    as: 'listeMembres' // On nomme le resultat de la jointure pour utilisation
                }
            },
            {
                $lookup: // On realise ensuite la jointure
                {
                    from: 'Utilisations', // en prenant la collection membres comme table de jointure
                    localField: '_id', // le champs de tri sur biens est email
                    foreignField: 'ID_comp_bien', // le champs de tri sur membres est email
                    as: 'listeUtilisations' // On nomme le resultat de la jointure pour utilisation
                }
            }
        ]).toArray(function(err, documents) {
            let liste = [];
            for (let document of documents) {
                if (document['listeUtilisations'] != null) {
                    let nombreUtilisations = document['listeUtilisations'].length;
                    document['derniereUtilisation'] = document['listeUtilisations'][nombreUtilisations - 1];
                    delete document['listeUtilisations'];
                }
                liste.push(document);
            }
            let json = JSON.stringify(liste);
            res.end(json);
        })
    });



    app.get('/membres/authentification/:email/:password', (req, res) => {
        res.setHeader('Content-type', 'application/json; charset=UTF-8');
        res.setHeader('access-control-allow-origin', '*');
        db.collection("Membres").find({
            'email': req.params.email,
            'MDP': req.params.password
        }).toArray((err, documents) => {
            let liste = [];
            for (let document of documents) {
                liste.push(document);
            }
            let json = JSON.stringify(liste);
            res.end(json);
        });
    });


    /*----------------------------- POST Membres -----------------------------*/


    app.post('/add/membre', (req, res) => {
        console.log(req.body);
        db.collection("Membres").insert({
            "email": req.body["email"],
            "MDP": req.body["mdp"],
            "nom": req.body["nom"],
            "prenom": req.body["prenom"],
            "role": req.body["role"],
            "status": "debloquer",
            "score": 0,
            "ville": req.body["ville"],
            "adresse": req.body["adresse"],
            "telephone": req.body["telephone"]
        });
        res.status(200);
        res.end();
    });



    /* -------------------------- REST Biens ---------------------------------*/
    /*----------------------------- GET Biens -----------------------------*/
    app.get('/biens', (req, res) => {
        res.setHeader('Content-type', 'application/json; charset=UTF-8');
        res.setHeader('access-control-allow-origin', '*');
        db.collection("Biens").find().toArray((err, documents) => {
            let liste = [];
            for (let document of documents) {
                liste.push(document);
            }
            let json = JSON.stringify(liste);
            res.end(json);
        });
    });

    app.get('/biens/ville/:ville', (req, res) => {
        let ville = req.params.ville;
        res.setHeader('Content-type', 'application/json; charset=UTF-8');
        res.setHeader('access-control-allow-origin', '*');
        db.collection("Biens").find({"ville":ville}).toArray((err, documents) => {
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
        res.setHeader('access-control-allow-origin', '*');
        db.collection("Biens").find({
            'type': new RegExp(req.params.type)
        }).toArray((err, documents) => {
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
        res.setHeader('access-control-allow-origin', '*');
        // On recupere tout d'abord les membres qui correspondent
        db.collection("Membres").aggregate([{
                $match: {
                    "ville": req.params.ville
                }
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
                for (let bien of document.listeBiens) {
                    if (bien.type == req.params.type) {
                        liste.push(bien);
                    }
                }
            }
            let json = JSON.stringify(liste);
            res.end(json);
        })
    });

    app.get('/biens/avecUtilisations', (req, res) => {
        res.setHeader('Content-type', 'application/json; charset=UTF-8');
        res.setHeader('access-control-allow-origin', '*');
        db.collection("Biens").aggregate([{
                $lookup: {
                    from: 'Utilisations',
                    localField: '_id',
                    foreignField: 'ID_comp_bien',
                    as: 'listeBiensUtilisations'
                }
            },
            {
                $sort: {
                    date: 1
                }
            }
        ]).toArray(function(err, documents) {
            let liste = [];
            for (let document of documents) {
                liste.push(document);
            }
            let json = JSON.stringify(liste);
            res.end(json);
        })
    });

    app.get('/biens/avecUtilisations/identifie/:email', (req, res) => {
        let email = req.params.email;
        res.setHeader('Content-type', 'application/json; charset=UTF-8');
        res.setHeader('access-control-allow-origin', '*');
        db.collection("Biens").aggregate([{
                $match: {
                    "email": {
                        "$nin": [email]
                    }
                }
            },
            {
                $lookup: {
                    from: 'Utilisations',
                    localField: '_id',
                    foreignField: 'ID_comp_bien',
                    as: 'listeBiensUtilisations'
                }
            },
            {
                $sort: {
                    date: 1
                }
            }
        ]).toArray(function(err, documents) {
            let liste = [];
            for (let document of documents) {
                liste.push(document);
            }
            let json = JSON.stringify(liste);
            res.end(json);
        })
    });

    app.get('/biens/avecUtilisations/membre/:email', (req, res) => {
        let email = req.params.email;
        res.setHeader('Content-type', 'application/json; charset=UTF-8');
        res.setHeader('access-control-allow-origin', '*');
        db.collection("Biens").aggregate([{
                $match: {
                    "email": email
                }
            },
            {
                $lookup: {
                    from: 'Utilisations',
                    localField: '_id',
                    foreignField: 'ID_comp_bien',
                    as: 'listeBiensUtilisations'
                }
            },
            {
                $sort: {
                    date: 1
                }
            }
        ]).toArray(function(err, documents) {
            let liste = [];
            for (let document of documents) {
                liste.push(document);
            }
            let json = JSON.stringify(liste);
            res.end(json);
        })
    });

    app.get('/biens/membre/:email', (req, res) => {
        let email = req.params.email;

        res.setHeader('Content-type', 'application/json; charset=UTF-8');
        res.setHeader('access-control-allow-origin', '*');
        db.collection("Biens").find({
            "email": email
        }).toArray((err, documents) => {
            let liste = [];
            for (let document of documents) {
                liste.push(document);
            }
            let json = JSON.stringify(liste);
            res.end(json);
        });
    });

    app.get('/biens/proprietaire/:personne', (req, res) => {

        let personne = req.params.personne;

        res.setHeader('Content-type', 'application/json; charset=UTF-8');
        db.collection("Membres").aggregate([{
                $match: {
                    "nom": personne
                }
            },
            {
                $lookup: {
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

    app.get('/biens/id/:id', (req, res) => {
        let id = req.params.id;

        res.setHeader('Content-type', 'application/json; charset=UTF-8');
        res.setHeader('access-control-allow-origin', '*');
        db.collection("Biens").find({
            "_id": new ObjectId(id)
        }).toArray((err, documents) => {
            let liste = [];
            for (let document of documents) {
                liste.push(document);
            }
            let json = JSON.stringify(liste);
            res.end(json);
        });
    });

    /*----------------------------- POST Biens -----------------------------*/

    app.post('/add/bien', (req, res) => {
        console.log(req.body);
        db.collection("Biens").insert({
            "email": req.body["email"],
            "descriptif": req.body["descriptif"],
            "type": req.body["type"],
            "mots_clefs": req.body["mots_clefs"],
            "photo": req.body["photo"],
            "prix_neuf": req.body["prix_neuf"]
        });
        res.status(200);
        res.end();
    });

    /*----------------------------UPDATE Biens -----------------------------*/

    app.put('/update/bien/:id', (req, res) => {
        let id = req.params.id;
        console.log("Je suis dans la modification de : " + id);
        db.collection("Biens").update({
                "_id": ObjectId(id)
            }, {
                $set: {
                    "descriptif": req.body["descriptif"],
                    "type": req.body["type"],
                    "mots_clefs": req.body["mots_clefs"],
                    "photo": req.body["photo"],
                    "prix_neuf": req.body["prix_neuf"]
                }
            }

        );
        res.status(200);
        res.end();
    });

    /* -------------------     DELETE Bien  -----------------------------------*/

    app.delete('/delete/bien/:id', (req, res) => {
        let id = req.params.id;
        console.log("Je suis dans la suppression de : " + id);
        let filtre = {
            "_id": ObjectId(id)
        };
        console.log(JSON.stringify(filtre));
        db.collection("Biens").deleteOne(
            filtre
        );
        res.status(200);
        res.end();
    });


    /*------------------- REST Competences ------------------------------------*/

    app.get('/competences', (req, res) => {
        console.log("je suis dans /competences");
        res.setHeader('Content-type', 'application/json; charset=UTF-8');
        res.setHeader('access-control-allow-origin', '*');
        db.collection("Competences").find().toArray((err, documents) => {
            let liste = [];
            for (let document of documents) {
                liste.push(document);
            }
            let json = JSON.stringify(liste);
            console.log(json);
            res.end(json);
        });
    });


    app.get('/competences/ville/:ville', (req, res) => {
        let ville = req.params.ville;
        res.setHeader('Content-type', 'application/json; charset=UTF-8');
        res.setHeader('access-control-allow-origin', '*');
        db.collection("Membres").aggregate([{
                $match: {
                    "ville": ville
                }
            },
            {
                $lookup: {
                    from: 'Competences',
                    localField: 'email',
                    foreignField: 'email',
                    as: 'listeBiensUtilisations'
                }
            }
        ]).toArray(function(err, documents) {
            let liste = [];
            for (let document of documents) {
                for (let bienUtilisation of document.listeBiensUtilisations) {
                    liste.push(bienUtilisation);
                }
            }
            let json = JSON.stringify(liste);
            res.end(json);
        })
    });

    app.get('/competences/membre/:email', (req, res) => {
        let email = req.params.email;

        res.setHeader('Content-type', 'application/json; charset=UTF-8');
        res.setHeader('access-control-allow-origin', '*');
        db.collection("Competences").find({
            "email": email
        }).toArray((err, documents) => {
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
        res.setHeader('access-control-allow-origin', '*');
        db.collection("Competences").find({
            "_id": new ObjectId(id)
        }).toArray((err, documents) => {
            let liste = [];
            for (let document of documents) {
                liste.push(document);
            }
            let json = JSON.stringify(liste);
            res.end(json);
        });
    });

    /* -------------------     POST COMPETENCE  -----------------------------------*/

    app.post('/add/competence', (req, res) => {
        console.log(req.body);
        db.collection("Competences").insert({

            "descriptif": req.body["descriptif"],
            "mots_clefs": req.body["motsCle"],
            "email": req.body["email"],
            "disponibilite": req.body["disponibilite"]
        });
        res.status(200);
        res.end();
    });


    /* -------------------     DELETE COMPETENCE  -----------------------------------*/

    app.delete('/delete/competence/:id', (req, res) => {
        let id = req.params.id;
        console.log("Je suis dans la suppression de : " + id);
        let filtre = {
            "_id": ObjectId(id)
        };
        console.log(JSON.stringify(filtre));
        db.collection("Competences").deleteOne(
            filtre
        );
        res.status(200);
        res.end();
    });


    /* -------------------     UPDATE COMPETENCE  -----------------------------------*/

    app.put('/update/competence/:id', (req, res) => {
        let id = req.params.id;
        console.log("Je suis dans la modification de : " + id);
        db.collection("Competences").update({
                "_id": ObjectId(id)
            }, {
                $set: {
                    "descriptif": req.body["descriptif"],
                    "mots_clefs": req.body["motsCle"]
                }
            }

        );
        res.status(200);
        res.end();
    });


    app.put('/update/disponibilite/:id', (req, res) => {
        let id = req.params.id;
        console.log("Je suis dans la modification des disponibilite de : " + id);
        db.collection("Competences").update({
                "_id": ObjectId(id)
            }, {
                $set: {
                    "disponibilite": req.body["disponibilite"]
                }
            }

        );
        res.status(200);
        res.end();
    });

    /* ------------------- REST Utilisation -----------------------------------*/

    app.get('/utilisations', (req, res) => {
        res.setHeader('Content-type', 'application/json; charset=UTF-8');
        res.setHeader('access-control-allow-origin', '*');
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
        res.setHeader('access-control-allow-origin', '*');
        db.collection("Biens").aggregate([{
                $match: {
                    "email": email
                }
            },
            {
                $lookup: {
                    from: 'Utilisations',
                    localField: '_id',
                    foreignField: 'ID_comp_bien',
                    as: 'listeBiensUtilisations'
                }
            }
        ]).toArray(function(err, documents) {
            let liste = [];
            for (let document of documents) {
                for (let bienUtilisation of document.listeBiensUtilisations) {
                    liste.push(bienUtilisation);
                }
            }
            let json = JSON.stringify(liste);
            res.end(json);
        })
    });

    app.get('/utilisations/membre/preteur/biens/demandeEmprunt/:email', (req, res) => {
        let email = req.params.email;
        res.setHeader('Content-type', 'application/json; charset=UTF-8');
        res.setHeader('access-control-allow-origin', '*');
        db.collection("Biens").aggregate([{
                $match: {
                    "email": email
                }
            },
            {
                $lookup: {
                    from: 'Utilisations',
                    localField: '_id',
                    foreignField: 'ID_comp_bien',
                    as: 'listeBiensUtilisations'
                }
            },
            {
                "$unwind": "$listeBiensUtilisations"
            },
            {
                $match: {
                    "listeBiensUtilisations.status": {
                        $in: ["attente", "en_cours"]
                    }
                }
            },
            {
                $lookup: {
                    from: "Membres",
                    localField: "listeBiensUtilisations.email",
                    foreignField: "email",
                    as: "emprunteur"
                }
            },
            {
                "$unwind": "$emprunteur"
            }
        ]).toArray(function(err, documents) {
            let liste = [];
            for (let document of documents) {
                console.log(document);
                let bienUtilisation = document['listeBiensUtilisations'];
                bienUtilisation['emprunteur'] = document['emprunteur'];
                delete document['listeBiensUtilisations'];
                delete document['emprunteur'];
                bienUtilisation['bien'] = document;
                liste.push(bienUtilisation);
            }
            let json = JSON.stringify(liste);
            res.end(json);
        })
    });

    app.get('/utilisations/membre/preteur/competences/service/:email', (req, res) => {
        let email = req.params.email;
        res.setHeader('Content-type', 'application/json; charset=UTF-8');
        res.setHeader('access-control-allow-origin', '*');
        db.collection("Competences").aggregate([{
                $match: {
                    "email": email
                }
            },
            {
                $lookup: {
                    from: 'Utilisations',
                    localField: '_id',
                    foreignField: 'ID_comp_bien',
                    as: 'listeCompetencesUtilisations'
                }
            },
            {
                "$unwind": "$listeCompetencesUtilisations"
            },
            {
                $match: {
                    "listeCompetencesUtilisations.status": {
                        $in: ["attente", "en_cours"]
                    }
                }
            },
            {
                $lookup: {
                    from: "Membres",
                    localField: "listeCompetencesUtilisations.email",
                    foreignField: "email",
                    as: "utilisateur"
                }
            },
            {
                "$unwind": "$utilisateur"
            }
        ]).toArray(function(err, documents) {
            let liste = [];
            for (let document of documents) {
                console.log(document);
                let serviceUtilisation = document['listeCompetencesUtilisations'];
                serviceUtilisation['utilisateur'] = document['utilisateur'];
                delete document['listeCompetencesUtilisations'];
                delete document['utilisateur'];
                delete document['disponibilite'];
                let date = serviceUtilisation['date'].split('/');
                serviceUtilisation['date'] = date[0];
                serviceUtilisation['heureD'] = date[1];
                serviceUtilisation['heureF'] = date[2];
                serviceUtilisation['competence'] = document;
                liste.push(serviceUtilisation);
            }
            let json = JSON.stringify(liste);
            res.end(json);
        })
    });

    app.get('/utilisations/membre/preteur/competences/:email', (req, res) => {
        let email = req.params.email;
        res.setHeader('Content-type', 'application/json; charset=UTF-8');
        res.setHeader('access-control-allow-origin', '*');
        db.collection("Competences").aggregate([{
                $match: {
                    "email": email
                }
            },
            {
                $lookup: {
                    from: 'Utilisations',
                    localField: '_id',
                    foreignField: 'ID_comp_bien',
                    as: 'listeCompetencesUtilisations'
                }
            }
        ]).toArray(function(err, documents) {
            let liste = [];
            for (let document of documents) {
                for (let competenceUtilisation of document.listeCompetencesUtilisations) {
                    liste.push(competenceUtilisation);
                }
            }
            let json = JSON.stringify(liste);
            res.end(json);
        })
    });

    app.get('/utilisations/membre/utilisateur/biens/:email', (req, res) => {
        let email = req.params.email;

        res.setHeader('Content-type', 'application/json; charset=UTF-8');
        res.setHeader('access-control-allow-origin', '*');
        db.collection("Utilisations").aggregate([{
                $match: {
                    "email": email
                }
            },
            {
                $lookup: {
                    from: 'Biens',
                    localField: 'ID_comp_bien',
                    foreignField: '_id',
                    as: 'bien'
                }
            },
            {
                "$unwind": "$bien"
            },
            {
                $lookup: {
                    from: "Membres",
                    localField: "bien.email",
                    foreignField: "email",
                    as: "preteur"
                }
            },
            {
                "$unwind": "$preteur"
            }
        ]).toArray((err, documents) => {
            let liste = [];
            for (let document of documents) {
                liste.push(document);
            }
            let json = JSON.stringify(liste);
            res.end(json);
        });
    });

    app.get('/utilisations/membre/utilisateur/competences/:email', (req, res) => {
        let email = req.params.email;

        res.setHeader('Content-type', 'application/json; charset=UTF-8');
        res.setHeader('access-control-allow-origin', '*');
        db.collection("Utilisations").aggregate([{
                $match: {
                          $and: [
                              {email: {$in: [email]}},
                              {status: {$in: ["en_cours", "attente"]}}
                          ]
                     }
            },
            {
                $lookup: {
                    from: 'Competences',
                    localField: 'ID_comp_bien',
                    foreignField: '_id',
                    as: 'competence'
                }
            },
            {
                "$unwind": "$competence"
            },
            {
                $lookup: {
                    from: "Membres",
                    localField: "competence.email",
                    foreignField: "email",
                    as: "fournisseur"
                }
            },
            {
                "$unwind": "$fournisseur"
            }
        ]).toArray((err, documents) => {
            let liste = [];
            for (let document of documents) {

                let date = document["date"].split("/");
                document["date"] = date[0]
                document["heureD"] = date[1]
                document["heureF"] = date[2]
                delete document["competence"]["disponibilite"]
                liste.push(document);
            }
            let json = JSON.stringify(liste);
            res.end(json);
        });
    });

    app.get('/utilisations/id/:id', (req, res) => {
        let id = req.params.id;

        res.setHeader('Content-type', 'application/json; charset=UTF-8');
        res.setHeader('access-control-allow-origin', '*');
        db.collection("Utilisations").find({
            "_id": new ObjectId(id)
        }).toArray((err, documents) => {
            let liste = [];
            for (let document of documents) {
                liste.push(document);
            }
            let json = JSON.stringify(liste);
            res.end(json);
        });
    });

    /* -------------------     POST UTILISATION  -----------------------------------*/

    app.post('/add/utilisation', (req, res) => {
        let donnees = {
            "email": req.body["email"],
            "ID_comp_bien": ObjectId(req.body["ID_comp_bien"]),
            "type": req.body["type"],
            "status": "attente"
        };
        if (req.body["type"] == "competence") {
            donnees["date"] = req.body["date"] + "/" + req.body["heureD"] + "/" + req.body["heureF"];
        } else {
            donnees["date"] = new Date(Date.now());
        }
        db.collection("Utilisations").insert(donnees);
        db.collection("Membres").update({
                "email": req.body["email"]
            }, {
                $inc: {
                    score: -1
                }
            }

        );
        res.status(200);
        res.end();
    });

    /*----------------------------UPDATE UTILISATION -----------------------------*/

    app.put('/update/utilisation/:id', (req, res) => {
        let id = req.params.id;
        db.collection("Utilisations").update({
                "_id": ObjectId(id)
            }, {
                $set: {
                    "status": req.body["status"]
                }
            }

        );
        if (req.body["status"] == "en_cours") {
            db.collection("Membres").update({
                    "email": req.body["emailFournisseur"]
                }, {
                    $inc: {
                        score: 1
                    }
                }

            );
        }
        res.status(200);
        res.end();
    });



    app.put('/update/utilisation/remboursement/:email', (req, res) => {
        let email = req.params.email;
        res.setHeader('Content-type', 'application/json; charset=UTF-8');
        res.setHeader('access-control-allow-origin', '*');
        db.collection("Membres").update({
                "email": email
            }, {
                $inc: {
                    score: 1
                }
            }

        );
        res.status(200);
        res.end;
    })

    /* -------------------     DELETE UTILISATION  -----------------------------------*/

    app.delete('/delete/utilisation/:id', (req, res) => {
        let id = req.params.id;
        let filtre = {
            "_id": ObjectId(id)
        };
        db.collection("Utilisations").deleteOne(
            filtre
        );
        res.status(200);
        res.end();
    });

});

app.listen(8888);
