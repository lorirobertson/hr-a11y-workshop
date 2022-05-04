import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../../../components/Layout';
import securePage from '../../../../_utilities/securePage';
import TableList from '../../../../components/Timesheets/TableList';
import { ScenarioAttributes } from '../Scenario';

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
					{...ScenarioAttributes("stage2", {
						"aria-label": "Go back, all timesheets",
					})}
				>
					<i className="fas fa-chevron-left"></i>
				</button>

				<button
					className="btn btn-success btn-sm float-right"
					onClick={() =>
						router.push(`/timesheets/week/${date}/new`)
					}
					{...ScenarioAttributes("stage2", {
						"aria-label": "New timesheet",
					})}
				>
					<i className="fas fa-plus"></i>
				</button>
			</div>
			<TableList isDetailedView date={date} />
		</Layout>
	);
};

TimesheetsPerWeek.getInitialProps = async ctx => {
	await securePage(ctx);
	return {};
};

export default TimesheetsPerWeek;
