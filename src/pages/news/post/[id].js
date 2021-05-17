import React from 'react';
import { useRouter } from 'next/router';
import Layout from '../../../components/Layout';
import securePage from '../../../_utilities/securePage';
import BlogHome from '../../../components/Blog/BlogHome';

const NewsPost = () => {
    const router = useRouter();
    const { id } = router.query;
	
	return (
		<Layout>
            <BlogHome id={id} />
		</Layout>
	);
};

NewsPost.getInitialProps = async ctx => {
	await securePage(ctx);
	return {};
};

export default NewsPost;