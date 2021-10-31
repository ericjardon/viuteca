import React, { useState } from 'react'
import styles from './styles/NavBar.module.scss'
import {
    Navbar, NavbarBrand, Nav, NavItem, ButtonDropdown, DropdownToggle,
    DropdownMenu, DropdownItem, Input, InputGroup, InputGroupAddon, InputGroupText,
    InputGroupButtonDropdown
} from 'reactstrap';
import { NavLink, Redirect, withRouter } from 'react-router-dom';
import { useMediaSize } from "use-media-size";
import fullLogo from '../assets/viutecaLogoComplete.png';
import iconLogo from '../assets/viutecaLogo.png';
import mGlass from '../assets/mGlass.png';

const placeholders = {
    'owner': 'Busca por autor',
    'title': 'Busca por título',
    'date': 'Busca por fecha: 2020-11-03'
}

const NavHeader = (props) => {
    const [dropdownopen, setOpen] = useState(false);
    const [splitButtonOpen, setSplitButtonOpen] = useState(false);
    const [searchTerm, setsearchTerm] = useState("")
    const [searchType, setsearchType] = useState("owner")
    const [placeholderSearch, setplaceholderSearch] = useState(placeholders["owner"])
    const [redirectToVideos, setRedirectToVideos] = useState(false)
    const { submitSearch } = props;

    const {location, history} = props;
    console.log("You are now at ", location.pathname)

    const { isMd, isSm } = useMediaSize();
    const toggle = () => setOpen(!dropdownopen);
    const toggleSplit = () => setSplitButtonOpen(!splitButtonOpen);

    const handleOnChange = (e) => {
        setsearchTerm(e.target.value);
    }

    const handleDropdown = (e) => {
        let type = e.target.value;
        console.log("Search type", type);
        setsearchType(type);
        setplaceholderSearch(placeholders[type]);
    }

    const handleKeyPressed = (e) => {
        if (e.key === 'Enter') {
            const nextPath = '/videos?' + `searchType=${searchType}&searchTerm=${searchTerm}`
            console.log("Pressed enter!!");
            submitSearch(searchTerm, searchType);
            history.push(nextPath)
        }
    }

    if (redirectToVideos) {
        console.log("Redirecting", searchTerm, searchType);
        return (
            <Redirect 
                to={{
                    pathname: "/videos",
                    state: {searchTerm,
                    searchType}
                }}
            />
        )
    }

    const show = location.pathname !== '/login' && location.pathname !== '/register'
    if (show)
    return (
        <div>
            <Navbar color="black" style={{ padding: 0 }}>
                <NavbarBrand href='/'>
                    <img className={isMd ? styles.iconLogo : styles.fullLogo} src={isMd ? iconLogo : fullLogo} alt='ViutecaLogo' />
                </NavbarBrand>
                <div style={{ width: "45%" }}>
                    <InputGroup>
                        <InputGroupAddon><InputGroupText style={{ backgroundColor: "transparent", border: "none" }}><img src={mGlass} style={{ width: "30px" }}></img></InputGroupText></InputGroupAddon>
                        <Input placeholder={placeholderSearch} onChange={handleOnChange} onKeyPress={handleKeyPressed}></Input>
                        <InputGroupButtonDropdown isOpen={splitButtonOpen} toggle={toggleSplit}>
                            <DropdownToggle split style={{ color: "white", backgroundColor: "transparent", border: "none" }}> </DropdownToggle>
                            <DropdownMenu style={{ backgroundColor: 'black', border: 'None', fontSize: "100%" }}>
                                <DropdownItem value="title" style={{ color: 'white' }} onClick={handleDropdown}>Titulo</DropdownItem>
                                <DropdownItem value="owner" style={{ color: 'white' }} onClick={handleDropdown}>Autor</DropdownItem>
                                <DropdownItem value="date" style={{ color: 'white' }} onClick={handleDropdown}>Fecha</DropdownItem>
                            </DropdownMenu>
                        </InputGroupButtonDropdown>
                    </InputGroup>
                </div>
                <Nav navbar style={{ width: "22%" }}>
                    <NavItem>
                        <ButtonDropdown direction="down" isOpen={dropdownopen} toggle={toggle}>
                            <DropdownToggle style={{ backgroundColor: 'black', border: 'None', fontSize: isSm ? "18px" : "24px" }} caret>Menu</DropdownToggle>
                            <DropdownMenu style={{ backgroundColor: 'black' }}>
                                <DropdownItem>
                                    <NavLink style={{ color: 'white' }} className='nav-link' to='/'>
                                        HOME
                                    </NavLink>
                                </DropdownItem>
                                <DropdownItem divider />

                                <DropdownItem>
                                    <NavLink style={{ color: 'white' }} className='nav-link' to='/register'>
                                        AÑADIR VIDEO
                                    </NavLink>
                                </DropdownItem>
                                <DropdownItem divider />

                                <DropdownItem>
                                    <NavLink style={{ color: 'white' }} className='nav-link' to='/projects'>
                                        CERRAR SESIÓN
                                    </NavLink>
                                </DropdownItem>
                            </DropdownMenu>
                        </ButtonDropdown>
                    </NavItem>
                </Nav>
            </Navbar>
        </div>
    )

    return (null)
}


export default withRouter(NavHeader)
