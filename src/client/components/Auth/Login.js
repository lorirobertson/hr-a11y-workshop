import { useRef, useState } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import styled, { css } from 'styled-components';
//import request from '../../_utilities/request';
import { authenticateUser, getUserInfo } from './auth-utils';

const Container = styled.div`
    display: flex;
    height: 100%;
`;

const Form = styled.form`
    width: 100%;
    max-width: 30em;
    margin: auto;
    text-align: center;
    padding: 2em;
    background: #fff;
    border-radius: 2px;
    border: 1px solid #e8e9ec;
    box-shadow: 0px 1px 18px rgba(50, 50, 50, 0.2);
`;

const FormControl = styled.input`
    display: block;
    width: 100%;
    height: calc(2.25rem + 2px);
    padding: .375rem .75rem;
    font-size: 1rem;
    line-height: 1.5;
    color: #495057;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    border-radius: .25rem;
    transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;

    ${props => props.top && css`
        margin-bottom: -1px;
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
    `}

    ${props => props.bottom && css`
        margin-bottom: 10px;
        border-top-left-radius: 0;
        border-top-right-radius: 0;
    `}
`;

const Login = () => {
    const inpUsername = useRef(null);
    const inpPassword = useRef(null);

    const [loginError, setLoginError] = useState(false);

    function handleSubmit(e) {
        e.preventDefault();

        signIn(inpUsername.current.value, inpPassword.current.value);
    }


    async function signIn(identifier, password) {
        if ( identifier && password ) {
            const authSuccess = await authenticateUser('local', { identifier, password });
            if ( authSuccess ) {
                setLoginError(false);
                Router.push('/');
            } else {
                setLoginError(true);
            }
        }    
    } 

    return (
        <Container>
            <Form onSubmit={handleSubmit}>

                <h4>Please Sign In</h4>

                <div className="alert alert-danger my-3" hidden={!loginError}>
                    The username and password combination you provided don't match.
                </div>

                <FormControl
                    ref={inpUsername}
                    name="username"
                    type="text"
                    top
                />

                <FormControl
                    ref={inpPassword}
                    name="password"
                    type="text"
                    bottom
                    type="password"
                />

                <button className="btn btn-lg btn-primary btn-block">Sign In!</button>

                <Link href="/register">
                    <a className="mt-4 btn btn-link btn-block">
                        Need an account? Register here.
                    </a>
                </Link>

            </Form>
        </Container>
    );
}

export default Login;