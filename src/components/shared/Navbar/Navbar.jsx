import { Link } from 'react-router-dom'
import comfyLogoWhite from '../../../assets/comfy-logo-white.svg'
import comfyLogoBlack from '../../../assets/comfy-logo-black.svg'

import { FaBars, FaShoppingCart } from 'react-icons/fa'

function Navbar({ dark, toggleSidebar, toggleShoppingCart, totalCart }) {
  return (
    <nav className='navbar'>
      <div className='container navbar__container'>
        <button
          className='navbar__open-btn'
          type='button'
          onClick={toggleSidebar}
        >
          <FaBars />
        </button>
        <ul className={`navbar__links ${dark ? 'navbar__links--dark' : ''}`}>
          <li className='navbar__link'>
            <Link to='/'>Home</Link>
          </li>
          <li className='navbar__link'>
            <Link to='/products'>Products</Link>
          </li>
          <li className='navbar__link'>
            <Link to='/about'>About</Link>
          </li>
        </ul>
        <Link className='navbar__logo' to='/'>
          <img
            className='navbar__logo-img'
            src={dark ? comfyLogoBlack : comfyLogoWhite}
            alt='Comfy Store'
          />
        </Link>
        <button
          className={`navbar__cart-btn ${dark ? 'navbar__cart-btn--dark' : ''}`}
          type='button'
          onClick={toggleShoppingCart}
        >
          <FaShoppingCart />
          <span className='navbar__item-total'>{totalCart}</span>
        </button>
      </div>
    </nav>
  )
}

export default Navbar
