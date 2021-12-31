import Product from '../shared/Product/Product'
import Section from '../shared/Section/Section'
import Loader from '../shared/Loader/Loader'

function FeaturedProducts({ products, isLoading }) {
  return (
    <Section title='Featured' name='featured'>
      <div className='container featured__items'>
        {isLoading ? (
          <Loader />
        ) : (
          products.slice(0, 3).map((item) => {
            return <Product key={item.id} {...item} />
          })
        )}
      </div>
      <a className='btn featured__products-btn' href='/products'>
        ALL PRODUCTS
      </a>
    </Section>
  )
}

export default FeaturedProducts
