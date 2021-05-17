import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../../../components/Layout';
import securePage from '../../../../_utilities/securePage';
import TimeSheetEditor from '../../../../components/Timesheets/TimesheetEditor';

const NewTimesheet = () => {
	const router = useRouter();
	const { date } = router.query;
	  
	return (
		<Layout>
			{/* <h1>New Timesheet - {date}</h1> */}
			<TimeSheetEditor date={date}/>
		</Layout>
	);
};

NewTimesheet.getInitialProps = async ctx => {
	await securePage(ctx);
	return {};
};

export default NewTimesheet;