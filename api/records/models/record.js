const mongoose = require("mongoose");
// ID, Name, description, price, rating, image, date modified, date created.

// ID is autoincrement, primary key

// Name is required.

// Image is just a URL to an actual image online.  
// You can use something like https://picsum.photos/ or https://placeholder.com
// There is no need to display this image at this time.

// Date modified should be automatically updated when anything changes in the record.
// Date created is the date the record is created.  These should not be editable.
// Rating should be a value between 1 and 5. The image is a pathname to an image 
// that is stored on the server.

// The API should respond to all the necessary commands for maintaining the database
// from another device.  Create a new record, Read a single record, Read all records,
//  delete a record, edit/update a record.  All through JSON POSTs and GETs.  You can 
//  use POSTMAN to test your API which is what I will be using to grade.

// ID, Name, description, price, rating, image, date modified, date created.
const RecordSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: {
    type:String,
    required:true
  },
  ID: {
    type:Int,
    required:true
  },
  description: {
    type:String,
    required:true
  },
  price: {
    type:Double,
    required:true
  },
  rating:{
    type:Int,
    required:true
  },
  image: {
    type:String,
    required:true
  },
  date_modified: {
    type:String,
    required:true
  },
  date_created: {
    type:String,
    required:true
  }

});

module.exports = mongoose.model("Records", RecordSchema, "Records");