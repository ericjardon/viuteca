import React, { useState } from 'react'
import styles from './styles/NavBar.module.scss'
import { Navbar, NavbarBrand, Nav, NavItem, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, Input, InputGroup, InputGroupAddon, InputGroupText, InputGroupButtonDropdown } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import photo from '../assets/viutecaLogoComplete.png'

export default function NavHeader(props) {
    const [dropdownopen, setOpen] = useState(false);
    const [splitButtonOpen, setSplitButtonOpen] = useState(false);

    const toggle = () => setOpen(!dropdownopen);
    const toggleSplit = () => setSplitButtonOpen(!splitButtonOpen);    

    return (
            <div>
                <Navbar color="black">
                    <NavbarBrand href='/' style={{width:"22%"}}>
                            <img src={photo} alt='ViutecaLogo' />
                    </NavbarBrand>
                    <InputGroup style={{width:"45%"}}>
                        {/* <InputGroupAddon><InputGroupText style={{backgroundColor:"white"}}><span>lupa</span></InputGroupText></InputGroupAddon>  */}
                        <Input placeholder="Busqueda" ></Input>
                        <InputGroupButtonDropdown isOpen={splitButtonOpen} toggle={toggleSplit}>
                            <DropdownToggle split> </DropdownToggle>
                            <DropdownMenu style={{backgroundColor: 'black', border:'None', fontSize:"100%"}}>
                                <DropdownItem style={{color:'white'}}>Titulo</DropdownItem>
                                <DropdownItem style={{color:'white'}}>Fecha</DropdownItem>
                                <DropdownItem style={{color:'white'}}>Asosiación</DropdownItem>
                            </DropdownMenu>
                        </InputGroupButtonDropdown>
                    </InputGroup>
                    <Nav navbar style={{width:"22%"}}>
                        <NavItem>
                            <ButtonDropdown  direction="down" isOpen={dropdownopen} toggle={toggle}>
                                <DropdownToggle style={{backgroundColor: 'black', border:'None', fontSize:"170%"}} caret>Menu</DropdownToggle>
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
                </Navbar>
            </div>
    )
}

