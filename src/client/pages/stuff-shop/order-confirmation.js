import React from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import securePage from '../../_utilities/securePage';
import Confirmation from '../../components/StuffShop/Confirmation';

const OrderConf = () => {
	const router = useRouter();
	
	return (
		<Layout>
			<Confirmation />
		</Layout>
	);
};

OrderConf.getInitialProps = async ctx => {
	await securePage(ctx);
	return {};
};

export default OrderConf;