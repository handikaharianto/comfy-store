import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import FeaturedProducts from './components/FeaturedProducts/FeaturedProducts'
import Hero from './components/Hero/Hero'
import Navbar from './components/shared/Navbar/Navbar'
import Sidebar from './components/shared/Sidebar/Sidebar'
import ShoppingCart from './components/shared/ShoppingCart/ShoppingCart'
import Breadcrumb from './components/shared/Breadcrumb/Breadcrumb'
import ProductDetails from './components/ProductDetails/ProductDetails'
import About from './components/About/About'
import useFetch from './hooks/useFetch'
import Products from './components/Products/Products'

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const { data: products, isLoading } = useFetch(
    'https://course-api.com/javascript-store-products'
  )

  const toggleSidebar = () => {
    setIsSidebarOpen((currentSidebarState) => !currentSidebarState)
  }

  return (
    <>
      <Routes>
        <Route
          path='/'
          element={
            <>
              <Navbar homepage={true} toggleSidebar={toggleSidebar} />
              <Hero />
              <FeaturedProducts products={products} isLoading={isLoading} />
            </>
          }
        />
        <Route
          path='/products'
          element={
            <>
              <Navbar toggleSidebar={toggleSidebar} />
              <Breadcrumb products={products} />
              <Products products={products} isLoading={isLoading} />
            </>
          }
        />
        <Route
          path='/about'
          element={
            <>
              <Navbar toggleSidebar={toggleSidebar} />
              <Breadcrumb products={products} />
              <About />
            </>
          }
        />
        <Route
          path='/products/:id'
          element={
            <>
              <Navbar toggleSidebar={toggleSidebar} />
              <Breadcrumb products={products} />
              <ProductDetails />
            </>
          }
        />
      </Routes>
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <ShoppingCart />
    </>
  )
}

export default App
