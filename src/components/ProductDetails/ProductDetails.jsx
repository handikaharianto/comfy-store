import { useParams } from 'react-router-dom'
import useFetch from '../../hooks/useFetch'
import Loader from '../shared/Loader/Loader'
import formatPrice from '../../utils/formatPrice'
import { useShoppingCart } from '../../context/ShoppingCartContext'

function ProductDetails() {
  const { id } = useParams()
  const {
    data: { fields },
    isLoading,
  } = useFetch(
    `https://course-api.com/javascript-store-single-product?id=${id}`
  )
  const { addToShoppingCart } = useShoppingCart()

  if (isLoading)
    return (
      <section className='product-details'>
        <Loader />
      </section>
    )

  const {
    name,
    price,
    colors,
    company,
    description,
    image: [{ url: img }],
  } = fields

  return (
    <section className='product-details'>
      <div className='container product-details__container'>
        <img className='product-details__img' src={img} alt={name} />
        <div className='product-details__body'>
          <h3 className='product-details__name'>{name}</h3>
          <h4 className='product-details__company'>By {company}</h4>
          <p className='product-details__price'>${formatPrice(price)}</p>
          <div className='product-details__colors'>
            {colors.map((color) => (
              <div
                key={color}
                className='product-details__color'
                style={{
                  backgroundColor: color,
                }}
              ></div>
            ))}
          </div>
          <p className='product-details__desc'>{description}</p>
          <button
            className='btn product-details__cart-btn'
            type='button'
            onClick={() => addToShoppingCart(id)}
          >
            ADD TO CART
          </button>
        </div>
      </div>
    </section>
  )
}

export default ProductDetails
