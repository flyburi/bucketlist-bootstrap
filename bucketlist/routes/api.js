/* The API Controller */

/*
 var repo = require('../repository.js');
 */
var Mongolian = require('mongolian')
  , server = new Mongolian
  , db = server.db('bucketdb')
  , bucketlist = db.collection('bucketlist');

exports.index = function(req, res) {
  res.render('index', {
    title : 'Bucket List'
  });
};

exports.list = function(req, res) {
  bucketlist.find().toArray(function(err, result){
    if(err) {
      throw err;
    }
    if(result){
      res.json(result.map(function(item) {
            return { content:item.content, done:item.done, id: item._id.toString() };
        }));
    }
  });

};

exports.create = function(req, res) {
  bucketlist.insert({
    title : req.body.title,
    contents : req.body.contents,
    done : false
  }, function(err, result) {
    if (err) {
      throw err;
    }
    if (result) {
      // res.writeHead(200,result);
      res.json({
        title : result.title,
        contents : result.contents,
        id : result._id.toString()
      });
    }
  });

};
