import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import moment from 'moment';
import request from '../../_utilities/request';
import {
    Row,
    Col,
    Button
} from 'reactstrap';

const WeeklyTotal = () => {
    const [totalHours, setTotalHours] = useState(0);
    
    useEffect(() => {
        request.get(`/timesheets/week/${moment().startOf('week').format('YYYY-MM-DD')}`)
                .then(resp => {
                    setTotalHours(resp.data.calculated.totalHours);
                })
    }, []);

    const weekStart = moment().startOf('week').format('MM/DD/YYYY');
    const weekEnd = moment().endOf('week').format('MM/DD/YYYY');

    return (
        <>
            <Row>
                <Col>
                    <div className="text-center">
                        <p className="h1 mb-0">{totalHours}</p>
                        <p className="mb-0">Hours logged this week</p>
                        <p className="mb-0">{weekStart} through {weekEnd}</p>
                    </div>
                </Col>
                <Col>
                    <Link
                        href={`/timesheets/week/${moment().startOf('week').format('YYYY-MM-DD')}/new`}
                    >
                        <Button
                            block
                            size="lg"
                            color="success">
                            Log Time
                        </Button>
                    </Link>

                    <Link href={`/timesheets`}>
                        <Button
                            block
                            size="lg"
                            color="secondary">
                            View All Timesheets
                        </Button>
                    </Link>
                </Col>
            </Row>
        </>
    );
};

export default WeeklyTotal;