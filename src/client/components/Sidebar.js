import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import styled, { css } from 'styled-components';

const SidebarContainer = styled.aside`
    z-index: 1;
    position: fixed;
    width: 190px;
    left: 0;
    top: 0;
    bottom: 0;
    background: #fff;
    margin-left: 0;
    //transition: all 0.2s;
    box-shadow: 0px 1px 18px rgba(50, 50, 50, 0.2);
    overflow-y: scroll;
`;

const Logo = styled.a`
    display: block;
    text-align: center;
    padding: 2.55em 1em;
    display: block;
    color: #000;
    transition: all 0.2s;
    font-weight: 500;
    font-size: 18px;
    cursor: pointer;

    :hover {
        background: #3359EC;
    }
`;

const NavItem = styled.a`
    display: block;
    text-align: center;
    padding: 2.55em 1em;
    display: block;
    color: #000;
    transition: all 0.2s;
    font-weight: 500;
    font-size: 18px;
    cursor: pointer;

    ${props => props.active && css`
        border-left: 10px solid #91D55C;
        background: #F3F2F3;
    `}

    :hover {
        background: #F3F2F3;
    }

    > i.fas {
        color: #552CA1;
        display: block;
        text-align: center;
        font-size: 2em;
    }
`;

const Sidebar = () => {
    const [currentPath, setCurrentPath] = useState(null);

    useEffect(() => {
        setCurrentPath(document.location.pathname);
    }, []);

    return (
        <SidebarContainer id="sidebar">
            <Link href="/">
                <Logo href="/" id="main-logo" aria-label="HR A11y Logo">
                    <span className="fa-stack fa-3x">
                        <i className="fas fa-circle fa-stack-2x"></i>
                        <i className="fas fa-bolt fa-stack-1x fa-inverse"></i>
                    </span>
                </Logo>
            </Link>

            <Link href="/">
                <NavItem active={currentPath==='/'} href="/" id="link-home">
                    <i className="fas fa-home"></i>
                    Home
                </NavItem>
            </Link>

            <Link href="/timesheets">
                <NavItem active={currentPath==='/timesheets'} href="/timesheets" id="link-timesheets">
                    <i className="fas fa-clock"></i>
                    Timesheets
                </NavItem>
            </Link>

            <Link href="/stuff-shop">
                <NavItem active={currentPath==='/stuff-shop'} href="/stuff-shop" id="link-stuffshop">
                    <i className="fas fa-shopping-cart"></i>
                    Stuff Shop
                </NavItem>
            </Link>

            <Link href="/news">
                <NavItem active={currentPath==='/news'} href="/news" id="link-news">
                    <i className="fas fa-book"></i>
                    News
                </NavItem>
            </Link>
        </SidebarContainer>
    );
}

export default Sidebar;