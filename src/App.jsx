import { useState, useEffect } from 'react'

import FeaturedProducts from './components/home/FeaturedProducts'
import Hero from './components/home/Hero'
import Navbar from './components/shared/Navbar'

import getData from './api/api'

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [products, setProducts] = useState([])

  const fetchProducts = async (url) => {
    const data = await getData(url)
    setProducts(data)
    setIsLoading(false)
  }

  useEffect(() => {
    fetchProducts('https://course-api.com/javascript-store-products')
  }, [])

  return (
    <>
      <Navbar />
      <Hero />
      <FeaturedProducts products={products} isLoading={isLoading} />
    </>
  )
}

export default App
// https://course-api.com/javascript-store-products
// https://course-api.com/javascript-store-single-product?id=rec43w3ipXvP28vog
