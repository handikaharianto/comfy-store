import { useCallback, useEffect } from 'react'
import { useProduct } from '../../context/ProductContext'
import { useProductFilter } from '../../context/ProductFilter'

function Form() {
  const { products } = useProduct()
  const {
    handleInputChange,
    handlePriceChange,
    updateProductCategory,
    priceRange,
    inputText,
    category,
    setCategory,
  } = useProductFilter()

  const createProductCategory = useCallback(() => {
    setCategory(
      products.reduce(
        (prev, current) => {
          const company = current.fields.company
          if (!prev.includes(company)) {
            return [...prev, company]
          }
          return prev
        },
        ['all']
      )
    )
  }, [products, setCategory])

  useEffect(() => {
    createProductCategory()
  }, [products, createProductCategory])

  return (
    <form className='form'>
      <input
        className='form__input'
        type='text'
        placeholder='Search...'
        value={inputText}
        onChange={handleInputChange}
      />
      <div className='form__category'>
        <h5>Company</h5>
        <div className='form__category-body'>
          {category.map((item, index) => (
            <button
              className='form__category-btn'
              key={index}
              type='button'
              onClick={() => updateProductCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
      <div className='form__price'>
        <h5>Price</h5>
        <input
          type='range'
          name='range'
          id='range'
          min={0}
          value={priceRange}
          max={80}
          onInput={handlePriceChange}
        />
        <p className='form__price-value'>Value : ${priceRange}</p>
      </div>
    </form>
  )
}

export default Form
