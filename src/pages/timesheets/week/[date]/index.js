import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../../../components/Layout';
import TableList from '../../../../components/Timesheets/TableList';

const TimesheetsPerWeek = () => {
	const router = useRouter();
	const { date } = router.query;

	return (
		<Layout>
			<h1>All Timesheets - {date}</h1>
			<div id="action-buttons" className="mb-2">
				<button
					className="btn btn-secondary btn-sm"
					onClick={() => router.push('/timesheets')}
				>
					<i className="fas fa-chevron-left"></i>
				</button>

				<button
					className="btn btn-success btn-sm float-right"
					onClick={() => 
						router.push(`/timesheets/week/${date}/new`)
					}
				>
					<i className="fas fa-plus"></i>
				</button>
			</div>
			<TableList isDetailedView date={date} />
		</Layout>
	);
};

export default TimesheetsPerWeek;