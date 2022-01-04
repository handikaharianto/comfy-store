import React, { useState, useEffect, useContext } from 'react'
import { useProduct } from './ProductContext'
import formatPrice from '../utils/formatPrice'

const ProductFilterContext = React.createContext()

function ProductFilterProvider({ children }) {
  const [inputText, setInputText] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [priceRange, setPriceRange] = useState(80)
  const [category, setCategory] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const { products } = useProduct()

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
    <ProductFilterContext.Provider
      value={{
        handleInputChange,
        handlePriceChange,
        updateProductCategory,
        setCategory,
        category,
        priceRange,
        inputText,
        filteredProducts,
      }}
    >
      {children}
    </ProductFilterContext.Provider>
  )
}

function useProductFilter() {
  const context = useContext(ProductFilterContext)
  return context
}

export { ProductFilterProvider, useProductFilter }
