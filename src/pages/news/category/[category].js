import React from 'react';
import { useRouter } from 'next/router';
import Layout from '../../../components/Layout';
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

export default NewsCategory;