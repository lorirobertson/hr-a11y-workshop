import React from 'react';
import { useRouter } from 'next/router';
import Layout from '../../../components/Layout';
import securePage from '../../../_utilities/securePage';
import ProductDetail from '../../../components/StuffShop/ProductDetail';

const ProductPage = () => {
    const router = useRouter();
    const { id } = router.query;
	
	return (
		<Layout>
			<ProductDetail id={id} />
		</Layout>
	);
};

ProductPage.getInitialProps = async ctx => {
	await securePage(ctx);
	return {};
};

export default ProductPage;