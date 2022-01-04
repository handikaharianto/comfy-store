import { Link } from 'react-router-dom'
import { FaHome, FaCouch, FaBook, FaTimes } from 'react-icons/fa'
import { useSidebar } from '../../../context/SidebarContext'

function Sidebar() {
  const { isSidebarOpen, toggleSidebar } = useSidebar()

  return (
    <div
      className={`sidebar-overlay ${
        isSidebarOpen ? 'sidebar-overlay--active' : ''
      }`}
    >
      <aside className='sidebar'>
        <ul className='sidebar__links'>
          <li>
            <Link className='sidebar__link' to='/'>
              <FaHome />
              Home
            </Link>
          </li>
          <li>
            <Link className='sidebar__link' to='/products'>
              <FaCouch />
              Products
            </Link>
          </li>
          <li>
            <Link className='sidebar__link' to='/about'>
              <FaBook />
              About
            </Link>
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
