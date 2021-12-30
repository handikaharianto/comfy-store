import { useState, useEffect } from 'react'

import FeaturedProducts from './components/home/FeaturedProducts'
import Hero from './components/home/Hero'
import Navbar from './components/shared/Navbar'

import getData from './api/api'
import Sidebar from './components/shared/Sidebar'

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [products, setProducts] = useState([])
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const fetchProducts = async (url) => {
    const data = await getData(url)
    setProducts(data)
    setIsLoading(false)
  }

  const toggleSidebar = () => {
    setIsSidebarOpen((currentSidebarState) => !currentSidebarState)
  }

  useEffect(() => {
    fetchProducts('https://course-api.com/javascript-store-products')
  }, [])

  return (
    <>
      <Navbar toggleSidebar={toggleSidebar} />
      <Hero />
      <FeaturedProducts products={products} isLoading={isLoading} />
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
    </>
  )
}

export default App
// https://course-api.com/javascript-store-products
// https://course-api.com/javascript-store-single-product?id=rec43w3ipXvP28vog
