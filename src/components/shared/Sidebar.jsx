import { FaHome, FaCouch, FaBook, FaTimes } from 'react-icons/fa'

function Sidebar({ isSidebarOpen, toggleSidebar }) {
  return (
    <div
      className={`sidebar-overlay ${
        isSidebarOpen ? 'sidebar-overlay--active' : ''
      }`}
    >
      <aside className='sidebar'>
        <ul className='sidebar__links'>
          <li>
            <a className='sidebar__link' href='/'>
              <FaHome />
              Home
            </a>
          </li>
          <li>
            <a className='sidebar__link' href='/products'>
              <FaCouch />
              Products
            </a>
          </li>
          <li>
            <a className='sidebar__link' href='/about'>
              <FaBook />
              About
            </a>
          </li>
        </ul>
        <button
          className='sidebar__close-btn'
          type='button'
          onClick={toggleSidebar}
        >
          <FaTimes />
        </button>
      </aside>
    </div>
  )
}

export default Sidebar
