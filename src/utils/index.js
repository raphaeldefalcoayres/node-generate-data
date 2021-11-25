const fs = require('fs')

const saveFileJson = (data) => {
  fs.writeFile('products.json', JSON.stringify(data, null, 2), (err) => {
    if (err) throw err;
    console.log('Data written to file');
  })
}

module.exports = {
  saveFileJson
}