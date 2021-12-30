import comfyLogoWhite from '../../assets/comfy-logo-white.svg'
import comfyLogoBlack from '../../assets/comfy-logo-black.svg'

import { FaBars, FaShoppingCart } from 'react-icons/fa'

function Navbar({ dark }) {
  return (
    <nav className='navbar'>
      <div className='container navbar__container'>
        <button className='navbar__open-btn' type='button'>
          <FaBars />
        </button>
        <ul className={`navbar__links ${dark ? 'navbar__links--dark' : ''}`}>
          <li className='navbar__link'>
            <a href='/home'>Home</a>
          </li>
          <li className='navbar__link'>
            <a href='/products'>Products</a>
          </li>
          <li className='navbar__link'>
            <a href='/about'>About</a>
          </li>
        </ul>
        <a className='navbar__logo' href='/'>
          <img
            className='navbar__logo-img'
            src={dark ? comfyLogoBlack : comfyLogoWhite}
            alt='Comfy Store'
          />
        </a>
        <button
          className={`navbar__cart-btn ${dark ? 'navbar__cart-btn--dark' : ''}`}
          type='button'
        >
          <FaShoppingCart />
          <span className='navbar__item-total'>0</span>
        </button>
      </div>
    </nav>
  )
}

export default Navbar
