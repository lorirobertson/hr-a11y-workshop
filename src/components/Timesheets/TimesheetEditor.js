import { useState, useEffect } from 'react';
import moment from 'moment';
import FormControl from '../FormControl';
import { getUserInfo } from '../Auth/auth-utils';
import request from '../../_utilities/request';
import { useRouter } from 'next/router';

const TimesheetEditor = ({
    id=null,
    date=moment(),
    timesheet,
    isEdit=false,
}) => {
    const router = useRouter();
    const [startDate, setStartDate] = useState(moment().format('MM/DD/YYYY'));
    const [endDate, setEndDate] = useState(null);
    const [successVisible, setSuccessVisible] = useState(false);
    const [data, setData] = useState({
        date: moment().startOf('week').format('YYYY-MM-DD'),
        project: '',
        notes: '',
        sunday: null,
        monday: null,
        tuesday: null,
        wednesday: null,
        thursday: null,
        friday: null,
        saturday: null
    });

    useEffect(() => {
        const dt = new Date(date + ' EST');
        setStartDate(moment(dt).startOf('week').format('MM/DD/YYYY'));
        setEndDate(moment(dt).endOf('week').format('MM/DD/YYYY'));
    }, [date]);

    useEffect(() => {
        if ( timesheet ) setData(timesheet);
    }, [timesheet]);

    function handleSubmit(e) {
        e.preventDefault();

        const requestPromise = isEdit && id ? 
                                fetch(`/api/v1/timesheets/${id}`, {
                                    method: 'PUT',
                                    body: JSON.stringify(data),
                                })
                            :
                                fetch(`/api/v1/timesheets`, {
                                    method: 'POST',
                                    body: JSON.stringify(data),
                                })
                            ;
        requestPromise
            .then((resp)=>{
                setSuccessVisible(true);
                setTimeout(() => router.back(), 5000);
            })
            .catch((err)=>{
                console.log(err)
            });
    }

    function handleChange(e) {
        let modData = data;
        const dayName = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
        if ( dayName.indexOf(e.target.name) > -1 ) {
            modData[e.target.name] = parseInt(e.target.value);
        } else {
            modData[e.target.name] = e.target.value;
        }
        setData(modData);
    }

    const fields = [
        {id: 'project', type: 'text', label: 'Project Name', data: data.project},
        {id: 'notes', type: 'textarea', label: 'Notes', data: data.notes},
        {id: 'sunday', type: 'number', label: `Sunday - ${startDate}`, data: data.sunday},
        {id: 'monday', type: 'number', label: `Monday - ${moment(new Date(startDate)).add(1, 'd').format('MM/DD/YYYY')}`, data: data.monday},
        {id: 'tuesday', type: 'number', label: `Tuesday - ${moment(new Date(startDate)).add(2, 'd').format('MM/DD/YYYY')}`, data: data.tuesday},
        {id: 'wednesday', type: 'number', label: `Wednesday - ${moment(new Date(startDate)).add(3, 'd').format('MM/DD/YYYY')}`, data: data.wednesday},
        {id: 'thursday', type: 'number', label: `Thursday - ${moment(new Date(startDate)).add(4, 'd').format('MM/DD/YYYY')}`, data: data.thursday},
        {id: 'friday', type: 'number', label: `Friday - ${moment(new Date(startDate)).add(5, 'd').format('MM/DD/YYYY')}`, data: data.friday},
        {id: 'saturday', type: 'number', label: `Saturday - ${moment(new Date(startDate)).add(6, 'd').format('MM/DD/YYYY')}`, data: data.saturday}
    ];

    return (
        <>
            { successVisible ?
                <div className="alert alert-success">Your timesheet has been saved!</div>
            : ''}
            {/* <h1>{ isEdit ? 'Edit' : 'Create' } Timesheet</h1> */}
            <p className="text-muted h4">
                Week of {startDate} - {endDate}
                {' '}
                <button
                    id="btnChangeWeek"
                    type="button"
                    className="btn btn-link"
                >[ change ]</button>
            </p>

            <hr/>

            <form
                id="timesheetForm"
                onSubmit={handleSubmit}
            >
                {
                    fields.map((field, index) => 
                        <FormControl
                            key={index}
                            id={field.id}
                            name={field.id}
                            type={field.type}
                            label={field.label}
                            value={field.data}
                            options={field.options}
                            onChange={handleChange}
                        />
                    )
                }

                <button
                    id="saveTimesheet"
                    type="submit"
                    className="btn btn-success"
                >
                    Save
                </button>

                <button
                    type="button"
                    className="float-right btn btn-secondary"
                    onClick={()=>{
                        window.history.back();
                    }}
                >
                    Cancel
                </button>
            </form>
        </>
    );
}

export default TimesheetEditor;