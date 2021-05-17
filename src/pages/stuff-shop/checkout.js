import React from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import securePage from '../../_utilities/securePage';
import Checkout from '../../components/StuffShop/Checkout';

const CheckoutPage = () => {
	const router = useRouter();
	
	return (
		<Layout>
			<Checkout />
		</Layout>
	);
};

CheckoutPage.getInitialProps = async ctx => {
	await securePage(ctx);
	return {};
};

export default CheckoutPage;