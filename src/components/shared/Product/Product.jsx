import { FaSearch, FaShoppingCart } from 'react-icons/fa'
import formatPrice from '../../../utils/formatPrice'

function Product({ id, fields }) {
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
          <a className='product__details-btn' href={`/${id}`}>
            <FaSearch />
          </a>
          <button className='product__cart-btn' type='button'>
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
