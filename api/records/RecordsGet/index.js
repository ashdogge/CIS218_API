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
    if (!records) {
      return res.status(404).json({ error: "No records found in database" });
    }
    return res.status(200).json(records);
  }
);
