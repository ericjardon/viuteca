import React, { useState } from 'react'
import styles from './styles/NavBar.module.scss'
import { Navbar, NavbarBrand, Nav, NavItem, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, Input, InputGroup, InputGroupAddon, InputGroupText, InputGroupButtonDropdown } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import photo from '../assets/viutecaLogoComplete.png'
import mGlass from '../assets/mGlass.png'

export default function NavHeader(props) {
    const [dropdownopen, setOpen] = useState(false);
    const [splitButtonOpen, setSplitButtonOpen] = useState(false);

    const toggle = () => setOpen(!dropdownopen);
    const toggleSplit = () => setSplitButtonOpen(!splitButtonOpen);    

    return (
            <div>
                <Navbar color="black" >
                    <NavbarBrand href='/' >
                            <img src={photo} alt='ViutecaLogo' style={{width:"auto", height:"auto"}}/>
                    </NavbarBrand>
                    <div style={{width:"45%"}}>
                        <InputGroup> 
                            <InputGroupAddon><InputGroupText style={{backgroundColor:"transparent", border:"none"}}><img src={mGlass} style={{width:"30px"}}></img></InputGroupText></InputGroupAddon> 
                            <Input placeholder="Busqueda"></Input>
                            <InputGroupButtonDropdown isOpen={splitButtonOpen} toggle={toggleSplit}>
                                <DropdownToggle split style={{color:"white", backgroundColor:"transparent", border:"none"}}> </DropdownToggle>
                                <DropdownMenu style={{backgroundColor: 'black', border:'None', fontSize:"100%"}}>
                                    <DropdownItem style={{color:'white'}}>Titulo</DropdownItem>
                                    <DropdownItem style={{color:'white'}}>Fecha</DropdownItem>
                                    <DropdownItem style={{color:'white'}}>Asosiación</DropdownItem>
                                </DropdownMenu>
                            </InputGroupButtonDropdown>
                        </InputGroup>
                    </div>
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

