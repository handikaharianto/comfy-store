import Form from '../Form/Form'
import Loader from '../shared/Loader/Loader'
import Product from '../shared/Product/Product'
import Message from '../Message/Message'
import { useProductFilter } from '../../context/ProductFilter'
import { useProduct } from '../../context/ProductContext'

function Products() {
  const { isLoading } = useProduct()
  const { filteredProducts } = useProductFilter()

  return (
    <section className='products'>
      {isLoading ? (
        <Loader />
      ) : (
        <div className='container products__container'>
          <Form />
          <section className='products__list'>
            {filteredProducts.length === 0 ? (
              <Message />
            ) : (
              filteredProducts.map((item) => (
                <Product key={item.id} {...item} />
              ))
            )}
          </section>
        </div>
      )}
    </section>
  )
}

export default Products
