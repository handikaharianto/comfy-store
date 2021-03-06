import { useEffect } from 'react'
import { FaTimes } from 'react-icons/fa'
import { useShoppingCart } from '../../../context/ShoppingCartContext'
import ShoppingCartItem from '../ShoppingCartItem/ShoppingCartItem'

function ShoppingCart() {
  const {
    isShoppingCartOpen,
    toggleShoppingCart,
    calculateTotalPrice,
    cartItems,
    totalPrice,
  } = useShoppingCart()

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
            <ShoppingCartItem key={item.id} {...item} />
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
