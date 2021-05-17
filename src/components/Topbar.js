import Link from 'next/link';
import styled from 'styled-components';
import { logout } from './Auth/auth-utils';
import { ScenarioAttributes } from '@components/Scenario';

const TopbarContainer = styled.nav`
    position: fixed;
    top: 0;
    right: 0;
    left: 190px;
    background: #3359EC;
    height: 60px;
    padding: .5rem 1rem;
    display: flex;
    z-index: 1030;
    align-items: center;
`;

const MenuRight = styled.div`
    margin: 0 0 0 auto;
    color: #fff;
`;

const MenuItem = styled.button`
    color: #fff;

    :hover {
        color: #666;
        background: #fff;
    }
`;

const Topbar = () => {
    return (
        <TopbarContainer id="topbar">
            <MenuRight>
                <Link href="/stuff-shop/cart">
                    <MenuItem
                        id="btn-shopping-cart"
                        className="btn btn-link mr-2"
                        {...ScenarioAttributes("stage1", {
                            "aria-label": "Shopping Cart",
                        })}
                    >
                        <i className="fas fa-shopping-cart"></i>
                    </MenuItem>
                </Link>

                <MenuItem
                    onClick={logout}
                    id="btn-sign-out"
                    className="btn btn-link"
                    {...ScenarioAttributes("stage1", {
                        "aria-label": "Sign Out",
                    })}
                >
                    <i className="fas fa-sign-out-alt"></i>
                </MenuItem>
            </MenuRight>
        </TopbarContainer>
    );
}

export default Topbar;