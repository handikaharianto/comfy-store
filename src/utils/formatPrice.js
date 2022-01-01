function formatPrice(price) {
  price = price / 100
  return price.toFixed(2)
}

export default formatPrice
