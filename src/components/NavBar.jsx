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
                <div className='container' style={{}}>
                    <NavbarBrand className="mr-auto" href='/'>
                        <img src={photo} alt='ViutecaLogo' />
                    </NavbarBrand>
                    <Nav navbar>
                        <NavItem >
                            <Input></Input>
                        </NavItem>
                        <NavItem >
                            <ButtonDropdown  direction="down" isOpen={dropdownopen} toggle={toggle}>
                                <DropdownToggle style={{backgroundColor: 'black', border:'None'}} caret>Menu</DropdownToggle>
                                <DropdownMenu  style={{backgroundColor: 'black'}}>
                                    <DropdownItem>
                                        <NavLink style={{color:'white'}} className='nav-link' to='/'>
                                            Home
                                        </NavLink>
                                    </DropdownItem>
                                    <DropdownItem divider />

                                    <DropdownItem>
                                        <NavLink style={{color:'white'}} className='nav-link' to='/register'>
                                            Register
                                        </NavLink>
                                    </DropdownItem>
                                    <DropdownItem divider />

                                    <DropdownItem>
                                        <NavLink style={{color:'white'}} className='nav-link' to='/projects'>
                                            Projects
                                        </NavLink>
                                    </DropdownItem>
                                </DropdownMenu>
                            </ButtonDropdown>
                        </NavItem>
                    </Nav>
                </div>
            </Navbar >
    )
}

