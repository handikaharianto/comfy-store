import { FaChevronUp, FaChevronDown } from 'react-icons/fa'
import formatPrice from '../../../utils/formatPrice'

function ShoppingCartItem({
  id,
  fields,
  amount,
  increaseAmount,
  decreaseAmount,
  removeCartItem,
}) {
  const {
    name,
    price,
    image: [{ url }],
  } = fields

  return (
    <article className='cart-item'>
      <img className='cart-item__img' src={url} alt={name} />
      <div className='cart-item__body'>
        <h5 className='cart-item__name'>{name}</h5>
        <p className='cart-item__price'>${formatPrice(price)}</p>
        <button
          className='cart-item__remove-btn'
          type='button'
          onClick={() => removeCartItem(id)}
        >
          Remove
        </button>
      </div>
      <div className='cart-item__quantity'>
        <button
          className='cart-item__increase-btn'
          type='button'
          onClick={() => increaseAmount(id)}
        >
          <FaChevronUp />
        </button>
        <span className='cart-item__amount'>{amount}</span>
        <button
          className='cart-item__decrease-btn'
          type='button'
          onClick={() => decreaseAmount(id)}
        >
          <FaChevronDown />
        </button>
      </div>
    </article>
  )
}

export default ShoppingCartItem
