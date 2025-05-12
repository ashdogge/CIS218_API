const makeInjectable = require("../../../helpers/makeInjectable");

module.exports = makeInjectable(
  {
    defaults: {
      
    },
  },
  async function ({},req, res) {

    return res.status(200).json({message: "Hello World"});
  }
);