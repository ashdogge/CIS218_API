const makeInjectable = require("../../../helpers/makeInjectable");

module.exports = makeInjectable(
  {
    defaults: {
      RecordModel: /*istanbul ignore next*/ () => require("../models/record"),
    },
  },
  async function ({ RecordModel }, req, res) {
    //Call the find function to retrieve all documents
    let records = await RecordModel.find();

    if(!req.body) {
      return res.status(400).json({error: "No body found in request"})
    }
    if (!req.body.name) {
      return res.status(400).json({error: "Name field is required."})
    }
    if (req.body.name.length < 3) {
      return res.status(400).json({error: "Name must be at least 3 characters"})
    }
    if(!req.body.price) {
      return res.status(400).json({error: "Price field is required."})
    }
    if (!/^\d+\.\d{2}$/.test(price)) {
      return res.status(400).json({ error: "Price must be in 00.00 format" });
    }
    if (!req.body.rating) {
      return res.status(400).json({error: "Rating field is required."})
    }
    if (req.body.rating < 1 || req.body.rating > 5) {
      return res.status(400).json({ error: "Rating must be between 1 and 5" });
    }
    if (!req.body.description) {
      const description = ""
    }

    return res.status(200).json(records);
  }
);
