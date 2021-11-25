// const factories = require('node-factories')
const faker = require('faker')
const { v4: uuidv4 } = require('uuid')

const factory = ({ total = 1, content = {} }) => {
  let items = []
  for (let i = 0; i < total; i++) {
    items.push(content())
  }
  return items
}

const createProduct = (total) => {
  const products = factory({
    total,
    content: () => {
      const price = parseFloat(faker.commerce.price())
      return {
        id: uuidv4(),
        name: faker.commerce.productName(),
        priceFrom: price + 100,
        priceTo: price,
        priceInstallments: price / 10,
      }
    }
  })

  return products
}

module.exports = { product: createProduct }