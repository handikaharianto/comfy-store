import { Link } from 'react-router-dom'

function Hero() {
  return (
    <section className='hero'>
      <div className='container hero__container'>
        <h1 className='hero__title'>Rest, Relax, Unwind</h1>
        <p className='hero__desc'>Embrace your choices - we do</p>
        <Link className='hero__shop-btn' to='/products'>
          SHOW NOW
        </Link>
      </div>
    </section>
  )
}

export default Hero
