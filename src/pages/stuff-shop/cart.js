import React from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import securePage from '../../_utilities/securePage';
import ShoppingCart from '../../components/StuffShop/ShoppingCart';

const Cart = () => {
	const router = useRouter();
	
	return (
		<Layout>
			<ShoppingCart />
		</Layout>
	);
};

Cart.getInitialProps = async ctx => {
	await securePage(ctx);
	return {};
};

export default Cart;