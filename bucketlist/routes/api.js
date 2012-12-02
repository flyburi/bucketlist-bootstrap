/* The API Controller */

//TODO 
//var repo = require('../repository.js');

var Mongolian = require('mongolian')
  , server = new Mongolian
  , db = server.db('bucketdb')
  , bucketlist = db.collection('bucketlist')
  , user = db.collection('user');

exports.index = function(req, res) {
  res.render('index');
};

exports.signup = function(req, res){
  user.insert({
    email:req.body.email,
    password: req.body.password
  }, function(err, result){
    if(err) {
       throw err;
    }
    if(result){
      console.log(result);
      res.json({
        email: result.email,
        password : result.password
      });
    }
  });
};

exports.signin = function(req, res){
  user.findOne({
    email: req.body.email,
    password: req.body.password
  }, function(err, result){
    if(err){
      console.log('err cant find');
      throw err;
    }
    if(result){
      res.json({
        email: result.email,
        password : result.password,
      });
    }
  });
};

exports.list = function(req, res) {
  var self = this;
  self.items = new Array();
  
  bucketlist.find().sort({createdAt:-1}).toArray(function(err, result){
    if(err) {
      throw err;
    }
    if(result){
      res.json(result.map(function(item) {
            return { 
              id: item._id.toString(), 
              title:item.title, 
              contents:item.contents,
              createdAt: item.createdAt,
              updatedAt: item.updatedAt,
              checkPrivate : item.checkPrivate,
              done:item.done  };
        }));
      
    }
  });
};

exports.create = function(req, res) {
  bucketlist.insert({
    title : req.body.title,
    contents : req.body.contents,
    tags: req.body.tags,
    createdAt: new Date(),
    updatedAt: new Date(),
    checkPrivate : req.body.checkPrivate,
    done : false
  }, function(err, result) {
    if (err) {
      throw err;
    }
    if (result) {
      res.json({
        title : result.title,
        contents : result.contents,
        tags: result.tags,
        createdAt: result.createdAt,
        updatedAt: result.updatedAt,
        checkPrivate : result.checkPrivate,
        id : result._id.toString()
      });
    }
  });
};

exports.update = function(req, res){
  bucketlist.update({
    _id: new Mongolian.ObjectId(req.params.id)}
    ,{"$set" : {contents : req.body.contents, done: req.body.done, updatedAt: new Date()}
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


