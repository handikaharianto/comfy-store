import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { getLocalStorage, updateLocalStorage } from './utils/localStorage'
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
  const [isShoppingCartOpen, setIsShoppingCartOpen] = useState(false)
  const [cartItems, setCartItems] = useState(getLocalStorage)
  const [totalCart, setTotalCart] = useState(0)
  const { data: products, isLoading } = useFetch(
    'https://course-api.com/javascript-store-products'
  )

  const toggleSidebar = () => {
    setIsSidebarOpen((currentSidebarState) => !currentSidebarState)
  }

  const toggleShoppingCart = () => {
    setIsShoppingCartOpen(
      (currentShoppingCartState) => !currentShoppingCartState
    )
  }

  const addToShoppingCart = (id) => {
    toggleShoppingCart()
    setTotalCart((total) => total + 1)
    setCartItems((items) => {
      // return 'undefined' if cart item is not found
      let cartItem = items.find((item) => item.id === id)

      if (cartItem) {
        // update the amount
        const updatedItems = items.map((item) =>
          item.id === id ? { ...cartItem, amount: cartItem.amount + 1 } : item
        )
        updateLocalStorage(updatedItems)

        return updatedItems
      } else {
        // get the item from the products
        let product = products.find((item) => item.id === id)
        product.amount = 1
        const updatedItems = [...items, product]

        updateLocalStorage(updatedItems)
        // add new shopping cart item
        return updatedItems
      }
    })
  }

  const removeCartItem = (id) => {
    setCartItems((items) => {
      const updatedItems = items.filter((item) => item.id !== id)
      updateLocalStorage(updatedItems)

      return updatedItems
    })
  }

  const increaseAmount = (id) => {
    setCartItems((items) => {
      const updatedItems = items.map((item) =>
        item.id === id ? { ...item, amount: item.amount + 1 } : item
      )
      updateLocalStorage(updatedItems)

      return updatedItems
    })
  }

  const decreaseAmount = (id) => {
    setCartItems((items) => {
      const updatedItems = items
        .map((item) =>
          item.id === id ? { ...item, amount: item.amount - 1 } : item
        )
        .filter((item) => item.amount !== 0) // remove cart item if amount is 0
      updateLocalStorage(updatedItems)

      return updatedItems
    })
  }

  useEffect(() => {
    setTotalCart(cartItems.reduce((prev, current) => prev + current.amount, 0))
  }, [cartItems])

  return (
    <>
      <Routes>
        <Route
          path='/'
          element={
            <>
              <Navbar
                homepage={true}
                toggleSidebar={toggleSidebar}
                toggleShoppingCart={toggleShoppingCart}
                totalCart={totalCart}
              />
              <Hero />
              <FeaturedProducts
                products={products}
                isLoading={isLoading}
                addToShoppingCart={addToShoppingCart}
              />
            </>
          }
        />
        <Route
          path='/products'
          element={
            <>
              <Navbar
                toggleSidebar={toggleSidebar}
                toggleShoppingCart={toggleShoppingCart}
                totalCart={totalCart}
              />
              <Breadcrumb products={products} />
              <Products
                products={products}
                isLoading={isLoading}
                addToShoppingCart={addToShoppingCart}
              />
            </>
          }
        />
        <Route
          path='/about'
          element={
            <>
              <Navbar
                toggleSidebar={toggleSidebar}
                toggleShoppingCart={toggleShoppingCart}
                totalCart={totalCart}
              />
              <Breadcrumb products={products} />
              <About />
            </>
          }
        />
        <Route
          path='/products/:id'
          element={
            <>
              <Navbar
                toggleSidebar={toggleSidebar}
                toggleShoppingCart={toggleShoppingCart}
                totalCart={totalCart}
              />
              <Breadcrumb products={products} />
              <ProductDetails addToShoppingCart={addToShoppingCart} />
            </>
          }
        />
      </Routes>
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <ShoppingCart
        isShoppingCartOpen={isShoppingCartOpen}
        toggleShoppingCart={toggleShoppingCart}
        cartItems={cartItems}
        increaseAmount={increaseAmount}
        decreaseAmount={decreaseAmount}
        removeCartItem={removeCartItem}
      />
    </>
  )
}

export default App
