import { Fragment } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
// import classes from './Navigation.module.css'
import logoImage from '../assets/logo.jpg';

const NavBar = () => {
    return (
        <Fragment>
            <Navbar
            // expand="lg"
            bg="light"
            variant="light"
            className="p-2 shadow bg-success"
            // className="row col-12 d-flex justify-content-center text-white"
            >
                <Container>
                    <Navbar.Brand href="#home" className="fs-2 fst-italic">
                        <img 
                        src={logoImage}
                        height='40'
                        alt=""
                        loading="lazy"
                        />
                        MyWebLink
                    </Navbar.Brand>
                    <Nav className="ms-auto">
                        <Nav.Link href="#home" className="me-5 nav-item fs-5">
                            Home
                        </Nav.Link>
                        <Nav.Link href="#products" className="me-5 nav-item fs-5">
                            Products
                        </Nav.Link>
                        <Nav.Link href="#aboutus" className="me-5 nav-item fs-5">
                            About Us
                        </Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </Fragment>
    )
};

export default NavBar;