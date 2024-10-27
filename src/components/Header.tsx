import {FC} from 'react'
import './Header.css'
import {Container, Nav, Navbar} from "react-bootstrap";
import {Link} from "react-router-dom";

const Header: FC = () => (
    <div className="border-gradient-green">
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand as={Link} to="/">Банк</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Link to="/contracts" className="nav-link">Договоры</Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </div>
)

export default Header