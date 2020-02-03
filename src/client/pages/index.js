import React, { useState } from 'react';
import Layout from '../components/Layout';
import CookieConsent from 'react-cookie-consent';
import securePage from '../_utilities/securePage';
import Main from '../components/Dashboard/main';

const Index = () => {
	return (
		<Layout>
			<Main />
			<CookieConsent>
				This website uses cookies to enhance the user experience.
			</CookieConsent>
		</Layout>
	);
};

Index.getInitialProps = async ctx => {
	await securePage(ctx);
	return {};
};

export default Index;