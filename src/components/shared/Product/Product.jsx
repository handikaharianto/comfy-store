import { Link } from 'react-router-dom'
import { FaSearch, FaShoppingCart } from 'react-icons/fa'
import formatPrice from '../../../utils/formatPrice'
import { useShoppingCart } from '../../../context/ShoppingCartContext'

function Product({ id, fields }) {
  const { addToShoppingCart } = useShoppingCart()

  const {
    name,
    price,
    image: [{ url }],
  } = fields

  return (
    <article className='product'>
      <div className='product__top'>
        <img className='product__img' src={url} alt={name} />
        <div className='product__btns'>
          <Link className='product__details-btn' to={`/products/${id}`}>
            <FaSearch />
          </Link>
          <button
            className='product__cart-btn'
            type='button'
            onClick={() => addToShoppingCart(id)}
          >
            <FaShoppingCart />
          </button>
        </div>
      </div>
      <div className='product__body'>
        <h5 className='product__name'>{name}</h5>
        <p className='product__price'>${formatPrice(price)}</p>
      </div>
    </article>
  )
}

export default Product
