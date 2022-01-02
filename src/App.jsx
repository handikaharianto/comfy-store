import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'

import FeaturedProducts from './components/FeaturedProducts/FeaturedProducts'
import Hero from './components/Hero/Hero'
import Navbar from './components/shared/Navbar/Navbar'
import Sidebar from './components/shared/Sidebar/Sidebar'
import getData from './api/api'
import ShoppingCart from './components/shared/ShoppingCart/ShoppingCart'
import { getLocalStorage, updateLocalStorage } from './utils/localStorage'

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [products, setProducts] = useState([])
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isShoppingCartOpen, setIsShoppingCartOpen] = useState(false)
  const [cartItems, setCartItems] = useState(getLocalStorage)
  const [totalCart, setTotalCart] = useState(0)

  const fetchProducts = async (url) => {
    const data = await getData(url)
    setProducts(data)
    setIsLoading(false)
  }

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
    fetchProducts('https://course-api.com/javascript-store-products')
  }, [])

  useEffect(() => {
    setTotalCart(cartItems.reduce((prev, current) => prev + current.amount, 0))
  }, [cartItems])

  return (
    <>
      <Routes>
        // Home
        <Route
          path='/'
          element={
            <>
              <Navbar
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
        // Products
        <Route
          path='/products'
          element={
            <>
              <Navbar
                dark={true}
                toggleSidebar={toggleSidebar}
                toggleShoppingCart={toggleShoppingCart}
                totalCart={totalCart}
              />
            </>
          }
        />
        // About
        <Route
          path='/about'
          element={
            <>
              <Navbar
                dark={true}
                toggleSidebar={toggleSidebar}
                toggleShoppingCart={toggleShoppingCart}
                totalCart={totalCart}
              />
            </>
          }
        />
        // Product Details
        <Route
          path='/products?id=:id'
          element={
            <>
              <Navbar
                dark={true}
                toggleSidebar={toggleSidebar}
                toggleShoppingCart={toggleShoppingCart}
                totalCart={totalCart}
              />
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
// https://course-api.com/javascript-store-products
// https://course-api.com/javascript-store-single-product?id=rec43w3ipXvP28vog
