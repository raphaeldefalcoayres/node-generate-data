const factories = require("./factories")
const { saveFileJson } = require("./utils")

saveFileJson(factories.product(5))