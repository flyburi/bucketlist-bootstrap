var mongoose = require('mongoose');
//Mongoose.connect('mongodb://localhost/bucketdb');
var db = mongoose.createConnection('localhost', 'test');

var Schema = mongoose.Schema
  ,ObjectId = Schema.ObjectId;

var bucketItemSchema = new Schema({
// id: ObjectId,
  title : String,
//  date: {type: Date, default: Date.now},
  contents: String,
  done : Boolean
});
/*
  bucketItemSchema.virtual('id')
  .get(function() {
    return this._id.toHexString();
  });
*/
module.exports = mongoose.model('BucketItem', bucketItemSchema);