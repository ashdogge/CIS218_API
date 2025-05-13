const mongoose = require("mongoose");
const IdTracker = require("./idtracker");
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
  ID: { type: Number, unique: true },
  name: { type: String, required: true },
  description: { type: String, required: false, default: "" },
  price: { type: Number, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  image: { type: String, required: true },
  date_modified: { type: Date, required: true },
  date_created: { type: Date, required: true },
});

//  < Before save, assign auto-incrementing ID using an IdTracker collection >
RecordSchema.pre("save", async function (next) {
  // < Only run if document is new >
  if (this.isNew) {
    try {
      const tracker = await IdTracker.findByIdAndUpdate(
        // < Get document with id 'ID' >
        { _id: "ID" },
        // < Increment sequence by 1 >
        { $inc: { seq: 1 } },
        // < Return updated document, create if not found >
        { new: true, upsert: true }
      );
      this.ID = tracker.seq;
      next();
    } catch (err) {
      next(err);
    }
  } else {
    next();
  }
});

module.exports = mongoose.model("Record", RecordSchema);
