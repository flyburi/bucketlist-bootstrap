var Mongolian = require('mongolian')
, server = new Mongolian
, db = server.db('bucketdb')
, bucketlist = db.collection('bucketlist');