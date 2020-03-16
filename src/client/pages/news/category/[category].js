import React from 'react';
import { useRouter } from 'next/router';
import Layout from '../../../components/Layout';
import securePage from '../../../_utilities/securePage';
import BlogHome from '../../../components/Blog/BlogHome';

const NewsCategory = () => {
    const router = useRouter();
    const { category } = router.query;
	
	return (
		<Layout>
            <BlogHome category={category} />
		</Layout>
	);
};

NewsCategory.getInitialProps = async ctx => {
	await securePage(ctx);
	return {};
};

export default NewsCategory;