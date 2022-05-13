import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import TableList from '../../components/Timesheets/TableList';
import {format, startOfWeek} from 'date-fns';

const Timesheets = () => {
	const router = useRouter();
	
	return (
		<Layout>
			<h1>Timesheets</h1>
			<div id="action-buttons" className="mb-2 clearfix">
				<button
					className="btn btn-success btn-sm float-right"
					onClick={() => 
						router.push(`/timesheets/week/${format(startOfWeek(new Date()), 'yyyy-MM-dd')}/new`)
					}
				>
					<i className="fas fa-plus"></i>
				</button>
			</div>
			<TableList/>
		</Layout>
	);
};

export default Timesheets;