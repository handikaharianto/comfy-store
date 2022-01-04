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
import Products from './components/Products/Products'

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

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
              <FeaturedProducts />
            </>
          }
        />
        <Route
          path='/products'
          element={
            <>
              <Navbar toggleSidebar={toggleSidebar} />
              <Breadcrumb />
              <Products />
            </>
          }
        />
        <Route
          path='/about'
          element={
            <>
              <Navbar toggleSidebar={toggleSidebar} />
              <Breadcrumb />
              <About />
            </>
          }
        />
        <Route
          path='/products/:id'
          element={
            <>
              <Navbar toggleSidebar={toggleSidebar} />
              <Breadcrumb />
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
