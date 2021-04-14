import React, { useState } from 'react';
import Layout from '../components/Layout';
import Login from '../components/Auth/Login';

const LoginPage = () => {
	return (
		<Layout header={false} sidebar={false} isAuthPage>
			<Login />
		</Layout>
	);
};

LoginPage.getInitialProps = async ctx => {
	return {};
};

export default LoginPage;