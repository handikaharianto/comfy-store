import { useState, useEffect, useCallback } from 'react'
import { FaTimes } from 'react-icons/fa'
import formatPrice from '../../../utils/formatPrice'
import ShoppingCartItem from '../ShoppingCartItem/ShoppingCartItem'

function ShoppingCart({
  isShoppingCartOpen,
  toggleShoppingCart,
  cartItems,
  increaseAmount,
  decreaseAmount,
  removeCartItem,
}) {
  const [totalPrice, setTotalPrice] = useState(0)

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
    calculateTotalPrice()
  }, [calculateTotalPrice])

  return (
    <div
      className={`cart-overlay ${
        isShoppingCartOpen ? 'cart-overlay--active' : ''
      }`}
    >
      <aside className='cart'>
        <button
          className='cart__close-btn'
          type='button'
          onClick={toggleShoppingCart}
        >
          <FaTimes />
        </button>
        <h3 className='cart__title'>Your Bag</h3>
        <div className='cart__items'>
          {cartItems.map((item) => (
            <ShoppingCartItem
              key={item.id}
              {...item}
              increaseAmount={increaseAmount}
              decreaseAmount={decreaseAmount}
              removeCartItem={removeCartItem}
            />
          ))}
        </div>
        <div className='cart__info'>
          <p className='cart__price'>Total : ${totalPrice}</p>
          <button className='btn cart__checkout-btn' type='button'>
            CHECKOUT
          </button>
        </div>
      </aside>
    </div>
  )
}

export default ShoppingCart
