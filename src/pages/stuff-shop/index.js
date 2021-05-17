import React from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import securePage from '../../_utilities/securePage';
import ProductList from '../../components/StuffShop/ProductList';

const StuffShop = () => {
	const router = useRouter();
	
	return (
		<Layout>
			<ProductList />
		</Layout>
	);
};

StuffShop.getInitialProps = async ctx => {
	await securePage(ctx);
	return {};
};

export default StuffShop;