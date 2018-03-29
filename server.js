const express = require('express');
const session = require('express-session')
require('dotenv').config()
const compression = require('compression')
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;
const assert = require('assert');
const app = express();
const PORT = process.env.PORT || 3000;
const URL = `mongodb://${process.env.MONGOUSER}:${process.env.MONGOPASS}@ds119129.mlab.com:19129/${process.env.DBNAME}`
// app.use('*', (req, res, next) => {
//     if (req.headers['x-forwarded-proto'] !== 'https') {
//         return res.redirect('https://' + req.headers.host + req.url)
//     } else {
//         return next();
//     }
// })


app.use(compression());
app.use(express.static(__dirname + '/dist'));
app.use(session({ secret: 'SECRET TOKEN', cookie: {secure: false, maxAge: 60000}, resave: false, saveUninitialized: true}));
app.get('/', (req, res) => {
    let sessData = req.session;
    res.sendFile('index.html');
})

app.get('/api/search', (req, res) => {
    let searchReq = req.query;
    let sessData = req.session;
    MongoClient.connect(URL, (err, client) => {
        assert.equal(null, err);
        console.log("CONNECT");
        const db = client.db(process.env.DBNAME)
        findDocuments(db, searchReq, (documents) => {
            sessData.board = documents[0];
            sessData.save()
            res.send(documents[0]);
        })
        
    })
})

app.get('/api/board', (req, res) => {
    console.log("BOARD")
    console.log(req.session)
    let sessData = req.session
    
    if (sessData.board) {
        console.log("SESSION")
        let board = req.session.baord;
        console.log(board);
        res.send(board)
    } else {
        console.log("NOT FOUND")
        let searchReq = req.query;
        MongoClient.connect(URL, (err, client) => {
            assert.equal(null, err);
            console.log("CONNECT");
            const db = client.db(process.env.DBNAME)
            findDocuments(db, searchReq, (documents) => {
                sessData.board = documents[0];
                res.send(documents[0]);
            })

        })
    }
})
app.post('/api/save', (req, res) => {
    let board = req.query.board;
    console.log(JSON.parse(board))
    MongoClient.connect(URL, (err, client) => {
        assert.equal(null, err);
        console.log("CONNECT")
        const db = client.db(process.env.DBNAME)
        updateDocuments(db, JSON.parse(board), () => {
            console.log("DONE")
            res.sendStatus(200);
        })
    })
})
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
});

const findDocuments = (db, data, cb) => {
    const collection = db.collection(process.env.DBNAME);
    console.log(data)
    collection.find({'name': data.board}).toArray((err, docs) => {
        assert.equal(err, null);
        console.log("FOUND");
        cb(docs);
    })
}

const updateDocuments = (db, data, cb) => {
    const collection = db.collection(process.env.DBNAME);
    let id = data["_id"];
    delete data['_id']
    console.log(data);
    collection.replaceOne(
        { "_id": ObjectId(id)},
        data,
    )
    cb()
}