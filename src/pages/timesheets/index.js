import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import securePage from '../../_utilities/securePage';
import TableList from '../../components/Timesheets/TableList';
import moment from 'moment';

const Timesheets = () => {
	const router = useRouter();
	
	return (
		<Layout>
			<h1>Timesheets</h1>
			<div id="action-buttons" className="mb-2 clearfix">
				<button
					className="btn btn-success btn-sm float-right"
					onClick={() => 
						router.push(`/timesheets/week/${moment().startOf('week').format('YYYY-MM-DD')}/new`)
					}
				>
					<i className="fas fa-plus"></i>
				</button>
			</div>
			<TableList/>
		</Layout>
	);
};

Timesheets.getInitialProps = async ctx => {
	await securePage(ctx);
	return {};
};

export default Timesheets;