import Product from '../shared/Product/Product'
import Section from '../shared/Section/Section'
import Loader from '../shared/Loader/Loader'
import { Link } from 'react-router-dom'

function FeaturedProducts({ products, isLoading, addToShoppingCart }) {
  return (
    <Section title='Featured' name='featured'>
      <div className='container featured__items'>
        {isLoading ? (
          <Loader />
        ) : (
          products.slice(0, 3).map((item) => {
            return (
              <Product
                key={item.id}
                {...item}
                addToShoppingCart={addToShoppingCart}
              />
            )
          })
        )}
      </div>
      <Link className='btn featured__products-btn' to='/products'>
        ALL PRODUCTS
      </Link>
    </Section>
  )
}

export default FeaturedProducts
