const factories = require("./factories")
const { saveFileJson } = require("./utils")

// console.log(factories.product({totalBrands: 5, totalProducts: 10, totalCategories: 5, totalSubcategories: 10 }).products)
saveFileJson(factories.product({totalBrands: 1000, totalProducts: 100000, totalCategories: 1000, totalSubcategories: 10000 }))
