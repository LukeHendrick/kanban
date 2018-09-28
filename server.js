const express = require('express');
const session = require('express-session');
require('dotenv').config();
const compression = require('compression');
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;
const assert = require('assert');
const path = require('path');
const words = require('./src/utils/words.json');
const titleCase = require('./src/utils/titleCase');
const UUID = require('./src/utils/uuid');

const app = express();

const PORT = process.env.PORT || 3000;
const URL = `mongodb://${process.env.MONGOUSER}:${process.env.MONGOPASS}@ds119129.mlab.com:19129/${
  process.env.DBNAME
}`;

app.use('*', (req, res, next) => {
  if (req.headers['x-forwarded-proto'] !== 'https') {
    return res.redirect(`https://${req.headers.host}${req.url}`);
  }
  return next();
});

const findDocuments = (db, data, cb) => {
  const collection = db.collection(process.env.DBNAME);
  collection.find({ name: data.board }).toArray((err, docs) => {
    assert.equal(err, null);
    cb(docs);
  });
};

const updateDocuments = (db, data, cb) => {
  const collection = db.collection(process.env.DBNAME);
  const newData = data;
  const id = newData._id;
  delete newData._id;
  collection.replaceOne({ _id: ObjectId(id) }, newData);
  cb();
};

const insertDocument = (db, data, cb) => {
  const collection = db.collection(process.env.DBNAME);
  collection.insertOne(data);
  cb(data);
};

app.use(compression());
app.use(express.static(path.join(__dirname, '/dist')));
app.use(
  session({
    secret: 'SECRET TOKEN',
    cookie: { secure: false, maxAge: 60000 },
    resave: false,
    saveUninitialized: true,
  }),
);

app.get('/:board', (req, res) => {
  const searchReq = { board: req.params.board };
  const sessData = req.session;
  MongoClient.connect(
    URL,
    { useNewUrlParser: true },
    (err, client) => {
      assert.equal(null, err);
      const db = client.db(process.env.DBNAME);
      findDocuments(db, searchReq, (documents) => {
        if (documents.length === 0) {
          res.redirect('/');
          return;
        }
        sessData.board = documents[0];
        sessData.save();
        res.redirect('/');
      });
    },
  );
});

app.get('/', (req, res) => {
  res.sendFile('index.html');
});

app.get('/api/searchData', (req, res) => {
  const board = req.session.board;
  if (board == null) {
    res.send({ name: 'Not Found' });
    return;
  }
  res.send(req.session.board);
});

app.get('/api/new', (req, res) => {
  const sessData = req.session;
  const adj = titleCase(words.adjectives[Math.floor(Math.random() * 100) + 1]);
  const adv = titleCase(words.adverbs[Math.floor(Math.random() * 100) + 1]);
  const ani = titleCase(words.animals[Math.floor(Math.random() * 100) + 1]);
  const boardName = `${adv}${adj}${ani}`;
  const searchReq = { board: boardName };
  MongoClient.connect(
    URL,
    { useNewUrlParser: true },
    (err, client) => {
      assert.equal(null, err);
      const db = client.db(process.env.DBNAME);
      findDocuments(db, searchReq, (documents) => {
        if (documents.length === 0) {
          const id = UUID();
          const document = {
            name: boardName,
            ordered: ['New', 'Complete'],
            intro: true,
            items: {
              New: [
                {
                  id,
                  title: 'My First Note',
                  content: 'This is my first note! Feel free to delete me!',
                  color: 0,
                },
              ],
              Complete: [],
            },
          };
          insertDocument(db, document, (data) => {
            sessData.board = data;
            sessData.save();
            res.send(data);
          });
        } else {
          sessData.board = documents[0];
          sessData.save();
          res.send(documents[0]);
        }
      });
    },
  );
});

app.get('/api/search', (req, res) => {
  const searchReq = req.query;
  const sessData = req.session;
  MongoClient.connect(
    URL,
    { useNewUrlParser: true },
    (err, client) => {
      assert.equal(null, err);
      const db = client.db(process.env.DBNAME);
      findDocuments(db, searchReq, (documents) => {
        if (documents.length === 0) {
          res.send({ name: 'Not Found' });
          return;
        }
        sessData.board = documents[0];
        sessData.save();
        res.send(documents[0]);
      });
    },
  );
});

app.get('/api/board', (req, res) => {
  const sessData = req.session;
  if (sessData.board) {
    const board = req.session.baord;
    res.send(board);
  } else {
    const searchReq = req.query;
    MongoClient.connect(
      URL,
      { useNewUrlParser: true },
      (err, client) => {
        assert.equal(null, err);
        const db = client.db(process.env.DBNAME);
        findDocuments(db, searchReq, (documents) => {
          sessData.board = documents[0];
          res.send(documents[0]);
        });
      },
    );
  }
});
app.post('/api/save', (req, res) => {
  const board = req.query.board;
  MongoClient.connect(
    URL,
    { useNewUrlParser: true },
    (err, client) => {
      assert.equal(null, err);
      const db = client.db(process.env.DBNAME);
      updateDocuments(db, JSON.parse(board), () => {
        res.sendStatus(200);
      });
    },
  );
});

app.get('/api/clearSession', (req, res) => {
  req.session.destroy();
  res.sendStatus(200);
});
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`); // eslint-disable-line no-console
});
