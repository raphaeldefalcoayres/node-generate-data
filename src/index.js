const factories = require("./factories")
const { saveFileJson } = require("./utils")

console.log(factories.product(5))
// saveFileJson(factories.product(5))