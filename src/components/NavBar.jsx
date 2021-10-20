import React, { useState } from 'react'
import styles from './styles/NavBar.module.scss'
import { Navbar, NavbarBrand, Nav, NavItem, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, Input } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import photo from '../assets/viutecaLogoComplete.png'

export default function NavHeader(props) {
    const [dropdownopen, setOpen] = useState(false);

    const toggle = () => setOpen(!dropdownopen);

    return (
            <Navbar color="black" expand="lg">
                <div className='container'>
                    <NavbarBrand className="mr-auto" href='/'>
                        <img src={photo} alt='ViutecaLogo' />
                    </NavbarBrand>
                    <Nav navbar>
                        <NavItem>
                            <Input ></Input>
                        </NavItem>
                        <NavItem>
                            <ButtonDropdown isOpen={dropdownopen} toggle={toggle} color="black">
                                <DropdownToggle >Menu</DropdownToggle>
                                <DropdownMenu>
                                    <DropdownItem>
                                        <NavLink className='nav-link' to='/'>
                                            Home
                                        </NavLink>
                                    </DropdownItem>
                                    <DropdownItem divider />

                                    <DropdownItem>
                                        <NavLink className='nav-link' to='/register'>
                                            Register
                                        </NavLink>
                                    </DropdownItem>
                                    <DropdownItem divider />

                                    <DropdownItem>
                                        <NavLink className='nav-link' to='/projects'>
                                            Projects
                                        </NavLink>
                                    </DropdownItem>
                                    <DropdownItem divider />
                                </DropdownMenu>
                            </ButtonDropdown>
                        </NavItem>
                    </Nav>
                </div>
            </Navbar >
    )
}

