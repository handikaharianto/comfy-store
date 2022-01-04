import React, { useState, useEffect, useContext, useCallback } from 'react'
import { getLocalStorage, updateLocalStorage } from '../utils/localStorage'
import formatPrice from '../utils/formatPrice'

const ShoppingCartContext = React.createContext()

function ShoppingCartProvider({ children }) {
  const [isShoppingCartOpen, setIsShoppingCartOpen] = useState(false)
  const [cartItems, setCartItems] = useState(getLocalStorage)
  const [totalCart, setTotalCart] = useState(0)
  const [totalPrice, setTotalPrice] = useState(0)

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

  const calculateTotalPrice = useCallback(() => {
    const totalPrice = cartItems.reduce((prev, current) => {
      const {
        amount,
        fields: { price },
      } = current

      return prev + amount * formatPrice(price)
    }, 0)

    setTotalPrice(totalPrice.toFixed(2))
  }, [cartItems])

  useEffect(() => {
    setTotalCart(cartItems.reduce((prev, current) => prev + current.amount, 0))
  }, [cartItems])

  return (
    <ShoppingCartContext.Provider
      value={{
        toggleShoppingCart,
        addToShoppingCart,
        removeCartItem,
        increaseAmount,
        decreaseAmount,
        isShoppingCartOpen,
        calculateTotalPrice,
        totalCart,
        totalPrice,
        cartItems,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  )
}

function useShoppingCart() {
  const context = useContext(ShoppingCartContext)

  return context
}

export { ShoppingCartProvider, useShoppingCart }
