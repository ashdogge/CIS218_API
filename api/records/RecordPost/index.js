const makeInjectable = require("../../../helpers/makeInjectable");

module.exports = makeInjectable(
  {
    defaults: {
      RecordModel: /*istanbul ignore next*/ () => require("../models/record"),
      TrackerModel: /*istanbul ignore next*/ () =>
        require("../models/idtracker"),
    },
  },
  async function ({ RecordModel, TrackerModel }, req, res) {
    const urlPattern = /^(https?:\/\/)[^\s$.?#].[^\s]*$/;
    //  < Error checking >
    if (!req.body) {
      return res.status(400).json({ error: "No body found in request" });
    }
    if (!req.body.name || req.body.name.length < 3) {
      return res
        .status(400)
        .json({ error: "Name must be at least 3 characters" });
    }
    if (!req.body.price) {
      return res.status(400).json({ error: "Price field is required." });
    }
    if (!/^\d+\.\d{2}$/.test(req.body.price)) {
      return res.status(400).json({ error: "Price must be in 00.00 format" });
    }
    if (!req.body.rating || req.body.rating < 1 || req.body.rating > 5) {
      return res.status(400).json({ error: "Rating field is required." });
    }

    if (!req.body.image) {
      return res.status(400).json({ error: "Image field is required." });
    }
    // < Ensure image is a URL >
    if (!urlPattern.test(req.body.image)) {
      return res.status(400).json({ error: "Image must be a valid URL." });
    }
    // < /error checking / >

    // ID, Name, description, price, rating, image, date modified, date created.
    const name = req.body.name;
    //< If no description is passed or description length is 0, default to empty string >
    const description = req.body.description?.trim() || "";
    const price = req.body.price;
    const rating = req.body.rating;
    const image = req.body.image;
    const date_modified = new Date();
    const date_created = date_modified;
    // Get next ID
    // const tracker = await TrackerModel.findByIdAndUpdate(
    //   { _id: "ID" },
    //   { $inc: { seq: 1 } },
    //   { new: true, upsert: true }
    // );

    const newRecord = new RecordModel({
      name,
      description,
      price,
      rating,
      image,
      date_modified,
      date_created,
    });

    await newRecord.save();

    return res.status(201).json(newRecord);
  }
);
