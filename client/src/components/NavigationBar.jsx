import { useState, useContext } from 'react'
import { useNavigate, NavLink } from 'react-router-dom'
import { Dropdown, Navbar, NavbarLink, Avatar } from 'flowbite-react'
import { FaUser } from 'react-icons/fa';
import useAuth from '../hooks/useAuth';

const NavigationBar = () => {
  const navigate = useNavigate();
  const { auth } = useAuth();

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
          <Dropdown.Item onClick={signIn}>Sign In</Dropdown.Item>
          <Dropdown.Item onClick={register}>Register</Dropdown.Item>
        </div>
      )
    }
  }

  return (
    <Navbar fluid rounded className="navbar p-2.5">
      <Navbar.Brand>
        <NavLink to="/" className="nav-logo">
          <img
            src="/icons/MatchIQ_transparent.png"
            className="mr-3 h-6 sm:h-9"
            alt="MatchIQ"
          />
        </NavLink>
      </Navbar.Brand>

      <Navbar.Collapse className="nav-menu">
        <NavLink to="/">
          Home
        </NavLink>
        <NavLink to="/find-jobs">
          Find Jobs
        </NavLink>
        <NavLink to="/how-it-works">
          How it Works
        </NavLink>
        <NavLink to="/about-us">
          About Us
        </NavLink>
        <NavLink to="/login">
          Login
        </NavLink>
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
