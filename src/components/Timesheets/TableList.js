import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from 'reactstrap';
import TableRender from '../TableRender';
import request from '../../_utilities/request';
import _ from 'lodash';
// TODO: REMOVE LODASH -> GRAB INDIVIDUAL FUNCTIONALITY {}

function listGrouped(data) {
    return {
        thead: ['Week Start','Total Hours','Actions'],
        tbody: data.map(row => {
            return {
                date: row.date,
                totalHours: row.totalHours,
                actions: <Actions date={row.date} />
            }
        }),
        tfoot:[]
    }
}

function sumHoursByProject(o) {
    return (
        o.sunday + o.monday + o.tuesday + o.wednesday + o.thursday + o.friday + o.saturday
    );
}

function listDetailed(data, action) {
    if ( data.hasOwnProperty('data') && data.data.length ) {
        return {
            thead: ['Project','Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Hours','Actions'],
            tbody: data.data.map(row => {
                return {
                    project: row.project,
                    sunday: row.sunday || 0,
                    monday: row.monday || 0,
                    tuesday: row.tuesday || 0,
                    wednesday: row.wednesday || 0,
                    thursday: row.thursday || 0,
                    friday: row.friday || 0,
                    saturday: row.saturday || 0,
                    sumHours: sumHoursByProject(row) || 0,
                    actions: <DetailActions id={row._id} deleteTimesheet={action} />
                }
            }),
            tfoot:[
                'Hour Totals:',
                data.calculated.byDay.sunday || 0,
                data.calculated.byDay.monday || 0,
                data.calculated.byDay.tuesday || 0,
                data.calculated.byDay.wednesday || 0,
                data.calculated.byDay.thursday || 0,
                data.calculated.byDay.friday || 0,
                data.calculated.byDay.saturday || 0,
                data.calculated.totalHours || 0,
                null,
            ]
        }
    }

    return {
        thead: ['Project','Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Hours','Actions'],
        tbody: [],
        tfooter: [],
    }
}

const Actions = ({ date }) => {
    return (
        <>
            <Link
                href={`/timesheets/week/[date]`}
                as={`/timesheets/week/${date}`}
            >
                <a className="btn btn-sm btn-info">View Entries</a>
            </Link>

            {` `}

            <Link
                href={`/timesheets/week/[date]/new`}
                as={`/timesheets/week/${date}/new`}
            >
                <a className="btn btn-sm btn-success">Add Entry</a>
            </Link>
        </>
    );
}

const DetailActions = ({ id, deleteTimesheet }) => {
    return (
        <>
            <Link
                href={`/timesheets/[id]/edit`}
                as={`/timesheets/${id}/edit`}
            >
                <a className="btn btn-sm btn-primary">Edit</a>
            </Link>

            {` `}

            <button
                className="btn btn-sm btn-danger"
                onClick={() => deleteTimesheet(id)}
            >
                Delete
            </button>
        </>
    );
}

const TableList = ({
    isDetailedView=false,
    date=null,
}) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchData()
    }, []);

    function fetchData() {
        let route = isDetailedView ? `/timesheets/week/${date}` : `/timesheets/grouped`;

        fetch(`/api/v1${route}`)
            .then(resp => resp.json())
            .then(setData)
    }

    function deleteTimesheet(id) {
        if ( window.confirm('Are you sure you want to delete this record?') ) {
            fetch(`/api/v1/timesheets/${id}`, {method: 'DELETE'})
                .then(resp => resp.json())
                .then(() => fetchData())
        }
    }

    const table = isDetailedView ? listDetailed(data, deleteTimesheet) : listGrouped(data);

    return (
        <>
            <TableRender
                thead={table.thead}
                tbody={table.tbody}
                tfoot={table.tfoot}
            />
        </>
    );
}

export default TableList;
