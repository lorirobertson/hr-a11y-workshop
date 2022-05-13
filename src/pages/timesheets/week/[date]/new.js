import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../../../components/Layout';
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

export default NewTimesheet;