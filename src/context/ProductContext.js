import React, { useContext } from 'react'
import useFetch from '../hooks/useFetch'

const ProductContext = React.createContext()

function ProductProvider({ children }) {
  const { data: products, isLoading } = useFetch(
    'https://course-api.com/javascript-store-products'
  )

  return (
    <ProductContext.Provider value={{ products, isLoading }}>
      {children}
    </ProductContext.Provider>
  )
}

function useProduct() {
  const context = useContext(ProductContext)
  return context
}

export { ProductProvider, useProduct }
