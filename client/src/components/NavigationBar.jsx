import { NavLink } from 'react-router-dom'
import { Dropdown, Navbar, NavbarLink, Avatar } from 'flowbite-react'

const NavigationBar = () => {
  return (
    <Navbar fluid rounded className="navbar p-2.5">
      <Navbar.Brand>
        <NavLink to="/" as={NavbarLink} className="nav-logo">
          <img
            src="/icons/MatchIQ_logo.svg"
            className="mr-3 h-6 sm:h-9"
            alt="Your Logo"
          />
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            MatchIQ
          </span>
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
      </Navbar.Collapse>

      <div className="flex md:order-2 user-profile">
        <Dropdown
          arrowIcon={false}
          inline
          label={
            <Avatar
              alt="User settings"
              img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
              rounded
            />
          }
        >
          <Dropdown.Header>
            <span className="block text-sm">User Profile</span>
            <span className="block truncate text-sm font-medium">
              name@flowbite.com
            </span>
          </Dropdown.Header>
          <Dropdown.Item>Dashboard</Dropdown.Item>
          <Dropdown.Item>Settings</Dropdown.Item>
          <Dropdown.Item>Sign out</Dropdown.Item>
        </Dropdown>
        <Navbar.Toggle />
      </div>
    </Navbar>
  )
}

export default NavigationBar
