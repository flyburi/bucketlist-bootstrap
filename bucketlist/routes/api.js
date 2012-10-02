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
            return { id: item._id.toString(), title:item.title, contents:item.contents, done:item.done  };
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
      res.json({
        title : result.title,
        contents : result.contents,
        id : result._id.toString()
      });
    }
  });
};

exports.update = function(req, res){
  console.log(req.body.contents);
  bucketlist.update({
    _id: new Mongolian.ObjectId(req.params.id)}
    ,{"$set" : {contents : req.body.contents, done: req.body.done}
  }, function(err, result){
    if (err) {
      throw err;
    }
    if (result) {
      res.send(result);
    }
  });
  
};

exports.del = function(req, res){
  var id = req.params.id;
  bucketlist.remove({
    _id: new Mongolian.ObjectId(req.params.id)
  });
  res.send(req.body);
};