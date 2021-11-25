// const factories = require('node-factories')
const faker = require('faker')
const { v4: uuidv4 } = require('uuid')

const factory = ({ total = 1, content = {} }) => {
  let items = []
  for (let index = 0; index < total; index++) {
    items.push(content(index))
  }
  return items
}

const createProduct = ({ totalProducts = 5, totalBrands = 5, totalCategories = 3, totalSubcategories = 10 }) => {

  const categories = factory({ total: totalCategories, content: (index) => {
    return {
      id: uuidv4(),
      name: `Category ${index + 1}`
    }
  }})

  const categoriesIds = categories.map(category => category.id)

  const brands = factory({ total: totalBrands, content: (index) => {
    return {
      id: uuidv4(),
      name: `Brand ${index + 1}`
    }
  }})

  const brandsIds = brands.map(brand => brand.id)

  const subcategories = factory({ total: totalSubcategories, content: (index) => {
    return {
      id: uuidv4(),
      category_id: categoriesIds[Math.floor(Math.random() * categories.length)],
      name: `Subcategory ${index + 1}`
    }
  }})

  const subcategoriesByCategoryIds = subcategories.reduce((subcategories, subcategory)  => {
    if(!subcategories) subcategories = []
    if(!subcategories[subcategory.category_id]) subcategories[subcategory.category_id] = []
    subcategories[subcategory.category_id].push(subcategory.id)

    return subcategories    
  }, [])

  const products = factory({
    total: totalProducts,
    content: () => {
      const price = parseFloat(faker.commerce.price())
      const brand = brandsIds[Math.floor(Math.random() * brands.length)]
      const category = categoriesIds[Math.floor(Math.random() * categories.length)]
      const subcategory = subcategoriesByCategoryIds[category][Math.floor(Math.random() * subcategoriesByCategoryIds[category].length)]

      return {
        id: uuidv4(),
        name: faker.commerce.productName(),
        description : faker.lorem.paragraph(),
        image: faker.random.image(),
        priceFrom: price + 100,
        priceTo: price,
        priceInstallments: price / 10,
        brand,
        category_id: category,
        subcategory_id: subcategory,
        topSeller: faker.datatype.boolean()
      }
    }
  })

  return { products, brands, categories, subcategories }
}

module.exports = { product: createProduct }