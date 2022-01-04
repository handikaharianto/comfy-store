import { useState, useEffect } from 'react'
import formatPrice from '../../utils/formatPrice'
import Form from '../Form/Form'
import Loader from '../shared/Loader/Loader'
import Product from '../shared/Product/Product'
import Message from '../Message/Message'
import { useShoppingCart } from '../../context/ShoppingCartContext'

function Products({ products, isLoading }) {
  const [inputText, setInputText] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [priceRange, setPriceRange] = useState(80)
  const [category, setCategory] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const { addToShoppingCart } = useShoppingCart()

  const handleInputChange = (e) => {
    setInputText(e.target.value)
  }

  const handlePriceChange = (e) => {
    setPriceRange(e.target.value)
  }

  const updateProductCategory = (category) => {
    setSelectedCategory(category)
  }

  useEffect(() => {
    const filteredItems = products
      .filter((item) => {
        // filter based on product name
        const productName = item.fields.name
        return productName
          .toLowerCase()
          .includes(inputText.toLowerCase().trim())
      })
      .filter((item) => {
        // filter based on company of product
        const productCompany = item.fields.company
        if (selectedCategory === 'all') {
          return true
        } else {
          return productCompany === selectedCategory
        }
      })
      .filter((item) => {
        // filter based on product price
        const productPrice = formatPrice(item.fields.price)
        return productPrice <= parseInt(priceRange)
      })

    setFilteredProducts(filteredItems)
  }, [products, inputText, selectedCategory, priceRange])

  return (
    <section className='products'>
      {isLoading ? (
        <Loader />
      ) : (
        <div className='container products__container'>
          <Form
            products={products}
            handleInputChange={handleInputChange}
            handlePriceChange={handlePriceChange}
            updateProductCategory={updateProductCategory}
            priceRange={priceRange}
            inputText={inputText}
            category={category}
            setCategory={setCategory}
          />
          <section className='products__list'>
            {filteredProducts.length === 0 ? (
              <Message />
            ) : (
              filteredProducts.map((item) => (
                <Product
                  key={item.id}
                  {...item}
                  addToShoppingCart={addToShoppingCart}
                />
              ))
            )}
          </section>
        </div>
      )}
    </section>
  )
}

export default Products
