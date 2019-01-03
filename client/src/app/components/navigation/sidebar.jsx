import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Nav, NavItem, Dropdown, DropdownToggle } from 'reactstrap';

export default class Sidebar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            open: this.props.open
        };
    }

    componentDidMount() {}

    componentWillReceiveProps(nextProps) {
        if (nextProps.open !== this.state.open) {
            this.setState({ open: nextProps.open });
        }
    }    

    render() {
        return (
            <aside id="sidebar" className={ (this.state.open ? 'open' : '') + ' static'}>
                <div id="close-sidebar" hidden={!this.state.open}>
                    <i className="fas fa-times fa-2x" onClick={this.props.toggle}></i>
                </div>
                <nav id="sidebar-nav" className="navbar-default navbar-static-side" aria-label="Main navigation">
                    <div className="sidebar-collapse">
                        <Nav vertical id="side-menu">
                            <NavItem className="nav-header">
                                <Link to="/" className="navbar-brand" aria-label="Deque Demo">
                                    <span className="fa-stack fa-3x">
                                        <i className="fas fa-circle fa-stack-2x"></i>
                                        <i className="fas fa-bolt fa-stack-1x fa-inverse"></i>
                                    </span>
                                </Link>
                            </NavItem>
                            <NavItem>
                                <NavLink to="/" exact className="nav-link" activeClassName="active">
                                    <i className="fas fa-home" />
                                    <span className="nav-label">Home</span>
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink to="/timesheets" className="nav-link" activeClassName="active">
                                    <i className="fas fa-clock" />
                                    <span className="nav-label">Timesheets</span>
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink to="/stuff-shop" className="nav-link" activeClassName="active">
                                    <i className="fas fa-shopping-cart" />
                                    <span className="nav-label">Stuff Shop</span>
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink to="/blog" className="nav-link" activeClassName="active">
                                    <i className="fas fa-book" />
                                    <span className="nav-label">Blog</span>
                                </NavLink>
                            </NavItem>
                        </Nav>
                    </div>
                </nav>
            </aside>
        );
    }
}