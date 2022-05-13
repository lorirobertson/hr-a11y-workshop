import React from 'react';
import { useRouter } from 'next/router';
import Layout from '../../../components/Layout';
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

export default NewsPost;