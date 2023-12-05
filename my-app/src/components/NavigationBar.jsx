import React from "react";
import { Link } from "react-router-dom";
import { Button, Navbar, NavbarBrand, NavbarCollapse, NavbarLink, NavbarToggle } from 'flowbite-react';


const NavigationBar = () => {
  return (
    <Navbar fluid rounded>
      <Navbar.Brand href="/">
        <img src="/icons/MatchIQ_logo.svg" className="mr-3 h-6 sm:h-9" alt="Your Logo" />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">MatchIQ</span>
      </Navbar.Brand>

      <Navbar.Collapse>
        <Navbar.Link href="/" active>
          Home
        </Navbar.Link>
        <Navbar.Link href="/find-jobs">Find Jobs</Navbar.Link>
        <Navbar.Link href="/how-it-works">How it Works</Navbar.Link>
        <Navbar.Link href="/about-us">About Us</Navbar.Link>
      </Navbar.Collapse>
      <div className="flex md:order-2">
        <Button>Get started</Button>
        <Navbar.Toggle />
      </div>
    </Navbar>
  );
};

export default NavigationBar;
