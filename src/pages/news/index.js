import React from 'react';
import Layout from '../../components/Layout';
import securePage from '../../_utilities/securePage';
import BlogHome from '../../components/Blog/BlogHome';

const News = () => {
	return (
		<Layout>
			<BlogHome />
		</Layout>
	);
};

News.getInitialProps = async ctx => {
	await securePage(ctx);
	return {};
};

export default News;