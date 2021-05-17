import { useRef, useState, useEffect } from 'react';
import Router from 'next/router';
import styled, { css } from 'styled-components';
import { authenticateUser, getUserInfo } from './auth-utils';

import {ScenarioDisplay, ScenarioTagWrapper} from '@components/Scenario';

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

const Login = () => {
    const inpUsername = useRef(null);
    const inpPassword = useRef(null);

    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [loginError, setLoginError] = useState(false);

    useEffect(() => {
        if ( loginError ) {
            setLoginError(false);
        }
    }, [username, password]);

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

                <ScenarioTagWrapper as="h1" original="h4" minScenario="stage1">
                    Please Sign In
                </ScenarioTagWrapper>

                <div
                    className="alert alert-danger my-3"
                    hidden={!loginError}
                >
                    The username and password combination you provided don't match.
                </div>

                <div id="form-group-username" className="my-3">
                    <ScenarioDisplay minScenario="stage1">
                        <label htmlFor="username">Email</label>
                    </ScenarioDisplay>

                    <input
                        ref={inpUsername}
                        name="username"
                        id="username"
                        type="text"
                        className="form-control"
                        onChange={e => setUsername(e.target.value)}
                    />
                </div>

                <div id="form-group-password" className="my-3">
                    <ScenarioDisplay minScenario="stage1">
                        <label htmlFor="password">Password</label>
                    </ScenarioDisplay>

                    <input
                        ref={inpPassword}
                        name="password"
                        id="password"
                        type="password"
                        className="form-control"
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>

                <button
                    className="btn btn-lg btn-primary btn-block"
                    disabled={!username || !password}
                >
                    Sign In!
                </button>

            </Form>
        </Container>
    );
}

export default Login;