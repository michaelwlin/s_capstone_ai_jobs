import { useState, useContext } from 'react'
import { useNavigate, NavLink } from 'react-router-dom'
import { Dropdown, Navbar, NavbarLink, Avatar } from 'flowbite-react'
import { FaUser } from 'react-icons/fa';
import useAuth from '../hooks/useAuth';

const NavigationBar = () => {
  const navigate = useNavigate();
  const { auth } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const signIn = () => {
    // Navigate to register/sign-up page
    navigate('/login');
  };
  const register = () => {
    // Navigate to register/sign-up page
    navigate('/register');
  };

  const handleSignOut = () => {

    navigate('/');
  }

  const userNavigation = () => {
    if (auth.isAuthenticated) {
      return (
        <div>
          <Dropdown.Header>
            <span className="block text-sm">User Profile</span>
            <span className="block truncate text-sm font-medium">
              name@flowbite.com
            </span>
          </Dropdown.Header>
          <Dropdown.Item>Dashboard</Dropdown.Item>
          <Dropdown.Item>Settings</Dropdown.Item>
          <Dropdown.Item onClick={handleSignOut}>Sign out</Dropdown.Item>
        </div>
      )
    } else {
      return (
        <div>
          <NavLink
            to="/signin"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            Sign In
          </NavLink>
          <NavLink
            to="/register"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            Register
          </NavLink>
        </div>
      )
    }
  }

  return (
    <Navbar fluid rounded className="navbar p-2.5">
      <Navbar.Brand to="/" className="nav-logo" as={NavLink}>
        <img
          src="/icons/MatchIQ_transparent.png"
          className="mr-3 h-6 sm:h-9"
          alt="MatchIQ"
        />
      </Navbar.Brand>

      <Navbar.Collapse className="nav-menu">
        <Navbar.Link to="/" as={NavLink}>
          Home
        </Navbar.Link>
        <Navbar.Link to="/find-jobs" as={NavLink}>
          Find Jobs
        </Navbar.Link>
        <Navbar.Link to="/how-it-works" as={NavLink}>
          How it Works
        </Navbar.Link>
        <Navbar.Link to="/about-us" as={NavLink}>
          About Us
        </Navbar.Link>
      </Navbar.Collapse>

      <div className="flex md:order-2 user-profile">
        <Dropdown
          arrowIcon={false}
          inline
          label={<Avatar alt="User settings" img={FaUser} rounded />}
        >
          {userNavigation()}
        </Dropdown>
        <Navbar.Toggle />
      </div>
    </Navbar>
  )
}

export default NavigationBar
