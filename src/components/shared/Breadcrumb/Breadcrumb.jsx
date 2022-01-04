import { useState, useEffect } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { useProduct } from '../../../context/ProductContext'

function Breadcrumb() {
  const { products } = useProduct()
  const { id } = useParams()
  let { pathname } = useLocation() // return the current pathname
  const [path, setPath] = useState('Home')

  useEffect(() => {
    // get item
    const product = products.find((item) => item.id === id)
    // get product name if there is a product
    const productName = product ? product.fields.name : ''
    // replace product ID with product name
    setPath(`${pathname.replace(`/${id}`, `/${productName}`)}`)
  }, [id, pathname, products])

  return (
    <section className='breadcrumb'>
      <div className='container'>
        <h2 className='breadcrumb__path'>Home{path.replaceAll('/', ' / ')}</h2>
      </div>
    </section>
  )
}

export default Breadcrumb
