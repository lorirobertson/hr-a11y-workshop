import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import axios from 'axios';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';
import auth from '../../_utilities/auth';

export default class Topbar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            redirect: false,
            user: {}
        };
    }

    componentDidMount() {
        const user = JSON.parse(localStorage.getItem('user'));
         
        this.setState({
            user
        })
    }

    handleLogout() {
        auth.clearAppStorage();
        delete axios.defaults.headers.common["Authorization"];
        this.setState({
            redirect: true
        });
    }

    render() {
        if ( this.state.redirect ) {
            return <Redirect to={`/`} />;
        }

        return (
            <Navbar id="topbar" className="fixed-top navbar-expand" light>
                <a href="#" className="navbar-toggle" onClick={this.props.toggle}>
                    <i className="fal fa-bars fa-2x"></i>
                </a>
                <Nav className="mr-auto d-none d-md-block" navbar>
                    <NavItem>
                        <div className="search-box" >
                            <input type="search" aria-label="Search" placeholder="Search" />
                        </div>
                    </NavItem>
                </Nav>
                <Nav className="ml-auto" navbar>
                    <NavItem>
                        <NavLink
                            tag={Link}
                            to={`/stuff-shop/cart`}
                            aria-label="Shopping Cart">
                            <i className="fas fa-shopping-cart px-3"></i>
                        </NavLink>
                    </NavItem>
                    <UncontrolledDropdown nav inNavbar>
                        <DropdownToggle nav caret className="nav-pill">
                            {this.state.user.fullName}
                        </DropdownToggle>
                        <DropdownMenu right>
                            <DropdownItem
                                tag={Link}
                                to="/account">
                                My Account
                            </DropdownItem>

                            <DropdownItem divider />

                            <DropdownItem
                                onClick={() => { this.handleLogout() }}
                                tag={Link}
                                to="#">
                                <i className="fas fa-sign-out-alt"></i>
                                {' '}
                                Logout
                            </DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                </Nav>
            </Navbar>
        );
    }
}

Topbar.defaultProps = {
    toggle: (e) => { e.preventDefault(); }
}