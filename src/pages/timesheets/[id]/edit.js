import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../../components/Layout';
import request from '../../../_utilities/request';
import TimeSheetEditor from '../../../components/Timesheets/TimesheetEditor';

const NewTimesheet = () => {
	const router = useRouter();
    const { id } = router.query;
    const [timesheet, setTimesheet] = useState(null);
    
    useEffect(() => {
        request.get(`/timesheets/${id}`)
            .then(resp => setTimesheet(resp.data))
            .catch(console.log);
    }, []);
	  
	return (
		<Layout>
			<h1>Edit Timesheet</h1>
            {timesheet ?
                <TimeSheetEditor timesheet={timesheet} date={timesheet.date} id={id} isEdit/>
            : ''}
		</Layout>
	);
};

export default NewTimesheet;