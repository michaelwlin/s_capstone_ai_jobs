import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Dropdown, Navbar, NavbarLink, Avatar } from 'flowbite-react'
import { FaUser } from 'react-icons/fa'

const NavigationBar = () => {
  const [signedIn, setSignedIn] = useState(false)

  const signIn = () => { }
  const register = () => { }

  const userNavigation = () => {
    if (signedIn) {
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
          <Dropdown.Item>Sign out</Dropdown.Item>
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
        <NavLink to="/" as={NavbarLink} className="nav-logo">
          <img
            src="/icons/MatchIQ_transparent.png"
            className="mr-3 h-6 sm:h-9"
            alt="MatchIQ"
          />
        </NavLink>
      </Navbar.Brand>

      <Navbar.Collapse className="nav-menu">
        <NavLink to="/" as={NavbarLink}>
          Home
        </NavLink>
        <NavLink to="/find-jobs" as={NavbarLink}>
          Find Jobs
        </NavLink>
        <NavLink to="/how-it-works" as={NavbarLink}>
          How it Works
        </NavLink>
        <NavLink to="/about-us" as={NavbarLink}>
          About Us
        </NavLink>
        <NavLink to="/login" as={NavbarLink}>
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
