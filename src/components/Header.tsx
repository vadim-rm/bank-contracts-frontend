import {FC, MouseEventHandler} from 'react'
import './Header.css'
import {Container, Nav, Navbar} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import {setIsModerator, setLogin, useIsAuthenticated, useIsModerator, useLogin} from "../slices/user.ts";
import {useDispatch} from "react-redux";
import {setName, setType} from "../slices/contracts.ts";
import {ROUTES} from "../Routes.ts";
import {api} from "../api";
import {useAsyncError} from "../api/useAsyncError.ts";

const Header: FC = () => {
    const authenticated = useIsAuthenticated()
    const isModerator = useIsModerator()
    const login = useLogin()
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const throwError = useAsyncError();

    const onLogout: MouseEventHandler<HTMLAnchorElement> = (e) => {
        e.preventDefault();

        api.users.logoutCreate().catch(throwError).finally(() => {
            dispatch(setLogin(undefined))
            dispatch(setIsModerator(false))

            dispatch(setName(""))
            dispatch(setType(""))

            localStorage.clear()
            navigate(ROUTES.HOME)
        })
    }

    return (
        <div className="border-gradient-green">
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand as={Link} to="/">Банк</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto" style={{flex: 1}}>
                            <Link to="/contracts" className="nav-link">Договоры</Link>
                            {authenticated && <Link to="/accounts" className="nav-link">Заявки на счета</Link>}
                            {isModerator &&
                                <Link to="/contracts/list" className="nav-link">Управление договорами</Link>}
                        </Nav>
                        <Nav className="me-auto">
                            {login ? <Link to="/me" className="nav-link me">{login}
                                <a className="logout" onClick={onLogout}>(Выйти)</a>
                            </Link> : <Link to="/login" className="nav-link">Войти</Link>}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
}

export default Header